import { MessageInput } from '../components/MessageInput';
import { MessageList } from '../components/MessageList';
import type { Room, Message } from '../types/chat';

interface ChatPageProps {
  messages: Message[];
  currentRoom: Room | null;
  onSendMessage: (content: string) => void;
  onDisconnect: () => void;
}

export const ChatPage = ({
  messages,
  currentRoom,
  onSendMessage,
  onDisconnect,
}: ChatPageProps) => {
  return (
    <div className="chat-page">
      <div className="chat-header">
        <h2>{currentRoom?.name || 'Chat'}</h2>
        <button onClick={onDisconnect}>Disconnect</button>
      </div>
      <MessageList messages={messages} />
      <MessageInput onSend={onSendMessage} />
    </div>
  );
};