'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';

export function ChatInterface() {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div>
              <span className="font-bold">{m.role === 'user' ? 'User: ' : 'AI: '}</span>
              {m.parts.map((part, i) => {
                if (part.type === 'text') {
                  return <span key={i}>{part.text}</span>;
                }
                return null;
              })}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl text-black"
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}
