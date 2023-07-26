import { Room, Client } from "@colyseus/core";
import { MyRoomState } from "./schema/MyRoomState";
import { pick, shuffle } from "../collectionUtils";
import { wordList } from "../wordList";
export class MyRoom extends Room<MyRoomState> {
    maxClients = 20;

    onCreate(options: any) {
        this.setState(new MyRoomState());

        this.onMessage("startGame", (client, message) => {
            console.log("got startGame: ", client.sessionId, message);
            this.assignAndBroadcastGameRoles();
        });
        this.onMessage("changeName", (client, message) => {
            console.log(
                "got changeName: ",
                client.sessionId,
                message,
                this.playerNameList()
            );
            this.state.changePlayerName(client.sessionId, message);
        });
    }

    onJoin(client: Client, options: any) {
        this.state.createPlayer(client.sessionId);
        console.log(
            client.sessionId,
            "joined!  That makes: " + this.playerNameList()
        );
    }

    playerNameList() {
        return Array.from(this.state.players.keys()).join(", ");
    }
    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");
        this.state.removePlayer(client.sessionId);
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }

    assignAndBroadcastGameRoles() {
        console.log("Assigning and broadcasting game roles");
        const clientIds: string[] = this.clients.map((c) => c.id);
        const [answerer, insider, ...others] = shuffle(clientIds);
        this.state.answererId = answerer;
        this.state.insiderId = insider;
        this.state.gamePhase = "running";
        this.state.wordToGuess = pick(wordList);
    }
}
