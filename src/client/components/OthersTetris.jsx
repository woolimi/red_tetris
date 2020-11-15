import React, { useMemo } from "react";
import Stage from "./Stage";
import { Grid, Container } from "semantic-ui-react";
import PlayerInfo from "./PlayerInfo";
import { useTetrisStore, useSocketStore } from "./TetrisProvider";
import styled from "styled-components";
import _ from "lodash";

const StyledOtherTetris = styled.div`
	height: 60%;
`;

const OthersTetris = () => {
	const { players, owner } = useTetrisStore();
	const socket = useSocketStore();
	const others = useMemo(() => {
		return Object.values(_.omit(players, [socket.id]));
	}, [players, socket.id]);

	return (
		<StyledOtherTetris>
			<Container fluid>
				<Grid centered>
					{others &&
						others.map((p) => (
							<Grid.Column width={6} key={p.id}>
								<Container textAlign="center" fluid>
									<PlayerInfo isOwner={p.id === owner} name={p.name} />
									<Stage
										screen={p.screen}
										scale={0.5}
										pid={p.id}
										pstatus={p.status}
									></Stage>
								</Container>
							</Grid.Column>
						))}
				</Grid>
			</Container>
		</StyledOtherTetris>
	);
};

export default OthersTetris;
