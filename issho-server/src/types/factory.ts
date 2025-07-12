import type { Room, Message } from './objects';

export function createRoom(roomname: string): Room {
    return {
        name: roomname,
        messages: []
    }
}

export function createMessage(name: string, message: string): Message {
    return {
        username: name,
        message: message,
        time: new Date()
    }
}
