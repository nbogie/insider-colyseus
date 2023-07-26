import { Schema, Context, type, MapSchema } from "@colyseus/schema";
export class Player extends Schema {
    @type("number")
    x = Math.floor(Math.random() * 400);

    @type("number")
    y = Math.floor(Math.random() * 400);

    @type("string")
    id = "no_id";

    @type("string")
    name = "untitled";
}
type Phase = "awaiting-start" | "running" | "time-up";
export class MyRoomState extends Schema {
    @type("string") wordToGuess: string = "";
    @type("string") insiderId: string = "";
    @type("string") answererId: string = "";
    @type("string") gamePhase: Phase = "awaiting-start";
    @type({ map: Player }) players = new MapSchema<Player>();

    createPlayer(sessionId: string) {
        const p = new Player();
        p.id = sessionId;
        this.players.set(sessionId, p);
    }

    removePlayer(sessionId: string) {
        this.players.delete(sessionId);
    }

    changePlayerName(sessionId: string, newName: string) {
        const p = this.players.get(sessionId);
        if (p) {
            p.name = newName;
        }
    }
}
