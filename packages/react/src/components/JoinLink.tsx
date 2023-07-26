import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";

export function JoinLink({ url }: { url: string }): JSX.Element {
    function copyJoinLinkToClipboard(url: string): void {
        navigator.clipboard.writeText(url);
    }

    return (
        <Stack direction="row" spacing={2}>
            <Input className="joinLink" value={url} readOnly></Input>
            <Button onClick={() => copyJoinLinkToClipboard(url)}>copy</Button>
        </Stack>
    );
}
