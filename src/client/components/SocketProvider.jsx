import React, { createContext, useReducer, useContext } from "react";
import io from "socket.io-client";
import { SERVER } from "../gameHelper";

const SocketContext = createContext();

function reducer(socket, action) {
	if (!socket) throw new Error(`socket is ${socket}`);

	switch (action.type) {
		case "DISCONNECT":
			return socket.close();
		default:
			throw new Error(`Unhandled action type ${action.type}`);
	}
}

export default function SocketProvider({ children }) {
	const defaultState = io.connect(`${SERVER}`, {
		path: "/socket",
		transports: ["websocket"],
	});
	const [socket, socketDispatch] = useReducer(reducer, defaultState);
	const value = { socket, socketDispatch };

	return (
		<SocketContext.Provider value={value}>{children}</SocketContext.Provider>
	);
}

export const useSocketStore = () => useContext(SocketContext);
