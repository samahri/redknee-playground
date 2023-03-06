import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './styles.css';

const WelcomePage = () => {
    
    // use this hook to navigate programmatically instead of window.histroy.pushState
    const navigate = useNavigate();

    const startGame = () => {
        // TODO: don't hardcode the url
        fetch('http://localhost:4000/game/start')
            .then((res) => res.json())
            .then((data) => {
                window.history.pushState({}, '', `/game/${data.id}`);
                navigate(`/game/${data.id}`);
            });
    }

    return (
        <div className={styles.container}>
            <button onClick={startGame}>start game</button>
        </div>
    );
}

export default WelcomePage;