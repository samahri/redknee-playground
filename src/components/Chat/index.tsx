import React, { useContext } from "react";
import { useState, useEffect } from "react";
import SocketContext from "../../context/SocketContext";
import { ClientEvents, ServerEvents } from "../../websocket/Events";
import { GameSocket } from "../../websocket/GameSocket";

import styles from './styles.css';

const socket = new GameSocket();

const Chat = () => {
    const [inputMsg, setInputMsg] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]);
    const socket: GameSocket = useContext(SocketContext);

    useEffect(() => {
        socket.on(ServerEvents.MSG_RESPONSE, ({text}) => setMessages([...messages, text]));
    }, [socket, messages]);

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        if (inputMsg.trim()) {
            socket.emit(ClientEvents.SEND_MSG, {
                text: inputMsg,
            });
        }

        setInputMsg('');
    }

    return (
        <div className={styles.chatForm}>
            <form onSubmit={onFormSubmit}>
                <input type="text" value={inputMsg} onChange={(e) => setInputMsg(e.target.value)} />
                <button>Send</button>
            </form>
            <div className={styles.messages}>
                {messages.map((msg, i) => <p key={i}>{msg}</p>)}
            </div>
        </div>
    );
}

export default Chat;