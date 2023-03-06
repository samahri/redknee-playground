// import vs using require()
import express from 'express';
import http from 'http';
import cors from 'cors';
import crypto from 'crypto';
import { Socket } from 'socket.io';

import { SocketServer } from "./SocketServer";
import { ClientEvents, ServerEvents } from '../src/websocket/Events';
import { Game, GameState } from './GameState';
import GameStore from './GameStore';

const app = express();
app.use(cors());

const httpServer = new http.Server(app);

const PORT = 4000;

const socketIO = new SocketServer(httpServer);
const gameStore = new GameStore();

socketIO.on(ClientEvents.CONNECT, (socket: Socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on(ClientEvents.SEND_MSG, ({ text }: {text: string}) => {
        socketIO.emit(ServerEvents.MSG_RESPONSE, {text});
    });

    socket.on(ClientEvents.MOV, ({fen}: {fen:string}) => {
        socket.broadcast.emit(ServerEvents.UPDATE, {fen});
    })

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });

    socket.onAny((event: any, ...args: any) => {
        console.log(`got ${event}`);
    });
});

// called when a player starts the game
app.get('/game/start', (req, res) => {

    const uuid = crypto.randomUUID();
    
    const game: Game = {
        id: uuid,
        state: GameState.WAIT
    }

    // TODO: check if the game exists, return an error

    gameStore.saveGame(game);

    res.send(JSON.stringify(game));
});

httpServer.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});