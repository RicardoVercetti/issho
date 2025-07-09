import { useState, useEffect, useCallback } from 'react';
import { ChatService } from '../api/chat';
import type { Message, Room } from '../types/chat';

export const useChat = (serverUrl: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chatService, setChatService] = useState<ChatService | null>(null);

  const connect = useCallback(async (username: string) => {
    const service = new ChatService(serverUrl);
    try {
      await service.connect((message) => {
        setMessages(prev => [...prev, message]);
      });
      setIsConnected(true);
      setChatService(service);
      return true;
    } catch (error) {
      console.error('Connection failed:', error);
      return false;
    }
  }, [serverUrl]);

  const joinRoom = useCallback((roomId: string, username: string) => {
    if (chatService) {
      chatService.joinRoom(roomId, username);
      // In a real app, you'd get room info from the server
      setCurrentRoom({
        id: roomId,
        name: `Room ${roomId}`,
        participants: [username]
      });
    }
  }, [chatService]);

  const sendMessage = useCallback((content: string) => {
    if (chatService) {
      chatService.sendMessage(content);
    }
  }, [chatService]);

  const disconnect = useCallback(() => {
    chatService?.disconnect();
    setIsConnected(false);
    setMessages([]);
    setCurrentRoom(null);
  }, [chatService]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    messages,
    currentRoom,
    isConnected,
    connect,
    joinRoom,
    sendMessage,
    disconnect
  };
};