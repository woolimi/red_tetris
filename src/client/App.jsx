import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";

const App = () => {
	return (
		<HashRouter hashType="noslash">
			<Route path="/" exact component={Home} />
			<Route path="/:roomName[:userName]" component={Room} />
		</HashRouter>
	);
};

export default App;
