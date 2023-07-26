import React from "react";
import { Role } from "./RoomView";
import Typography from "@mui/joy/Typography";

export function RoleView({
    role,
    wordToGuess,
}: {
    role: Role;
    wordToGuess: string;
}): JSX.Element {
    return (
        <section>
            <Typography>
                You are{" "}
                <Typography sx={{ fontSize: "2rem" }} className="role">
                    {role}!
                </Typography>
            </Typography>
            <Typography>
                The word is{" "}
                <Typography sx={{ fontSize: "3rem" }}>{wordToGuess}</Typography>
            </Typography>
        </section>
    );
}
