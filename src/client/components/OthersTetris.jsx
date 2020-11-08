import React from "react";
import Stage from "./Stage";
import { Grid, Container } from "semantic-ui-react";
import PlayerInfo from "./PlayerInfo";
import { useTetrisStore, useSocketStore } from "./TetrisProvider";
import { PLAYER_STATUS } from "../gameHelper";

const OthersTetris = () => {
	const { players, owner, isStarted } = useTetrisStore();
	const socket = useSocketStore();
	const others = Object.values(_.omit(players, [socket.id]));

	return (
		<Container fluid>
			<Grid centered>
				{others.map((p) => (
					<Grid.Column width={6} key={p.id}>
						<Container textAlign="center" fluid>
							<PlayerInfo isOwner={p.id === owner} name={p.name} />
							<Stage
								screen={p.screen}
								scale={0.5}
								status={
									p.status === PLAYER_STATUS.READY && !isStarted ? "READY" : ""
								}
							></Stage>
						</Container>
					</Grid.Column>
				))}
			</Grid>
		</Container>
	);
};

export default React.memo(OthersTetris);
