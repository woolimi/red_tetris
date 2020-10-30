import React, { useState, useEffect, useCallback } from "react";
import Stage from "./Stage";
import NextBlock from "./NextBlock";
import styled from "styled-components";
import { Grid, Card, Icon, Button } from "semantic-ui-react";
import { WIDTH, HEIGHT } from "../../constants";
import io from "socket.io-client";
import { SOCKET_ADDR } from "../../constants";

const PlayerWrapper = styled.div`
	margin: 1em;
	padding: 0;
	display: flex;
	text-align: center;
`;

const initStage = () => {
	return new Array(HEIGHT).fill(new Array(WIDTH).fill(0));
};

const Player = ({ player, scale = 0.4, isMe = false, owner }) => {
	const [stage, setStage] = useState(initStage());
	const [isReady, setisReady] = useState(false);
	const [pos, setPos] = useState({ x: 0, y: 0 });

	const manageSocket = useCallback(() => {
		const socket = io.connect(`${SOCKET_ADDR}/game`, {
			path: "/socket",
			transports: ["websocket"],
		});
		return socket;
	}, [player.id]);

	useEffect(() => {
		let socket = null;
		const init = async () => {
			socket = manageSocket();
		};
		init();
		return () => {
			if (socket) socket.close();
		};
	}, [player.id]);

	return (
		<PlayerWrapper>
			<div>
				{player.id === owner && <Icon color="red" name="star"></Icon>}
				<span>{player.name}</span>
				<Stage stage={stage} scale={scale} />
			</div>
			<div>
				{isMe && <NextBlock />}
				{isMe &&
					(player.id === owner ? (
						<Button color="red">Start</Button>
					) : (
						<Button color="blue" disabled={isReady}>
							Ready
						</Button>
					))}
			</div>
		</PlayerWrapper>
	);
};

export default Player;
