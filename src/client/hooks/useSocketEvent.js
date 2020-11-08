import { useEffect } from "react";

export function useSocketEvent(socket, tetrisDispatch, roomName, userName) {
	useEffect(() => {
		if (!socket) throw Error("socket connection error");

		// ROOM
		socket.on("ROOM:PLAYERS", (data) => {
			tetrisDispatch({ type: "ROOM:PLAYERS", ...data });
		});
		socket.on("ROOM:OWNER", (data) => {
			tetrisDispatch({ type: "ROOM:OWNER", ...data });
		});

		// GAME
		socket.on("GAME:START", (data) => {
			tetrisDispatch({ type: "GAME:START", ...data });
		});
		socket.on("GAME:FINISH", (data) => {
			tetrisDispatch({ type: "GAME:FINISH", ...data });
		});
		socket.on("PLAYER:GAMEOVER", (data) => {
			tetrisDispatch({ type: "PLAYER:GAMEOVER", ...data });
		});

		//PLAYER
		socket.on("PLAYER:READY", (data) => {
			tetrisDispatch({ type: "PLAYER:READY", ...data });
		});
		socket.on("PLAYER:MOVE", (data) => {
			tetrisDispatch({ type: "PLAYER:MOVE", ...data });
		});
		socket.on("PLAYER:ROTATE", (data) => {
			tetrisDispatch({ type: "PLAYER:ROTATE", ...data });
		});
		socket.on("PLAYER:DROPDOWN", (data) => {
			tetrisDispatch({ type: "PLAYER:DROPDOWN", ...data });
		});
	}, [roomName, userName]);
}
