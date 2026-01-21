import { describe, it, expect, vi } from 'vitest';
import { POST } from './route';
import { AiCoachService } from '~/features/ai-coach/services/ai-service';

// Mock Auth to avoid NextAuth import issues (and "next/server" resolution errors)
vi.mock('~/server/auth', () => ({
  auth: vi.fn().mockResolvedValue({
    user: { id: 'test-user-id', name: 'Test User', email: 'test@example.com' },
  }),
}));

// Mock DB to avoid environment variable access issues during test
vi.mock('~/server/db', () => ({
  db: {
    user: {
      findUnique: vi.fn().mockResolvedValue({
        preferences: { city: 'Paris', budget: 1000 },
      }),
    },
  },
}));

// Mock the AI Service to avoid real API calls
vi.mock('~/features/ai-coach/services/ai-service', () => ({
  AiCoachService: {
    getChatStream: vi.fn().mockResolvedValue({
      toUIMessageStreamResponse: () => new Response('Mocked Stream'),
    }),
  },
}));

describe('Chat API Route', () => {
  it('should delegate to AiCoachService and return a stream', async () => {
    // 1. Prepare Mock Request
    const mockMessages = [{ role: 'user', content: 'Hello' }];
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: mockMessages }),
    });

    // 2. Execute Handler
    const response = await POST(req);

    // 3. Assertions
    // Expect specific context based on the mocked auth session and db preferences
    expect(AiCoachService.getChatStream).toHaveBeenCalledWith(
      mockMessages,
      expect.objectContaining({
        userName: 'Test User',
        userId: 'test-user-id',
        projectContext: expect.any(String),
        preferences: { city: 'Paris', budget: 1000 },
      })
    );
    
    expect(response).toBeInstanceOf(Response);
    
    // Optional: Check response body if needed
    const text = await response.text();
    expect(text).toBe('Mocked Stream');
  });
});