import { Server } from 'socket.io';
import 'dotenv/config';
import { logAction } from './utils.js';

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
  socket.on('workspace:join', (workspaceId) => {
    socket.join(`workspace:${workspaceId}`);
    logAction(`🧑‍💻 Client joined workspace ${workspaceId}`, io.engine.clientsCount);
  });

  // All CRUD events for workspace are first ran on the server and then broadcasted to all clients in the workspace room to ensure
  // that all clients have the same state of the workspace.

  // Create workspace folder
  socket.on('workspace:createFolder', (data) => {
    const { workspaceId, name, parentId } = data;
    socket
      .to(`workspace:${workspaceId}`)
      .emit('workspace:folderCreated', { name, parentId });
  });

  // Create workspace file
  socket.on('workspace:createFile', (data) => {
    const { workspaceId, name, parentId } = data;
    socket
      .to(`workspace:${workspaceId}`)
      .emit('workspace:fileCreated', { name, parentId });
  });

  // Rename workspace file
  socket.on('workspace:renameItem', (data) => {
    const { workspaceId, itemId, newName } = data;
    socket
      .to(`workspace:${workspaceId}`)
      .emit('workspace:itemRenamed', { itemId, newName });
  });

  // ---------- Workspace end ----------

  // ---------- Files ----------

  // Join file room
  socket.on('file:join', (fileId) => {
    socket.join(`file:${fileId}`);
    logAction(`📂 Client joined file ${fileId}`, io.engine.clientsCount);
  });

  // Edit file
  socket.on('file:edit', (data) => {
    const { fileId, content } = data;

    socket.to(`file:${fileId}`).emit('file:update', { content });

    // file persistence logic can be added here
  });

  // ---------- Files end ----------

  socket.on('disconnect', () => {
    logAction('🚪 Client disconnected', io.engine.clientsCount);
  });
});

console.log('🚀 Socket.io server is running on 127.0.0.1:8080');
