import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Room = ({ match: { params: { room, playerName}} }) => {
	const ENDPOINT = 'localhost:5000';
	useEffect(() => {
		const socket = io(ENDPOINT);
		console.log(socket);
		return () => {
			socket.close();
		}
	}, [room, playerName]);

	return (
		<div>
			Room
		</div>
	);
};

export default Room;