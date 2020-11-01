import React, { createContext, useReducer, useContext } from "react";

const defaultState = {
	me: {
		name: "",
		stage: new Array(10).fill(new Array(20).fill(0)),
		pieces: [],
	},
	others: [],
};

const PlayersDispatchContext = createContext(null);
const PlayersStoreContext = createContext(null);

function reducer({ me, others }, action) {
	switch (action.type) {
		case "FETCH_ALL":
			return {
				me: action.players.find((p) => p.id === action.id),
				others: action.players.filter((p) => p.id !== action.id),
			};
		case "READY":
			if (me.id === action.id) me.isReady = true;
			else {
				others.forEach((p) => {
					if (p.id === action.id) p.isReady = true;
				});
			}
			return {
				me,
				others,
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
