import { Game } from "./GameState";

export default class GameStore {
    private sessions: Map<string,Game>;

    constructor() {
        this.sessions = new Map<string,Game>();
    }

    findGame(id: string): Game | undefined {
        return this.sessions.get(id);
    }

    saveGame(game: Game): void {
        this.sessions.set(game.id, game);
        console.log(`game ${game.id} is saved`);
    }
}