import { ChatInterface } from '~/features/ai-coach/components/chat-interface';

export default function ChatPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-blue-600">Coach IA - Miroir Lucide</h1>
        <p className="text-muted-foreground">
          Discutez avec votre coach pour clarifier votre projet et identifier vos priorités.
        </p>
      </div>
      
      <ChatInterface />
    </div>
  );
}
