
import { Avatar } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  };
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  
  return (
    <div className="flex items-start gap-3">
      <Avatar className={`h-8 w-8 ${isUser ? 'bg-secondary' : 'bg-primary'} ${isUser ? 'text-secondary-foreground' : 'text-primary-foreground'}`}>
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </Avatar>
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">
            {isUser ? 'You' : 'SubscrAIbe Assistant'}
          </p>
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(message.timestamp)}
          </span>
        </div>
        <div className={`mt-1 text-sm leading-relaxed ${isUser ? '' : 'text-foreground'}`}>
          {message.content}
        </div>
      </div>
    </div>
  );
};

function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default ChatMessage;
