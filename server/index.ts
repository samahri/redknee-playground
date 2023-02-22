// import vs using require()
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Socket } from 'socket.io';

import { SocketServer } from "./SocketServer";
import { ClientEvents, ServerEvents } from '../src/websocket/Events';

const app = express();
app.use(cors());

const httpServer = new http.Server(app);

const PORT = 4000;

const socketIO = new SocketServer(httpServer);

socketIO.on(ClientEvents.CONNECT, (socket: Socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on(ClientEvents.SEND_MSG, ({ text }: {text: string}) => {
        socketIO.emit(ServerEvents.MSG_RESPONSE, {text});
    });

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });

    socket.onAny((event: any, ...args: any) => {
        console.log(`got ${event}`);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});