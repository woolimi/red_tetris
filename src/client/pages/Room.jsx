import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import Player from "../components/Player";
import { SOCKET_ADDR } from "../../constants";
import { Grid } from "semantic-ui-react";

const PlayGround = styled.section`
	margin: 0;
	padding: 0;
	width: 50vw;
	height: 100vh;
	align-items: center;
	justify-content: center;
	display: flex;
	flex-wrap: wrap;
`;

const Room = ({ history, match }) => {
	const { roomName, userName } = match.params;
	const [others, setOthers] = useState([]);
	const [me, setMe] = useState(null); // {id, name}
	const [owner, setOwner] = useState("");

	const manageSocket = useCallback(() => {
		const socket = io.connect(`${SOCKET_ADDR}/room`, {
			path: "/socket",
			transports: ["websocket"],
		});
		socket.on("connect", () => {
			socket.emit("addPlayer", {
				roomName,
				userName,
			});
		});
		socket.on("players", ({ players }) => {
			const clientId = socket.id.split("#")[1];
			setMe(players.filter((p) => p.id === clientId)[0]);
			setOthers(players.filter((p) => p.id !== clientId));
		});
		socket.on("setOwner", ({ owner }) => {
			setOwner(owner);
		});
		return socket;
	}, [roomName, userName]);

	const checkRoom = useCallback(async () => {
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
	}, [roomName, userName]);

	useEffect(() => {
		let socket = null;
		const init = async () => {
			const ret = await checkRoom();
			if (!ret) return;
			socket = manageSocket();
		};
		init();
		return () => {
			if (socket) socket.close();
		};
	}, [roomName, userName]);

	return (
		<>
			<PlayGround>
				{me && <Player player={me} scale={1} isMe={true} owner={owner} />}
			</PlayGround>
			<PlayGround>
				<Grid columns={2}>
					{others.map((p) => (
						<Player
							key={p.id}
							scale={Math.max(1 / others.length, 0.45)}
							player={p}
							owner={owner}
						/>
					))}
				</Grid>
			</PlayGround>
		</>
	);
};

export default Room;
