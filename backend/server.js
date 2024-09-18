const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');
const PORT = process.env.PORT || 5000;
const cors = require('cors');

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // Allow all origins for Socket.IO
    methods: ['GET', 'POST'],
  },
});
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

module.exports = { io };

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
