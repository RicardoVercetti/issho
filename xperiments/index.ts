import { print } from './lib/printer';
console.log('Loading experiments...');

import * as net from 'net';

const PORT = 3000;
const HOST = 'localhost';

const server = net.createServer((socket) => {
  console.log('New Client connected:', socket.remoteAddress, socket.remotePort);

  socket.on('data', (data) => {
    console.log(`Received data: ${data}`);
    print(data.toString());
    socket.write(`Hello from the server!, Received your data : ${data}\n`);
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });

    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });

});


server.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT}`);
});