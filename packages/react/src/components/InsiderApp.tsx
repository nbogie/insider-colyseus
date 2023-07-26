import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";
import { toast } from "react-toastify";
import { useGameRoom } from "../hooks/useGameRoom";
import { JoinLink } from "./JoinLink";
import { NameChanger } from "./NameChanger";
import { RoomView } from "./RoomView";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

export function InsiderApp(): JSX.Element {
    const { room, createRoom } = useGameRoom();
    async function handleClickCreateRoom() {
        try {
            await createRoom();
            toast("New room created.  URL in clipboard.");
        } catch (error) {
            toast.error("" + error);
            console.error(error);
        }
    }

    async function handleClickStartGame() {
        if (!room) {
            alert("not connected or no room");
            return;
        }
        room.send("startGame");
    }

    return (
        <Grid container justifyContent={"center"} alignItems={"center"}>
            <Sheet variant="plain">
                <AspectRatio ratio="4/3" sx={{ width: "80vw" }}>
                    <Stack direction="column" spacing="3px">
                        <Typography level="h1">The Insider</Typography>
                        {room ? (
                            <RoomView room={room} />
                        ) : (
                            <Button onClick={handleClickCreateRoom}>
                                Create Room
                            </Button>
                        )}
                        {room && <JoinLink url={urlToJoinRoom(room.roomId)} />}
                        <Button
                            onClick={handleClickStartGame}
                            endDecorator={">"}
                        >
                            Start Game
                        </Button>
                        {room && <NameChanger room={room} />}
                    </Stack>
                </AspectRatio>
            </Sheet>
        </Grid>
    );
}

export function urlToJoinRoom(roomId: string): string {
    return `${window.location.origin}/#room_id=${roomId}`;
}
