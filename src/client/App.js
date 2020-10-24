import React from 'react';
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home'
import Room from './pages/Room'

const App = () => {
	return (
		<HashRouter hashType="noslash">
			<Route path="/" exact component={Home}/>
			<Route path="/:room[:playerName]" component={Room} />
		</HashRouter>
	);
}

export default App;