import { useState, useEffect } from "react";
import io from "socket.io-client";
import { SOCKET_ADDR } from "../../constants";
import { usePlayersState, usePlayersDispatch } from "../components/RoomContext";

export function useSocket(roomName, userName, history) {
	const [socket, setSocket] = useState(null);
	const dispatch = usePlayersDispatch();

	const checkRoom = async (roomName, userName) => {
		const res = await fetch(
			`http://localhost:5000/api/room?roomName=${roomName}&userName=${userName}`,
			{ method: "GET" },
		);
		const { error } = await res.json();
		if (error) {
			alert(error);
			history.push(`/`);
			return false;
		}
		return true;
	};

	useEffect(() => {
		let s = null;
		const init = async () => {
			const ret = await checkRoom(roomName, userName);
			if (!ret) return;
			s = io.connect(`${SOCKET_ADDR}/room`, {
				path: "/socket",
				transports: ["websocket"],
			});
			setSocket(s);

			s.on("connect", () => {
				s.emit("addPlayer", {
					roomName,
					userName,
				});
			});

			s.on("players", ({ me, others }) => {
				dispatch({
					type: "FETCH",
					data: { me, others },
				});
			});
		};
		init();
		return () => {
			if (s) s.close();
		};
	}, [roomName, userName]);

	return socket;
}
