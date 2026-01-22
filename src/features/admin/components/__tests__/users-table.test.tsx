import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UsersTable } from '../users-table';

// Mock NextAuth
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(() => ({
    data: { user: { id: 'admin-id', role: 'ADMIN' } },
    status: 'authenticated',
  })),
}));

// Mock TRPC
vi.mock('~/trpc/react', () => ({
  api: {
    admin: {
      getUsers: {
        useQuery: vi.fn(() => ({
          data: [
            { id: 'u1', name: 'User 1', email: 'u1@test.com', role: 'USER', lastActiveAt: new Date() },
            { id: 'admin-id', name: 'Admin', email: 'admin@test.com', role: 'ADMIN', lastActiveAt: new Date() }
          ],
          isLoading: false,
          refetch: vi.fn(),
        })),
      },
      toggleUserRole: {
        useMutation: vi.fn(() => ({
          mutate: vi.fn(),
          isPending: false,
        })),
      },
    },
  },
}));

describe('UsersTable', () => {
  it('renders user list correctly', () => {
    render(<UsersTable />);
    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('u1@test.com')).toBeInTheDocument();
  });

  it('does not show action button for self', () => {
    render(<UsersTable />);
    // "Promouvoir Admin" should be present for User 1
    const buttons = screen.getAllByRole('button');
    // Filter for the action button
    const actionButton = buttons.find(b => b.textContent?.includes('Promouvoir Admin'));
    expect(actionButton).toBeInTheDocument();
    
    // Should not have action button for Admin (self)
    // We can check this by counting buttons or specific text.
    // In the mock, there are 2 users. 1 is self.
    // There should be only 1 action button (for User 1).
    const actionButtons = buttons.filter(b => 
      b.textContent?.includes('Promouvoir') || b.textContent?.includes('Rétrograder')
    );
    expect(actionButtons).toHaveLength(1);
  });
});
