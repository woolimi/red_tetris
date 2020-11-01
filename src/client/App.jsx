import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tetris from "./pages/Tetris";

const App = () => {
	return (
		<HashRouter hashType="noslash">
			<Route path="/" exact component={Home} />
			<Route path="/:roomName[:userName]" component={Tetris} />
		</HashRouter>
	);
};

export default App;
