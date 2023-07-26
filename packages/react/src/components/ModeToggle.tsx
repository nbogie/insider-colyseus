import Button from "@mui/joy/Button";
import { useColorScheme } from "@mui/joy/styles";
import { useEffect, useState } from "react";

export function ModeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = useState(false);

    // necessary for server-side rendering
    // because mode is undefined on the server
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }

    return (
        <Button
            variant="outlined"
            onClick={() => {
                setMode(mode === "light" ? "dark" : "light");
            }}
        >
            {mode === "light" ? "Turn dark" : "Turn light"}
        </Button>
    );
}
