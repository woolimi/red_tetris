import React, { createContext, useReducer, useContext } from "react";
import H, { HEIGHT, WIDTH } from "../gameHelper";

const defaultState = {};
// id: { id, name, screen, nextPiece, isReady }

const PlayersDispatchContext = createContext(null);
const PlayersStoreContext = createContext(null);

function reducer(players, action) {
	switch (action.type) {
		case "ROOM_FETCH_PLAYERS":
			return action.players;
		case "ROOM_READY":
			return {
				...players,
				[action.id]: {
					...players[action.id],
					isReady: true,
				},
			};
		case "GAME_START":
			return action.players;

		case "PLAYER_LR_MOVE":
			return {
				...players,
				[action.id]: {
					...players[action.id],
					screen: action.screen,
				},
			};
		case "PLAYER_DOWN_MOVE":
			return {
				...players,
				[action.id]: {
					...players[action.id],
					screen: action.screen,
					nextPiece: action.nextPiece,
				},
			};
		case "PLAYER_ROTATE":
			return {
				...players,
				[action.id]: {
					...players[action.id],
					screen: action.screen,
				},
			};
		default:
			throw new Error(`Unhandled action type ${action.type}`);
	}
}

export default function PlayersProvider({ children }) {
	const [players, playersDispatch] = useReducer(reducer, defaultState);

	return (
		<PlayersDispatchContext.Provider value={playersDispatch}>
			<PlayersStoreContext.Provider value={players}>
				{children}
			</PlayersStoreContext.Provider>
		</PlayersDispatchContext.Provider>
	);
}

export const usePlayersDispatch = () => useContext(PlayersDispatchContext);
export const usePlayersStore = () => useContext(PlayersStoreContext);
