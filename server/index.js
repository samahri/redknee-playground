const express = require('express');
const app = express();

const http = require('http').Server(app);
const cors = require('cors');
const { Server } = require('socket.io');

const PORT = 4000;

app.use(cors());

console.log(io);

const socketIO = new Server(http, {
    cors: {
        origin: "http://localhost:5001"
    }
});

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('message', (data) => {
        socketIO.emit('messageResponse', data);
    });

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });

    socket.onAny((event, ...args) => {
        console.log(`got ${event}`);
    });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});