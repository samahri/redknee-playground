export enum GameState {
    WAIT = "wait",           // Game is created and waiting for player 2 to join
    IN_PROGRESS = "in progress",    // game is currently being played
    FINISHED = "finished",       // Game is concluded, done, players either won (what if it's abandoned?)
}

export interface Game {
    id: string,
    state: GameState
}