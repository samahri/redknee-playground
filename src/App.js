import React from 'react';
import { useState } from "react";

import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const App = () => {
    const [game, setGame] = useState(new Chess());
    const [fen, setFen] = useState(game.fen());

    const makeAMove = (move) => {
        const result = game.move(move);
        setGame(game);
        setFen(game.fen());
        return result; // null if the move was illegal, the move object if the move was legal
    }

    const makeRandomMove = () => {
        const possibleMoves = game.moves();
        if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return; // exit if the game is over
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        makeAMove(possibleMoves[randomIndex]);
    }

    const onDrop = (sourceSquare, targetSquare) => {
        const move = makeAMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q", // always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return false;
        setTimeout(makeRandomMove, 200);
        return true;
    }

    return (
        <div>
            <h1>
                Welcome to Redknee
            </h1>
            <div>
                <Chessboard boardWidth={560} position={fen} onPieceDrop={onDrop} />
            </div>
        </div>
    );
};

export default App;