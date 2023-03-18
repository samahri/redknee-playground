import React, { useContext, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import Chat from '../../components/Chat';
import Chessboard from "../../components/Chessboard";
import SocketContext from "../../context/SocketContext";
import { LoaderInterface } from "../../routs";
import { GameSocket } from "../../websocket/GameSocket";

import styles from './styles.css';

const PlaygroundPage = () => {

    const { gameId, fromHomepage } = useLoaderData() as LoaderInterface;
    const socket: GameSocket = new GameSocket(gameId);
    const navigate = useNavigate();
    
    useEffect(() => {
        socket.connect();

        if (!fromHomepage) {

            fetch(`http://localhost:4000/api/game/${gameId}`)
            .then((res) => {
                console.log(res);
                if (res.status === 404) {
                    // TODO: indicate to the user game is not available
                    return navigate('/');
                }
                res.json()
                console.log(res);
            }).then((data) => {
                console.log(data);
            });
        }

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