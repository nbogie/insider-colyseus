import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import { Room } from "colyseus.js";
import { useState } from "react";

export function NameChanger({ room }: { room: Room }): JSX.Element {
    const [localName, setLocalName] = useState<string>("");
    function handleClickChangeName() {
        if (room) {
            room.send("changeName", localName);
        }
    }
    return (
        <Stack direction="row" spacing={2}>
            <Input
                name="name"
                type="text"
                placeholder="Your name"
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
            />
            <Button onClick={handleClickChangeName}>Change Name</Button>
        </Stack>
    );
}
