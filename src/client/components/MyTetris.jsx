import React, { useMemo } from "react";
import Stage from "./Stage";
import Score from "./Score";
import { Grid, Container } from "semantic-ui-react";
import PlayerInfo from "./PlayerInfo";
import NextPiece from "./NextPiece";
import { useTetrisStore, useSocketStore } from "./TetrisProvider";
import { useInterval } from "../hooks/useInterval";
import MyButton from "./MyButton";
import { PLAYER_STATUS } from "../gameHelper";
import _ from "lodash";
import MapSelector from "./MapSelector";

const MyTetris = ({ wrapperRef }) => {
	const { players, owner, dropTime, isStarted } = useTetrisStore();
	const socket = useSocketStore();
	const me = players[socket.id];
	const isOwner = !owner || (me && me.id === owner);
	const others = useMemo(() => {
		return Object.values(_.omit(players, [socket.id]));
	}, [players, socket.id]);

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
						<PlayerInfo isOwner={isOwner} name={me ? me.name : ""} />
						<Stage
							screen={me ? me.screen : null}
							scale={1}
							pstatus={me ? me.status : null}
							pid={me ? me.id : null}
						/>
					</Container>
				</Grid.Column>
				<Grid.Column width={6}>
					<NextPiece type={me ? me.nextPiece : ""} />
					<Score score={me ? me.score : ""} />
					<MapSelector isOwner={isOwner} />
					<MyButton
						isOwner={isOwner}
						wrapperRef={wrapperRef}
						disabled={
							isOwner
								? isStarted === true ||
								  (others &&
										!!others.find((p) => p.status !== PLAYER_STATUS.READY))
								: isStarted === true ||
								  (me && me.status === PLAYER_STATUS.READY)
						}
					/>
				</Grid.Column>
			</Grid>
		</Container>
	);
};

export default MyTetris;
