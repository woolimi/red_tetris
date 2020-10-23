import React, { useEffect } from 'react';
import './app.css';
import io from 'socket.io-client';

const App = () => {
	const ENDPOINT = 'http://localhost:5000';
	useEffect(() => {
		const socket = io(ENDPOINT, { transports: ['websocket'] });
	}, []);
	return (
		<div>
			hello
		</div>
	);
}

export default App;