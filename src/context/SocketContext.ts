import { Context, createContext } from 'react';
import { GameSocket } from '../websocket/GameSocket';

const SocketContext: Context<GameSocket> = createContext({} as GameSocket);

export default SocketContext;