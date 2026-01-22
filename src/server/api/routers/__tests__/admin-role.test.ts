import { describe, it, expect, vi, beforeEach } from 'vitest';
import { adminRouter } from '../admin';
import { TRPCError } from '@trpc/server';

// Mock Environment Variables to prevent t3-env validation error
vi.mock('~/env', () => ({
  env: {
    NODE_ENV: 'test',
  },
}));

// Mock dependencies to avoid Next.js/NextAuth import errors
vi.mock('~/server/auth', () => ({
  auth: vi.fn(),
  getServerAuthSession: vi.fn(),
}));

// Mock DB module completely
vi.mock('~/server/db', () => ({
  db: {
    user: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
    },
    auditLog: {
      create: vi.fn(),
    },
    $transaction: vi.fn((cb) => cb({
      user: {
        findUnique: vi.fn(),
        findMany: vi.fn(),
        update: vi.fn(),
      },
      auditLog: {
        create: vi.fn(),
      },
    })),
  }
}));

import { db } from '~/server/db';

// Mock Context Helper
const createMockContext = (role: 'USER' | 'ADMIN', userId: string) => ({
  session: {
    user: { id: userId, role: role },
    expires: new Date().toISOString(),
  },
  db: db as any,
  headers: new Headers(),
});

describe('Admin Router - Role Management', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getUsers should return user list if caller is ADMIN', async () => {
    const caller = adminRouter.createCaller(createMockContext('ADMIN', 'admin-id'));
    (db.user.findMany as any).mockResolvedValue([
      { id: 'u1', name: 'User 1', email: 'u1@test.com', role: 'USER', lastActiveAt: new Date() }
    ]);

    const result = await caller.getUsers();
    expect(result).toHaveLength(1);
    expect(db.user.findMany).toHaveBeenCalled();
  });

  it('getUsers should throw FORBIDDEN if caller is USER', async () => {
    const caller = adminRouter.createCaller(createMockContext('USER', 'user-id'));
    await expect(caller.getUsers()).rejects.toThrow('FORBIDDEN');
  });

  it('toggleUserRole should promote USER to ADMIN', async () => {
    const caller = adminRouter.createCaller(createMockContext('ADMIN', 'admin-id'));
    
    // Target user is currently USER
    (db.user.findUnique as any).mockResolvedValue({ id: 'target-id', role: 'USER', email: 'target@test.com' });
    (db.user.update as any).mockResolvedValue({ id: 'target-id', role: 'ADMIN' });

    const result = await caller.toggleUserRole({ userId: 'target-id' });

    expect(result.newRole).toBe('ADMIN');
    expect(db.user.update).toHaveBeenCalledWith({
      where: { id: 'target-id' },
      data: { role: 'ADMIN' },
    });
    // Check Audit Log
    expect(db.auditLog.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        action: 'UPDATE_ROLE',
        entityId: 'target-id',
        details: expect.objectContaining({ newRole: 'ADMIN' })
      })
    }));
  });

  it('toggleUserRole should prevent self-modification', async () => {
    const caller = adminRouter.createCaller(createMockContext('ADMIN', 'admin-id'));
    
    // Target user is the caller
    (db.user.findUnique as any).mockResolvedValue({ id: 'admin-id', role: 'ADMIN' });

    await expect(caller.toggleUserRole({ userId: 'admin-id' }))
      .rejects.toThrow('Impossible de modifier son propre rôle');
  });
});
