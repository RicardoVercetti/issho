import type { Message } from '../types/chat';

interface MessageListProps {
  messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <div key={message.id} className="message">
          <strong>{message.sender}:</strong> {message.content}
        </div>
      ))}
    </div>
  );
};