import React, { createContext, useReducer, useContext, useState } from "react";
import io from "socket.io-client";
import H, { PLAYER_STATUS, SERVER } from "../gameHelper";

const defaultState = {
	owner: "",
	winner: "",
	dropTime: null,
	isStarted: false,
	players: {}, // id: { id, name, screen, nextPiece, status }
};

export const TetrisDispatchContext = createContext(null);
export const TetrisStoreContext = createContext(null);
export const SocketContext = createContext(null);

function reducer(tetris, action) {
	switch (action.type) {
		// ROOM
		case "ROOM:PLAYERS":
			return {
				...tetris,
				winner: action.winner,
				players: action.players,
			};
		case "ROOM:OWNER":
			return {
				...tetris,
				owner: action.owner,
			};

		// GAME
		case "GAME:START":
			H.bgmSound.play();
			return {
				...tetris,
				players: action.players,
				isStarted: action.isStarted,
				winner: action.winner,
				dropTime: 1000,
			};
		case "GAME:DROPTIME":
			return {
				...tetris,
				dropTime: action.dropTime,
			};
		case "GAME:FINISH":
			H.bgmSound.stop();
			H.gameoverSound.play();
			return {
				...tetris,
				winner: action.winner,
				owner: action.owner,
				players: action.players,
				isStarted: action.isStarted,
				dropTime: null,
			};

		// PLAYER
		case "PLAYER:READY":
			return {
				...tetris,
				players: {
					...tetris.players,
					[action.id]: {
						...tetris.players[action.id],
						status: PLAYER_STATUS.READY,
					},
				},
			};
		case "PLAYER:MOVE":
			return {
				...tetris,
				players: {
					...tetris.players,
					[action.id]: {
						...tetris.players[action.id],
						screen: action.screen,
					},
				},
			};
		case "PLAYER:ROTATE":
			return {
				...tetris,
				players: {
					...tetris.players,
					[action.id]: {
						...tetris.players[action.id],
						screen: action.screen,
					},
				},
			};
		case "PLAYER:DROPDOWN":
			return {
				...tetris,
				players: {
					...tetris.players,
					[action.id]: {
						...tetris.players[action.id],
						screen: action.screen,
						nextPiece: action.nextPiece,
						score: action.score,
					},
				},
				dropTime: 1000,
			};
		case "PLAYER:GAMEOVER":
			return {
				...tetris,
				players: {
					...tetris.players,
					[action.id]: {
						...tetris.players[action.id],
						status: PLAYER_STATUS.GAMEOVER,
					},
				},
			};
		case "PLAYER:QUIT":
			delete tetris.players[action.id];
			return {
				...tetris,
			};
		default:
			throw new Error(`Unhandled action type ${action.type}`);
	}
}

export function SocketProvider({ children }) {
	const defaultSocket = io.connect(`${SERVER}`, {
		path: "/socket",
		transports: ["websocket"],
	});
	const [socket] = useState(defaultSocket);
	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
}

export default function TetrisProvider({ children }) {
	const [tetris, tetrisDispatch] = useReducer(reducer, defaultState);
	return (
		<TetrisDispatchContext.Provider value={tetrisDispatch}>
			<TetrisStoreContext.Provider value={tetris}>
				{children}
			</TetrisStoreContext.Provider>
		</TetrisDispatchContext.Provider>
	);
}

export const useTetrisDispatch = () => useContext(TetrisDispatchContext);
export const useTetrisStore = () => useContext(TetrisStoreContext);
export const useSocketStore = () => useContext(SocketContext);
