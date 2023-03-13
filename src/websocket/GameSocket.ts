import { io, Socket } from 'socket.io-client';
import { ClientEvents, ServerEvents } from './Events';

export class GameSocket {
    private socket: Socket;

    constructor(gameId :string) {
        this.socket = io('http://localhost:4000');
        this.socket.auth = { gameId };
    }

    connect() {
        this.socket.connect();
    }

    disconnect() {
        this.socket.disconnect();
    }

    emit(event: ClientEvents, data: any) {
        this.socket.emit(event, data);
    }

    on(event: ServerEvents, callback: (obj: any) => void) {
        this.socket.on(event, callback);
    }

}