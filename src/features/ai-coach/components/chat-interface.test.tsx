import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChatInterface } from './chat-interface';

// Mock dependencies
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

const mockSendMessage = vi.fn();
const mockInvalidate = vi.fn();
const mockMutateClarity = vi.fn();
const mockMutateFinalize = vi.fn();

vi.mock('@ai-sdk/react', () => ({
  useChat: () => ({
    messages: [
      { id: '1', role: 'user', content: 'Hello **World**' },
      { id: '2', role: 'assistant', content: '- Item 1\n- Item 2' },
    ],
    sendMessage: mockSendMessage,
    status: 'ready',
    error: null,
  }),
}));

vi.mock('~/trpc/react', () => ({
  api: {
    useUtils: () => ({
      ai: { getLatestClarity: { invalidate: mockInvalidate } },
    }),
    ai: {
      updateClarityIndex: { useMutation: () => ({ mutate: mockMutateClarity }) },
      finalizeSession: {
        useMutation: () => ({
          mutate: mockMutateFinalize,
          isPending: false,
          isError: false,
        })
      },
    },
  },
}));

// Mock scrollIntoView since it's used in the component
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('ChatInterface', () => {
  it('renders messages using Markdown', () => {
    render(<ChatInterface />);
    
    // Check list items are rendered as <li>
    // react-markdown should convert "- Item 1" to <ul><li>Item 1</li>...</ul>
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent('Item 1');
    expect(listItems[1]).toHaveTextContent('Item 2');
    
    // Check bold text
    // "Hello **World**" -> "Hello " + <strong>World</strong>
    const boldText = screen.getByText('World', { selector: 'strong' });
    expect(boldText).toBeInTheDocument();
  });
});
