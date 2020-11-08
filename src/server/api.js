const express = require("express");
const router = express.Router();
const { ROOMS } = require("./Rooms");
const Game = require("./classes/Game");

router.post("/room", (req, res) => {
	const { roomName, userName } = req.body;
	if (ROOMS.has(roomName)) {
		const game = ROOMS.get(roomName);
		if (game.players.size >= 3)
			return res.status(403).json({ error: `Room(${roomName}) is full.` });
		if (game.findPlayerByName(userName)) {
			return res
				.status(403)
				.json({ error: `Username(${userName}) is already taken.` });
		}
		return res.status(200).json({});
	} else {
		ROOMS.set(roomName, new Game(roomName));
		return res.status(200).json({});
	}
});

router.get("/room", (req, res) => {
	const { roomName, userName } = req.query;
	if (!ROOMS.has(roomName))
		return res.status(403).json({ error: `Room(${roomName}) doesn't exist` });
	const game = ROOMS.get(roomName);
	if (game.players.size >= 3)
		return res.status(403).json({ access: false, error: "Room is full." });
	if (game.findPlayerByName(userName))
		return res
			.status(403)
			.json({ error: `User(${userName}) is already taken.` });
	// check if game already started
	return res.status(200).json({});
});

module.exports = router;
