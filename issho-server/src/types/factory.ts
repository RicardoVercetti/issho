import type { Room, TextMessage, FileMessage } from "./objects";

export function createRoom(roomname: string): Room {
  return {
    name: roomname,
    messages: [],
  };
}

export function createTextMessage(
  username: string,
  message: string
): TextMessage {
  return {
    type: "text",
    username,
    message,
    time: new Date().toISOString(),
  };
}

export function createFileMessage(
  username: string,
  file: Express.Multer.File
): FileMessage {
  return {
    type: "file",
    username,
    filename: file.filename,
    originalName: file.originalname,
    size: file.size,
    mimetype: file.mimetype,
    time: new Date().toISOString(),
  };
}
