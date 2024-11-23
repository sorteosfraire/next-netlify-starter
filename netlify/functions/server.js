const serverless = require('serverless-http');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('changeColor', (color) => {
    io.emit('changeColor', color);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

module.exports.handler = serverless(app);
