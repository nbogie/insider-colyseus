import React, { Dispatch, SetStateAction, useState } from "react";
import * as Colyseus from "colyseus.js";
import { MyRoomState } from "../core/myRoomState";
import { PlayersList } from "./PlayersList";
import { RoleView } from "./RoleView";
import Button from "@mui/joy/Button";

interface RoomViewProps {
    room: Colyseus.Room<MyRoomState>;
}
export function RoomView({ room }: RoomViewProps): JSX.Element {
    const [isDebugEnabled, setDebugEnabled] = useState<boolean>(false);
    const iAmInsider = room.sessionId === room.state.insiderId;
    const iAmAnswerer = room.sessionId === room.state.answererId;
    return (
        <div className="currentRoom">
            <Button onClick={makeToggle(setDebugEnabled)}>toggle debug</Button>
            {isDebugEnabled && (
                <div className="debugView">
                    Room: {room.name} roomId: {room.roomId}
                    <br />
                    Room Session ID: {room.sessionId}
                    <br />
                    Insider ID: {room.state.insiderId}
                    <br />
                    Answerer ID: {room.state.answererId}
                    <br />
                </div>
            )}
            <PlayersList room={room} />

            <h2>{room.state.gamePhase}</h2>

            {iAmInsider && (
                <RoleView
                    role={"The Insider"}
                    wordToGuess={room.state.wordToGuess}
                />
            )}
            {iAmAnswerer && (
                <RoleView
                    role={"The Question-Answerer"}
                    wordToGuess={room.state.wordToGuess}
                />
            )}
        </div>
    );
}

function makeToggle(fn: Dispatch<SetStateAction<boolean>>): () => void {
    return () => {
        fn((x) => !x);
    };
}
export type Role = "The Insider" | "The Question-Answerer";
