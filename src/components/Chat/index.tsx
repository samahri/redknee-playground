import React from "react";
import { useState, useEffect } from "react";
import { connect } from 'socket.io-client';

import styles from './styles.css';

const socket = connect('http://localhost:4000');

const Chat = () => {
    const [inputMsg, setInputMsg] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        socket.on('messageResponse', ({text}) => setMessages([...messages, text]));
    }, [socket, messages]);

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        if (inputMsg.trim()) {
            socket.emit('message', {
                text: inputMsg,
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
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