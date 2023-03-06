import { Server } from 'socket.io';
import http from 'http';
import { ClientEvents, ServerEvents } from '../src/websocket/Events';

export class SocketServer {
    private socketIO: Server;

    constructor(http: http.Server) {
        this.socketIO = new Server(http, {
            cors: {
                origin: "http://localhost:5001"
            }
        });
    }

    emit(event: ServerEvents, data: any) {
        this.socketIO.emit(event, data);
    }

    on(event: ClientEvents, fallback: (socket: any) => void) {
        this.socketIO.on(event, fallback);
    }
}