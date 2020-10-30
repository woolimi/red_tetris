const { ROOMS } = require("./Rooms");
const Player = require("./classes/Player");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { path: "/socket" });
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const apiRouter = require("./api");
const corsOptions = {
	origin: "http://localhost:8080",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRouter);

const ioRoom = io.of("/room");
const ioGame = io.of("/game");

ioRoom.on("connection", (socket) => {
	console.log(`room:connection "${socket.id}" connected`);

	socket.on("addPlayer", ({ roomName, userName }) => {
		console.log("room:addPlayer");

		const game = ROOMS.get(roomName);
		if (!game) return;

		const player = new Player(socket.client.id, userName);

		// Creator is owner of room.
		if (game.players.size === 0) game.owner = player.id;

		socket.join(roomName);
		game.addPlayer(player);

		ioRoom.to(roomName).emit("players", {
			players: game.getPlayers(),
		});
		ioRoom.to(roomName).emit("setOwner", {
			owner: game.owner,
		});

		console.log("ROOMS", ROOMS);
	});

	socket.on("disconnecting", () => {
		console.log("room:removePlayer");
		const roomName = Object.keys(socket.rooms)[0];
		const game = ROOMS.get(roomName);

		if (!game) return;

		game.removePlayerById(socket.client.id);
		socket.leave(roomName);

		if (game.players.size === 0) {
			ROOMS.delete(roomName);
			console.log("room:destroyRoom");
		} else if (game.owner === socket.client.id) {
			const successor = game.players.keys().next().value;
			game.owner = successor;
			ioRoom.to(roomName).emit("players", {
				players: game.getPlayers(),
			});
			ioRoom.to(roomName).emit("setOwner", {
				owner: game.owner,
			});
		}
		console.log("ROOMS", ROOMS);
	});
});

ioGame.on("connection", (socket) => {
	console.log(`game:connection "${socket.id}" connected`);

	socket.on("disconnect", () => {
		console.log(`game:disconnect "${socket.id}" disconnected`);
	});
});

server.listen(PORT, () =>
	console.log(`server has started http://localhost:${PORT}`),
);
