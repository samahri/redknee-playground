import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import Chat from '../../components/Chat';
import Chessboard from "../../components/Chessboard";
import { LoaderInterface } from "../../routs";

import styles from './styles.css';

const PlaygroundPage = () => {

    const { gameId } = useLoaderData() as LoaderInterface;
    
    useEffect(() => {
        fetch(`http://localhost:4000/api/game/${gameId}`)
            .then((res) => res.json())
            .then((data) => {
                // window.history.pushState({}, '', `/game/${data.id}`);                
            });
    }, []);

    return (
        <div className={styles.container}>
            <Chessboard />
            <Chat />
        </div>
    )
}

export default PlaygroundPage;