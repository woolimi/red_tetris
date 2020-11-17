import { useEffect } from "react";
import H, { API } from "../gameHelper";

const _check_room = async (roomName, userName, history, socket) => {
	const res = await fetch(
		`${API}/api/room?roomName=${roomName}&userName=${userName}`,
		{ method: "GET" },
	);
	const { error } = await res.json();
	if (error) {
		alert(error);
		history.push(`/`);
		return false;
	}
	socket.emit("ROOM:ADD_PLAYER", {
		roomName,
		userName,
	});
	return true;
};

export function useCheckRoom(roomName, userName, history, socket) {
	useEffect(() => {
		_check_room(roomName, userName, history, socket);
		return () => {
			H.offSound();
			return socket && socket.close();
		};
	}, [roomName, userName, socket]);
}
