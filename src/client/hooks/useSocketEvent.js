import { useEffect } from "react";
import H from "../gameHelper";

export function useSocketEvent(socket, tetrisDispatch, roomName, userName) {
	useEffect(() => {
		if (!socket) console.error("socket error");

		// ROOM
		socket.on("ROOM:PLAYERS", (data) => {
			tetrisDispatch({ type: "ROOM:PLAYERS", ...data });
		});
		socket.on("ROOM:OWNER", (data) => {
			tetrisDispatch({ type: "ROOM:OWNER", ...data });
		});

		// GAME
		socket.on("GAME:CHANGE_MAP", (data) => {
			tetrisDispatch({ type: "GAME:CHANGE_MAP", ...data });
		});
		socket.on("GAME:START", (data) => {
			tetrisDispatch({ type: "GAME:START", ...data });
		});
		socket.on("GAME:FINISH", (data) => {
			tetrisDispatch({ type: "GAME:FINISH", ...data });
		});
		socket.on("PLAYER:GAMEOVER", (data) => {
			tetrisDispatch({ type: "PLAYER:GAMEOVER", ...data });
		});
		socket.on("PLAYER:QUIT", (data) => {
			tetrisDispatch({ type: "PLAYER:QUIT", ...data });
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
			if (data.isPenalty && data.id === socket.id) H.penaltySound.play();
			tetrisDispatch({ type: "PLAYER:DROPDOWN", ...data });
		});
	}, [roomName, userName]);
}
