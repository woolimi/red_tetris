import React from "react";
import Room from "../components/Room";
import TetrisProvider, { SocketProvider } from "../components/TetrisProvider";

const Tetris = ({ history, match }) => {
	return (
		<SocketProvider>
			<TetrisProvider>
				<Room history={history} match={match} />
			</TetrisProvider>
		</SocketProvider>
	);
};

export default Tetris;
