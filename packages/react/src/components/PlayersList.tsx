import List from "@mui/joy/List";
import Typography from "@mui/joy/Typography";
import * as Colyseus from "colyseus.js";
import { MyRoomState } from "../core/myRoomState";

export function PlayersList({
    room,
}: {
    room: Colyseus.Room<MyRoomState>;
}): JSX.Element {
    return (
        <>
            <Typography level="h4">Players:</Typography>
            <List>
                {Array.from(room.state.players.entries())
                    .map(([k, v]) => v.name)
                    .join(", ")}
            </List>
        </>
    );
}
