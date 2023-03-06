export enum GameState {
    WAIT,           // Game is created and waiting for player 2 to join
    IN_PROGRESS,    // game is currently being played
    FINISHED,       // Game is concluded, done, players either won (what if it's abandoned?)
}

export interface Game {
    id: string,
    state: GameState
}