export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
}

export interface Room {
  id: string;
  name: string;
  participants: string[];
}