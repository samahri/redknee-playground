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
            console.log(`⚡: ${socket.handshake.auth.gameId} user just connected!`);
        
            // socket.on(ClientEvents.SEND_MSG, ({ text }: {text: string}) => {
            //     this.socketIO.emit(ServerEvents.MSG_RESPONSE, {text});
            // });

            const roomName = socket.handshake.auth.gameId;
            const roomSize = this.socketIO.sockets.adapter.rooms.get(roomName)?.size || 0;
            
            console.log(roomName);
            console.log(roomSize);

            if (roomSize >= 2) {
                this.socketIO.to(socket.id).emit(ServerEvents.UNAVAILABLE);
            }

            socket.join(roomName);
        
            socket.on(ClientEvents.MOV, ({fen}: {fen:string}) => {
                console.log(`socket ${roomName} made a move`)
                socket.to(roomName).emit(ServerEvents.UPDATE, { fen });
            });
        
            socket.on('disconnect', () => {
                console.log(`🔥: ${roomName} disconnected`);
                socket.leave(roomName);
            });
        
            socket.onAny((event: any, ...args: any) => {
                console.log(`got ${event}`);
            });
        });
    }
}