import React from "react";
import Stage from "./Stage";
import { Grid, Container } from "semantic-ui-react";
import PlayerInfo from "./PlayerInfo";
import { useTetrisStore, useSocketStore } from "./TetrisProvider";
import styled from "styled-components";

const StyledOtherTetris = styled.div`
	height: 60%;
`;

const OthersTetris = () => {
	const { players, owner } = useTetrisStore();
	const socket = useSocketStore();
	const others = Object.values(_.omit(players, [socket.id]));

	return (
		<StyledOtherTetris>
			<Container fluid>
				<Grid centered>
					{others.map((p) => (
						<Grid.Column width={6} key={p.id}>
							<Container textAlign="center" fluid>
								<PlayerInfo isOwner={p.id === owner} name={p.name} />
								<Stage screen={p.screen} scale={0.5} player={p}></Stage>
							</Container>
						</Grid.Column>
					))}
				</Grid>
			</Container>
		</StyledOtherTetris>
	);
};

export default React.memo(OthersTetris);
