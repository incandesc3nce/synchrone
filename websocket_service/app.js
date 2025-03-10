import { Server } from "socket.io";
import 'dotenv/config';

const logAction = (action, size) => {
  console.log(action);
  console.log(`Clients amount: ${size}`);
}

const io = new Server(8080, {
  cors: {
    origin: process.env.CLIENT_URL,
  }
});

let msg = '// Welcome to the synchrone WebSocket server';

io.on('connection', (socket) => {
  socket.on('message', (data) => {
    console.log('📩 received: %s', data);
    const message = data.message;
    msg = message
    const type = data.type;
    
    // Broadcast to all clients
    io.emit('message', { message, type });
  });

  socket.on('disconnect', () => {
    logAction('🔥 Client disconnected', io.engine.clientsCount);
  });

  socket.emit('message', { message: msg, type: 'code' });
  logAction('⚡ Client connected', io.engine.clientsCount);
})

console.log('🚀 Socket.io server is running on 127.0.0.1:8080');
