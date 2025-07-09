// a chat server that listens in a port
// any user can create a room and join any room thats available
// all messages are shared inside the rooms(only text)
// all this in typescript

import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

type Room = {
  name: string;
  clients: Set<WebSocket>;
};

const rooms: Map<string, Room> = new Map();

function broadcast(roomName: string, message: string, sender?: WebSocket) {
  const room = rooms.get(roomName);
  if (!room) return;

  for (const client of room.clients) {
    if (client.readyState === WebSocket.OPEN && client !== sender) {
      client.send(message);
    }
  }
}

wss.on('connection', (ws: WebSocket) => {
  let currentRoom: string | null = null;

  ws.on('message', (data) => {
    try {
      const parsed = JSON.parse(data.toString());
      const { type, room, name, message } = parsed;

      if (type === 'join') {
        currentRoom = room;
        if (!rooms.has(room)) {
          rooms.set(room, { name: room, clients: new Set() });
        }
        rooms.get(room)!.clients.add(ws);
        ws.send(`Joined room: ${room}`);
        broadcast(room, `${name} joined the room`, ws);
      }

      if (type === 'message' && currentRoom) {
        const msgToSend = `${name}: ${message}`;
        broadcast(currentRoom, msgToSend, ws);
      }

    } catch (err) {
      ws.send('Invalid message format.');
    }
  });

  ws.on('close', () => {
    if (currentRoom && rooms.has(currentRoom)) {
      rooms.get(currentRoom)!.clients.delete(ws);
      if (rooms.get(currentRoom)!.clients.size === 0) {
        rooms.delete(currentRoom);
      }
    }
  });
});

server.listen(3000, () => {
  console.log('Chat server running on http://localhost:3000');
});
