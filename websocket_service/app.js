const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({ port: 8080 });

const logAction = (action, size) => {
  console.log(action);
  console.log(`Clients amount: ${size}`);
}

let msg = '// Welcome to the synchrone WebSocket server';
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    console.log('received: %s', data);
    const received = JSON.parse(data);
    const message = received.message.toString();
    msg = message;
    const type = received.type;
    
    // Broadcast to all clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ message, type }));
      }
    });
  });

  ws.on('close', function close() {
    logAction('Client disconnected', wss.clients.size);
  });

  ws.send(JSON.stringify({ message: msg, type: 'code' }));
  logAction('Client connected', wss.clients.size);
});

console.log('WebSocket server started on ws://localhost:8080');