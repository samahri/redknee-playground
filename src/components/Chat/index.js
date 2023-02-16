import React, { useState, useEffect } from "react";
import socketIO from 'socket.io-client';

import styles from './styles.css';

const socket = socketIO.connect('http://localhost:4000');

const Chat = () => {
    const [inputMsg, setInputMsg] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, messages]);

    const onFormSubmit = (e) => {
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
        <div className={styles.block}>
            {messages.map((msg) => <p>{msg.text}</p>)}
            <form className={styles.form} onSubmit={onFormSubmit}>
                <input className={styles.input} type="text" value={inputMsg} onChange={(e) => setInputMsg(e.target.value)} />
                <button>Send</button>
            </form>
        </div>
    );
}

export default Chat;