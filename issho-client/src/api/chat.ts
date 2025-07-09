import type { Message } from '../types/chat';

export class ChatService {
  private socket: WebSocket | null = null;
  private url: string;

  constructor(serverUrl: string) {
    this.url = serverUrl;
  }

  connect(onMessage: (message: Message) => void) {
    this.socket = new WebSocket(this.url);
    
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      onMessage(message);
    };

    return new Promise((resolve, reject) => {
      this.socket!.onopen = () => resolve(true);
      this.socket!.onerror = (error) => reject(error);
    });
  }

  joinRoom(roomId: string, username: string) {
    this.send({
      type: 'join',
      roomId,
      username
    });
  }

  sendMessage(content: string) {
    this.send({
      type: 'message',
      content
    });
  }

  private send(data: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    }
  }

  disconnect() {
    this.socket?.close();
  }
}