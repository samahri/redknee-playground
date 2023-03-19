export enum ClientEvents {
    CONNECT = 'connection',
    SEND_MSG = "message",
    MOV='move piece' 
}

export enum ServerEvents {
    MSG_RESPONSE = "messageResponse",
    UPDATE='updatePiece',
    UNAVAILABLE="game unavailable"
}

