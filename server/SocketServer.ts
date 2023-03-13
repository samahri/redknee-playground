import { Server, Socket } from 'socket.io';
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

    registerEvents() {
        this.socketIO.on(ClientEvents.CONNECT, (socket: Socket) => {
            console.log(`⚡: ${socket.id} user just connected!`);
        
            // socket.on(ClientEvents.SEND_MSG, ({ text }: {text: string}) => {
            //     this.socketIO.emit(ServerEvents.MSG_RESPONSE, {text});
            // });

            socket.join(socket.handshake.auth.gameId);
        
            socket.on(ClientEvents.MOV, ({fen}: {fen:string}) => {
                console.log(`socket ${socket.handshake.auth.gameId} made a move`)
                socket.to(socket.handshake.auth.gameId).emit(ServerEvents.UPDATE, { fen });
            });
        
            socket.on('disconnect', () => {
                console.log(`🔥: ${socket.handshake.auth.gameId} disconnected`);
                socket.leave(socket.handshake.auth.gameId);
            });
        
            socket.onAny((event: any, ...args: any) => {
                console.log(`got ${event}`);
            });
        });
    }
}