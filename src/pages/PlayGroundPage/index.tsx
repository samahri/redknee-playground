import React from "react";

import Chat from '../../components/Chat';
import Chessboard from "../../components/Chessboard";

import styles from './styles.css';

const PlayGroundPage = () => {
    
    return (
        <div>
            <h1>
                Welcome to Redknee
            </h1>
            <div className={styles.container}>
                <Chessboard />
                <Chat />
            </div>
        </div>
    )
}

export default PlayGroundPage;