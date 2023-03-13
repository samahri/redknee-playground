import React, { useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import Chat from '../../components/Chat';
import Chessboard from "../../components/Chessboard";
import SocketContext from "../../context/SocketContext";
import { LoaderInterface } from "../../routs";
import { GameSocket } from "../../websocket/GameSocket";

import styles from './styles.css';

const PlaygroundPage = () => {

    const { gameId } = useLoaderData() as LoaderInterface;
    const socket: GameSocket = new GameSocket(gameId);
    
    useEffect(() => {
        socket.connect();

        fetch(`http://localhost:4000/api/game/${gameId}`)
            .then((res) => res.json())
            .then((data) => {
            });

        return () => {
            socket.disconnect();
        }

    }, []);

    return (
        <div className={styles.container}>
            <SocketContext.Provider value={socket}>
                <Chessboard />
                {/* <Chat /> */}
            </SocketContext.Provider>
        </div>
    )
}

export default PlaygroundPage;