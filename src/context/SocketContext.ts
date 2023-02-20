import { Context, createContext } from 'react';
import { GameSocket } from '../websocket/GameSocket';

const socket = new GameSocket();

const SocketContext: Context<GameSocket> = createContext(socket);

export default SocketContext;