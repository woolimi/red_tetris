import React from "react";
import Room from "../components/Room";
import SocketProvider from "../components/SocketProvider";
import PlayersProvider from "../components/PlayersProvider";

const Tetris = ({ history, match }) => {
	return (
		<SocketProvider>
			<PlayersProvider>
				<Room history={history} match={match} />
			</PlayersProvider>
		</SocketProvider>
	);
};

export default Tetris;
