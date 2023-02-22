import { io, Socket } from 'socket.io-client';
import { ClientEvents, ServerEvents } from './Events';

export class GameSocket {
    private socket: Socket;

    constructor() {
        this.socket = io('http://localhost:4000');
        this.socket.connect();
    }

    emit(event: ClientEvents, data: any) {
        this.socket.emit(event, data);
    }

    on(event: ServerEvents, callback: (obj: any) => void) {
        this.socket.on(event, callback);
    }

}