import { Server } from 'socket.io';
import 'dotenv/config';
import { logAction, getRandomColor } from './utils.js';

const io = new Server(8080, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

const fileStates = new Map();
const roomUsers = new Map();

io.on('connection', (socket) => {
  // ---------- Workspace ----------

  // Join workspace
  socket.on('workspace:join', (data) => {
    const { workspaceId, user } = data;
    socket.join(`workspace:${workspaceId}`); // check if the user is already in the room
    const existingUsers = roomUsers.get(`workspace:${workspaceId}`) || [];
    if (!existingUsers.some((u) => u.id === user.id)) {
      roomUsers.set(`workspace:${workspaceId}`, [
        ...(roomUsers.get(`workspace:${workspaceId}`) || []),
        { ...user, color: getRandomColor() },
      ]);
    }

    // Emit to all clients in the room INCLUDING the sender
    io.to(`workspace:${workspaceId}`).emit('workspace:joined', {
      workspaceId,
      users: roomUsers.get(`workspace:${workspaceId}`) || [],
    });

    logAction(
      `🧑‍💻 Client ${user.username} joined workspace ${workspaceId}`,
      io.engine.clientsCount
    );
  });

  // Edit content in workspace
  socket.on('workspace:edit', (data) => {});

  // Save content in workspace
  socket.on('workspace:save', (data) => {});

  // Change programming language in workspace
  socket.on('workspace:changeLanguage', (data) => {
    const { workspaceId, language } = data;
    logAction(`📝 Language changed to ${language} in workspace ${workspaceId}`, io.engine.clientsCount);
    io.to(`workspace:${workspaceId}`).emit('workspace:languageChanged', {
      workspaceId,
      language,
    });
  });

  // Fires when user leaves the workspace
  socket.on('workspace:leave', (data) => {
    const { workspaceId, user } = data;
    socket.leave(`workspace:${workspaceId}`);
    const users = roomUsers.get(`workspace:${workspaceId}`) || [];
    const updatedUsers = users.filter((roomUser) => roomUser.id !== user.id);
    roomUsers.set(`workspace:${workspaceId}`, updatedUsers);

    logAction(`👋 Client left workspace ${workspaceId}`, io.engine.clientsCount);

    io.to(`workspace:${workspaceId}`).emit('workspace:left', {
      workspaceId,
      users: updatedUsers,
    });
  });

  // ---------- Workspace end ----------

  socket.on('disconnect', () => {
    logAction('🚪 Client disconnected', io.engine.clientsCount);
  });
});

console.log('🚀 Socket.io server is running on 127.0.0.1:8080');
