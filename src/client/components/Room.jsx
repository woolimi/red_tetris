import React, { useEffect, useState, useCallback } from "react";
import {
	GameWrapper,
	MyGround,
	CenterDiv,
	OtherGround,
} from "./style/StyledRoom";
import Player from "./Player";
import { Button } from "semantic-ui-react";
import NextBlock from "./NextBlock";

import { useSocketStore } from "./SocketProvider";
import { usePlayersStore, usePlayersDispatch } from "./PlayersProvider";
import { SERVER } from "../gameHelper";

const Room = ({ history, match }) => {
	const { roomName, userName } = match.params;
	const { socket } = useSocketStore();
	const players = usePlayersStore();
	const playersDispatch = usePlayersDispatch();
	const [owner, setOwner] = useState("");
	const me = players[socket.id];
	const others = Object.values(_.omit(players, [socket.id]));

	useEffect(() => {
		// const checkRoom = async (roomName, userName) => {
		// 	const res = await fetch(
		// 		`${SERVER}/api/room?roomName=${roomName}&userName=${userName}`,
		// 		{ method: "GET" },
		// 	);
		// 	const { error } = await res.json();
		// 	if (error) {
		// 		alert(error);
		// 		history.push(`/`);
		// 		return false;
		// 	}
		// 	return true;
		// };
		// checkRoom(roomName, userName);
		return () => socket.close();
	}, [roomName, userName]);

	// ROOM EVENT
	useEffect(() => {
		socket.on("player:players", ({ players }) => {
			playersDispatch({ type: "ROOM_FETCH_PLAYERS", players });
		});
		socket.on("player:owner", ({ owner }) => {
			setOwner(owner);
		});
		socket.on("player:ready", ({ id }) => {
			playersDispatch({ type: "ROOM_READY", id });
		});
		socket.emit("player:add", {
			roomName,
			userName,
		});
	}, [roomName, userName]);

	// GAME EVENT
	useEffect(() => {
		socket.on("game:start", ({ players }) => {
			playersDispatch({ type: "GAME_START", players });
		});
		socket.on("game:move", ({ id, screen }) => {
			playersDispatch({ type: "PLAYER_LR_MOVE", id, screen });
		});
		socket.on("game:down", ({ id, screen, nextPiece }) => {
			playersDispatch({ type: "PLAYER_DOWN_MOVE", id, screen, nextPiece });
		});
	}, [roomName, userName]);

	const onReady = useCallback(() => {
		socket.emit("player:ready", {
			roomName,
		});
	}, [socket, roomName]);

	const onStart = useCallback(() => {
		socket.emit("game:start", {
			roomName,
		});
	}, [socket, roomName]);

	const onKeyDown = (e) => {
		switch (e.key) {
			case "ArrowUp":
				console.log("ArrowUp");
				e.preventDefault();
				break;
			case "ArrowDown":
				socket.emit("game:down", {
					roomName,
				});
				e.preventDefault();
				break;
			case "ArrowLeft":
				socket.emit("game:move", {
					dir: -1,
					roomName,
				});
				e.preventDefault();
				break;
			case "ArrowRight":
				socket.emit("game:move", {
					dir: 1,
					roomName,
				});
				e.preventDefault();
				break;
			case " ":
				console.log("Space");
				e.preventDefault();
				break;
		}
	};

	return (
		<GameWrapper tabIndex="0" onKeyDown={onKeyDown}>
			{_.isEmpty(players) ? (
				<div>Loading...</div>
			) : (
				<>
					<MyGround>
						<Player scale={1} player={me} owner={owner} />
						<CenterDiv>
							<NextBlock />
							{!owner ? null : owner === me.id ? (
								<Button
									color="red"
									onClick={onStart}
									disabled={
										others.find((p) => p.isReady === false) ? true : false
									}
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
					<OtherGround>
						{others.map((p) => (
							<Player scale={0.5} player={p} key={p.id} owner={owner} />
						))}
					</OtherGround>
				</>
			)}
		</GameWrapper>
	);
};

export default Room;
