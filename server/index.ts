// import vs using require()
import express from 'express';
import http from 'http';
import path from 'path';
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
const guidRegex = `[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$`;

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
app.get('/api/game/start', (req, res) => {

    const uuid = crypto.randomUUID();
    
    const game: Game = {
        id: uuid,
        state: GameState.WAIT
    }

    // TODO:  return an error if the game exists

    gameStore.saveGame(game);

    res.send(JSON.stringify(game));
});

app.get(`/api/game/:uuid(${guidRegex})`, (req, res, next) => {
    // TODO: implement API
});

// serve the react app
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

httpServer.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});