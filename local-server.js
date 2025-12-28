import app from './server.js';
import connectDB from './db.js';
import { initializeDefaultRoles } from './controllers/roleController.js';
import http from 'http';
import { Server } from 'socket.io';
import notificationService from './services/notificationService.js';

async function start() {
  try {
    await connectDB();
    await initializeDefaultRoles();
  } catch (err) {
    console.error('Startup error (DB/roles):', err.message || err);
    // Continue starting the server so you can inspect errors; adjust if you prefer to abort on DB failure
  }

  const PORT = process.env.PORT || 5000;
  const server = http.createServer(app);

  // Local Socket.IO (optional) - useful in dev, safe to keep even if not used
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET','POST','PUT','DELETE'],
      credentials: true,
    }
  });

  // Wire socket to notification service for dev
  try {
    notificationService.setSocketIo(io);
  } catch (e) {
    console.warn('Failed to set socket.io on notificationService:', e.message || e);
  }

  server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}

start();
