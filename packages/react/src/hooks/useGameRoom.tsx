import { useEffect, useState } from "react";
import * as Colyseus from "colyseus.js";
import { splitQueryStringIntoParams } from "../utils/urlUtils";
import { MyRoomState } from "../core/myRoomState";
import { urlToJoinRoom } from "../components/InsiderApp";
import { getServerURL } from "../utils/getServerURL";
const colyseusServerURL = getServerURL();
let client: Colyseus.Client | null = null;
try {
    client = new Colyseus.Client(colyseusServerURL);
    console.log(
        "established connection to Colyseus server: ",
        colyseusServerURL
    );
} catch (error) {
    console.error(
        "Error creating Colyseus client to " + colyseusServerURL,
        error
    );
}
/**.  Returns and manages a room connection with the Colyseum game server.
 * Will automatically join the room whose room_id is given in the browser location href hash as room_id param.
 * Otherwise, the room will initially be null, and will be set to a new room when createRoom is called.
 */
export function useGameRoom() {
    const [room, setRoom] = useState<Colyseus.Room<MyRoomState> | null>(null);
    const [, setStateCounter] = useState(0);

    function setupRoomListeners(joinedRoom: Colyseus.Room<MyRoomState>) {
        try {
            console.log(joinedRoom.sessionId, "joined", joinedRoom.name);

            joinedRoom.onMessage("*", (stuff, message) =>
                console.log("client got message: ", stuff, " msg: ", message)
            );
            joinedRoom.onStateChange((state) => {
                console.log("room state change to ", state);
                setStateCounter((p) => p + 1); //force re-render - room state has been mutated
            });
            joinedRoom.onError((code, message) =>
                console.log("error from server ", code, " msg: ", message)
            );
            joinedRoom.onLeave((code) =>
                console.log("someone left server: ", code)
            );
        } catch (e) {
            console.log("JOIN ERROR", e);
        }
    }

    async function createRoom() {
        if (!client) {
            alert("not connected");
            return;
        }
        try {
            const ROOM_TYPE = "my_room";
            const newRoom = await client.create<MyRoomState>(ROOM_TYPE);

            const joinURL = urlToJoinRoom(newRoom.roomId);
            navigator.clipboard.writeText(joinURL);
            setRoom(newRoom);
            setupRoomListeners(newRoom);
        } catch (err) {
            throw new Error(
                "Error creating room on colyseus server: " + colyseusServerURL,
                { cause: err }
            );
        }
    }
    function parseRoomIdFromHash(hash: string): string | null {
        const params = splitQueryStringIntoParams(hash.slice(1));
        return params["room_id"] ?? null;
    }

    useEffect(() => {
        async function joinRoomAutomaticallyMaybe() {
            if (!client) {
                throw new Error("could not connect to Colyseus server");
            } else {
                console.log("client is not null");
            }
            const roomIdFromHash = parseRoomIdFromHash(window.location.hash);

            if (roomIdFromHash) {
                const joinedRoom = await client.joinById<MyRoomState>(
                    roomIdFromHash
                );
                setRoom(joinedRoom);
                setupRoomListeners(joinedRoom);
            }
        }
        if (!room) {
            joinRoomAutomaticallyMaybe();
        }
        function tearDown() {
            console.log("calling tearDown");
            if (room) {
                console.log("removing all listeners and leaving room.", room);
                room.leave();
                room.removeAllListeners();
                setRoom(null);
            }
        }
        return tearDown;
        //when we get room, run this again, so we can make a corrected tearDown function.  We won't actually join another room if we have a room.
    }, [room]);

    return { room, setRoom, createRoom };
}
