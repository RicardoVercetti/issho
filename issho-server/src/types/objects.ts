export type BaseMessage = {
  username: string;
  time: string;
};

export type TextMessage = BaseMessage & {
  type: "text";
  message: string;
};

export type FileMessage = BaseMessage & {
  type: "file";
  filename: string;
  originalName: string;
  size: number;
  mimetype: string;
};

export type Message = TextMessage | FileMessage;

export type Room = {
  name: string;
  messages: Message[];
};
