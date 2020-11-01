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

io.on("connection", (socket) => {
	console.log(`connection "${socket.id}" connected`);

	socket.on("player:ready", () => {
		const roomName = Object.keys(socket.rooms)[0];
		const game = ROOMS.get(roomName);

		game.setPlayerReady(socket.client.id);
		io.to(roomName).emit("player:ready", {
			id: socket.client.id,
		});
	});

	socket.on("player:add", ({ roomName, userName }) => {
		console.log("player:add");

		const game = ROOMS.get(roomName);
		if (!game) return;

		const player = new Player(socket.client.id, userName);

		if (game.players.size === 0) game.owner = player.id;

		socket.join(roomName);
		game.addPlayer(player);
		io.to(roomName).emit("player:players", {
			players: game.getPlayers(),
		});

		io.to(roomName).emit("player:owner", {
			owner: game.owner,
		});
		console.log("ROOMS", ROOMS);
	});

	socket.on("disconnecting", () => {
		console.log(`disconnecting ${socket.client.id}`);
		const roomName = Object.keys(socket.rooms)[0];
		const game = ROOMS.get(roomName);

		if (!game) return;

		game.removePlayerById(socket.client.id);
		socket.leave(roomName);

		if (game.players.size === 0) {
			ROOMS.delete(roomName);
			console.log("room:destroyRoom");
		} else {
			io.to(roomName).emit("player:players", {
				players: game.getPlayers(),
			});
			if (game.owner === socket.client.id) {
				const successor = game.players.keys().next().value;
				game.owner = successor;
				io.to(roomName).emit("player:owner", {
					owner: game.owner,
				});
			}
		}

		console.log("ROOMS", ROOMS);
	});
});

server.listen(PORT, () =>
	console.log(`server has started http://localhost:${PORT}`),
);
