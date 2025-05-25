import { Server } from 'socket.io';
import 'dotenv/config';
import { logAction, getRandomColor, apiFetch, debounce } from './utils.js';

const io = new Server(8080, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

const roomUsers = new Map();
const contentMap = new Map();

io.on('connection', (socket) => {
  // ---------- Workspace ----------

  // Join workspace
  socket.on('workspace:join', (data) => {
    const { workspaceId, user, language, content } = data;
    socket.join(`workspace:${workspaceId}`); // check if the user is already in the room
    const existingUsers = roomUsers.get(`workspace:${workspaceId}`) || [];
    if (!existingUsers.some((u) => u.id === user.id)) {
      roomUsers.set(`workspace:${workspaceId}`, [
        ...(roomUsers.get(`workspace:${workspaceId}`) || []),
        { ...user, color: getRandomColor() },
      ]);
    }

    let workspaceState = contentMap.get(workspaceId);

    if (!workspaceState) {
      apiFetch(
        `${process.env.API_URL}/api/editor/socket?workspace_id=${workspaceId}&key=${process.env.API_KEY}`,
        {
          method: 'GET',
        }
      ).then(async (res) => {
        const response = res.workspace;
        workspaceState = {
          content: response.content || '',
          language: response.language || 'javascript',
        };
        contentMap.set(workspaceId, workspaceState);

        io.to(`workspace:${workspaceId}`).emit('workspace:joined', {
          workspaceId,
          users: roomUsers.get(`workspace:${workspaceId}`) || [],
          content: workspaceState.content || '',
          language: workspaceState.language || 'javascript',
        });
      });
    } else {
      io.to(`workspace:${workspaceId}`).emit('workspace:joined', {
        workspaceId,
        users: roomUsers.get(`workspace:${workspaceId}`) || [],
        content: workspaceState.content || '',
        language: workspaceState.language || 'javascript',
      });
    }

    logAction(
      `🧑‍💻 Client ${user.username} joined workspace ${workspaceId}`,
      io.engine.clientsCount
    );
  });

  // Edit content in workspace
  socket.on('workspace:edit', (data) => {
    const { workspaceId, content } = data;

    const workspaceState = contentMap.get(workspaceId);
    workspaceState.content = content;
    contentMap.set(workspaceId, workspaceState);

    io.to(`workspace:${workspaceId}`).emit('workspace:contentEdited', {
      workspaceId,
      content,
    });

    logAction(`✏️ Content edited in workspace ${workspaceId}`, io.engine.clientsCount);
  });

  // Save content in workspace
  socket.on('workspace:save', (data) => {});

  // Change programming language in workspace
  socket.on('workspace:changeLanguage', (data) => {
    const { workspaceId, language } = data;
    logAction(
      `📝 Language changed to ${language} in workspace ${workspaceId}`,
      io.engine.clientsCount
    );
    // Update the content map with the new language
    if (!contentMap.has(workspaceId)) {
      contentMap.set(workspaceId, { content: '', language });
    } else {
      const workspaceContent = contentMap.get(workspaceId);
      workspaceContent.language = language;
      contentMap.set(workspaceId, workspaceContent);
    }
    io.to(`workspace:${workspaceId}`).emit('workspace:languageChanged', {
      workspaceId,
      language,
    });

    debounce(() => {
      apiFetch(`${process.env.API_URL}/api/editor/socket?key=${process.env.API_KEY}`, {
        method: 'PATCH',
        body: JSON.stringify({
          workspaceId: workspaceId,
          content: undefined,
          language,
        }),
      });
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
      content: contentMap.get(workspaceId).content || '',
      language: contentMap.get(workspaceId).language || 'javascript',
    });

    if (updatedUsers.length === 0) {
      const state = contentMap.get(workspaceId);
      if (!state) return;
      apiFetch(`${process.env.API_URL}/api/editor/socket?key=${process.env.API_KEY}`, {
        method: 'PATCH',
        body: JSON.stringify({
          workspaceId: workspaceId,
          content: state.content || '',
          language: state.language || 'javascript',
        }),
      });
    }
  });

  // ---------- Workspace end ----------

  socket.on('disconnect', () => {
    logAction('🚪 Client disconnected', io.engine.clientsCount);
  });
});

console.log('🚀 Socket.io server is running on 127.0.0.1:8080');
