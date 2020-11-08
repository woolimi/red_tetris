import React, { useEffect } from "react";
import Stage from "./Stage";
import Score from "./Score";
import { Grid, Container } from "semantic-ui-react";
import PlayerInfo from "./PlayerInfo";
import NextPiece from "./NextPiece";
import { useTetrisStore, useSocketStore } from "./TetrisProvider";
import { useInterval } from "../hooks/useInterval";
import MyButton from "./MyButton";
import { PLAYER_STATUS } from "../gameHelper";

const MyTetris = ({ wrapperRef }) => {
	const { players, owner, dropTime, isStarted } = useTetrisStore();
	const socket = useSocketStore();
	const me = players[socket.id];
	const others = Object.values(_.omit(players, [socket.id]));
	const isOwner = !owner || me.id === owner;

	useInterval(() => {
		socket.emit("PLAYER:DROPDOWN", {
			type: "DOWN",
		});
	}, dropTime);

	return (
		<Container>
			<Grid>
				<Grid.Column width={10}>
					<Container fluid>
						<PlayerInfo isOwner={isOwner} name={me.name} />
						<Stage
							screen={me.screen}
							scale={1}
							status={
								me.status === PLAYER_STATUS.READY && !isStarted ? "READY" : ""
							}
						></Stage>
					</Container>
				</Grid.Column>
				<Grid.Column width={6}>
					<NextPiece type={me.nextPiece} />
					<Score score={me.score} />
					<MyButton
						isOwner={isOwner}
						wrapperRef={wrapperRef}
						disabled={
							isOwner
								? isStarted === true ||
								  !!others.find((p) => p.status !== PLAYER_STATUS.READY)
								: isStarted === true || me.status === PLAYER_STATUS.READY
						}
					/>
				</Grid.Column>
			</Grid>
		</Container>
	);
};

export default MyTetris;
