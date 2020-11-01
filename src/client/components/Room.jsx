import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Player from "./Player";
import { Grid, Button } from "semantic-ui-react";
import NextBlock from "./NextBlock";

import { useSocketStore } from "./SocketProvider";
import { usePlayersStore, usePlayersDispatch } from "./PlayersProvider";

const GameWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
`;

const MyGround = styled.div`
	margin: 0;
	padding: 0;
	width: 60vw;
	height: 100vh;
	align-items: center;
	justify-content: center;
	display: flex;
	flex-wrap: wrap;
`;

const OtherGround = styled.div`
	margin: 0;
	padding: 0;
	width: 40vw;
	height: 95vh;
	align-items: center;
	justify-content: center;
	display: flex;
	flex-wrap: wrap;
`;

const CenterDiv = styled.div`
	text-align: center;
	justify-content: none;
	margin: 1em;
`;

const Room = ({ history, match }) => {
	const { roomName, userName } = match.params;
	const { socket } = useSocketStore();
	const { me, others } = usePlayersStore();
	const playersDispatch = usePlayersDispatch();
	const [owner, setOwner] = useState("");

	useEffect(() => {
		const checkRoom = async (roomName, userName) => {
			const res = await fetch(
				`http://localhost:5000/api/room?roomName=${roomName}&userName=${userName}`,
				{ method: "GET" },
			);
			const { error } = await res.json();
			if (error) {
				alert(error);
				history.push(`/`);
				return false;
			}
			return true;
		};
		checkRoom(roomName, userName);
		return () => socket.close();
	}, [roomName, userName]);

	useEffect(() => {
		socket.on("player:players", ({ players }) => {
			playersDispatch({ type: "FETCH_ALL", players, id: socket.id });
		});
		socket.on("player:owner", ({ owner }) => {
			setOwner(owner);
		});
		socket.on("player:ready", ({ id }) => {
			playersDispatch({ type: "READY", id });
		});
		socket.emit("player:add", {
			roomName,
			userName,
		});
	}, [roomName, userName]);

	const onKeyDown = (e) => {
		switch (e.key) {
			case "ArrowUp":
				console.log("ArrowUp");
				break;
			case "ArrowDown":
				console.log("ArrowDown");
				break;
			case "ArrowLeft":
				console.log("ArrowLeft");
				break;
			case "ArrowRight":
				console.log("ArrowRight");
				break;
			case " ":
				console.log("Space");
				break;
		}
	};

	const onReady = useCallback(() => {
		socket.emit("player:ready", {});
	}, [socket]);

	return (
		<GameWrapper tabIndex="0" onKeyDown={onKeyDown}>
			<MyGround>
				<Player scale={1} player={me} owner={owner} />
				<CenterDiv>
					<NextBlock />
					{!owner ? null : owner === me.id ? (
						<Button
							color="red"
							disabled={others.find((p) => p.isReady === false)}
						>
							Start
						</Button>
					) : (
						<Button color="blue" onClick={onReady} disabled={me.isReady}>
							Ready
						</Button>
					)}
				</CenterDiv>
			</MyGround>
			{others.length > 0 && (
				<OtherGround>
					{others.map((p) => (
						<Player scale={0.5} player={p} key={p.id} owner={owner} />
					))}
				</OtherGround>
			)}
		</GameWrapper>
	);
};

export default Room;
