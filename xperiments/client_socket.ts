import * as net from 'net';

const client = new net.Socket();

client.connect(3000, 'localhost', () => {
  console.log('Connected to server');
  client.write('Hello from the client!');
});

client.on('data', (data) => {
  console.log(`Received from server: ${data}`);

  client.end(); // Close the connection after receiving data
});

client.on('close', () => {
  console.log('Connection closed');
});

client.on('error', (err) => {
  console.error('Client error:', err);
});
console.log('Client socket script loaded'); 
