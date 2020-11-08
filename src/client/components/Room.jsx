import React, { useCallback, useRef, useEffect } from "react";
import { Grid, Container, Segment } from "semantic-ui-react";
import {
	useTetrisStore,
	useTetrisDispatch,
	useSocketStore,
} from "./TetrisProvider";
import { useSocketEvent } from "../hooks/useSocketEvent";
import { useCheckRoom } from "../hooks/useCheckRoom";
import MyTetris from "./MyTetris";
import OthersTetris from "./OthersTetris";
import Chat from "./Chat";
import styled from "styled-components";
import { Dimmer, Loader } from "semantic-ui-react";

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	display: flex;
	align-items: center;
`;

const Room = ({ history, match }) => {
	const { roomName, userName } = match.params;
	const socket = useSocketStore();
	const { isStarted } = useTetrisStore();
	const wrapperRef = useRef(null);
	const tetrisDispatch = useTetrisDispatch();

	// custom hook
	useCheckRoom(roomName, userName, history, socket);
	useSocketEvent(socket, tetrisDispatch, roomName, userName);

	// keydown event
	const onKeyDown = useCallback(
		(e) => {
			if (!isStarted) return;
			switch (e.key) {
				case "ArrowUp":
					socket.emit("PLAYER:ROTATE");
					e.preventDefault();
					break;
				case "ArrowDown":
					socket.emit("PLAYER:DROPDOWN", {
						type: "DOWN",
					});
					tetrisDispatch({ type: "GAME:DROPTIME", dropTime: null });
					e.preventDefault();
					break;
				case "ArrowLeft":
					socket.emit("PLAYER:MOVE", {
						dir: -1,
					});
					e.preventDefault();
					break;
				case "ArrowRight":
					socket.emit("PLAYER:MOVE", {
						dir: 1,
					});
					e.preventDefault();
					break;
				case " ":
					socket.emit("PLAYER:DROPDOWN", {
						type: "DROP",
					});
					tetrisDispatch({ type: "GAME:DROPTIME", dropTime: null });
					e.preventDefault();
					break;
			}
		},
		[socket, isStarted],
	);

	return (
		<Wrapper role="button" tabIndex="0" onKeyDown={onKeyDown} ref={wrapperRef}>
			<Container textAlign="center" fluid>
				{!socket.connected ? (
					<Dimmer active>
						<Loader content="Loading" />
					</Dimmer>
				) : (
					<Grid>
						<Grid.Column width={8}>
							<MyTetris wrapperRef={wrapperRef} />
						</Grid.Column>
						<Grid.Column width={8}>
							<div style={{ height: "70%" }}>
								<OthersTetris />
							</div>
							<div style={{ height: "30%" }}>
								<Chat />
							</div>
						</Grid.Column>
					</Grid>
				)}
			</Container>
		</Wrapper>
	);
};

export default Room;
