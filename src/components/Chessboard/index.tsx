import React, { useContext, useEffect } from "react";

import { useState } from "react";

import { Chessboard as ChessboardComponent } from "react-chessboard";
import { Chess, Square, Move } from "chess.js";
import { Piece } from "react-chessboard/dist/chessboard/types";
import { GameSocket } from "../../websocket/GameSocket";
import SocketContext from "../../context/SocketContext";
import { ClientEvents, ServerEvents } from "../../websocket/Events";

const Chessboard = () => {
    const [game, setGame] = useState(new Chess());
    const [color, setColor] = useState('');
    const socket: GameSocket = useContext(SocketContext);

    useEffect(() => {
        socket.on(ServerEvents.UPDATE, (data) => {
            setGame(new Chess(data.fen));
        });
    },[]);


    const makeAMove = (move: string | {from: string, to: string, promotion: string}): Move | null => {
         // null if the move was illegal, the move object if the move was legal
        try {
            const result = game.move(move);
            setGame(new Chess(game.fen()));
            return result;
        } catch(e) {
            return null;
        }
    }
    const onDrop = (sourceSquare: Square, targetSquare: Square): boolean => {
        const move = makeAMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q", // always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return false;

        socket.emit(ClientEvents.MOV, {fen: game.fen()});
        return true;
    }

    return (
        <div>
            <ChessboardComponent 
                boardWidth={560}
                position={game.fen()}
                onPieceDrop={onDrop}
                // arePiecesDraggable={}
                isDraggablePiece={({ piece }:{piece: Piece}) => { return piece.substring(0,1) === game.turn() }}
            />
        </div>
    );
};

export default Chessboard;