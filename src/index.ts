import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server);

app.use(express.static(path.resolve(__dirname, '..', 'public')));

io.on('connection', socket => {
  console.log(`New connection => ${socket.id}`);

  
  socket.on('sendMessage', (msg) => {
    console.log(`${msg.name} => send message => ${msg.message}`);
    
    socket.broadcast.emit('receivedMessage', msg)
  })
  
})

server.listen(3333);