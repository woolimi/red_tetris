const { ROOMS } = require("../Rooms");
const H = require("../gameHelper");
const { PLAYER_STATUS } = H;
const Player = require("./Player");

class SocketManager {
	constructor(io, socket) {
		this.io = io;
		this.socket = socket;
		this.id = socket.client.id;
		this.roomName = "";
	}

	on() {
		this._onPlayerAdd();
		this._onPlayerReady();
		this._onPlayerMove();
		this._onPlayerDropDown();
		this._onPlayerRotate();
		this._onGameStart();
		this._onDisconnecting();
	}

	emit(eventName, data) {
		this.io.to(this.roomName).emit(eventName, data);
	}

	_onPlayerDropDown() {
		this.socket.on("PLAYER:DROPDOWN", ({ type }) => {
			const game = ROOMS.get(this.roomName);
			if (!game.isStarted) return;

			const player = game.findPlayerById(this.id);
			if (type === "DOWN") player.down();
			if (type == "DROP") player.drop();

			player.screen = H.drawScreen(player);

			if (game.isFinished()) {
				game.findPlayerById(game.winner).status = PLAYER_STATUS.GAMEOVER;
				game.owner = game.winner;
				this.emit("GAME:FINISH", {
					winner: game.winner,
					owner: game.winner,
					players: game.getPlayers(),
					isStarted: game.isStarted,
				});
			} else if (player.status === PLAYER_STATUS.GAMEOVER) {
				console.log("PLAYER:GAMEOVER");
				this.emit("PLAYER:GAMEOVER", {
					id: this.id,
				});
			} else {
				this.emit("PLAYER:DROPDOWN", {
					id: this.id,
					screen: player.screen,
					nextPiece: player.nextPiece,
					score: player.score,
				});
			}
		});
	}

	_onPlayerRotate() {
		this.socket.on("PLAYER:ROTATE", () => {
			const game = ROOMS.get(this.roomName);
			if (!game.isStarted) return;

			const player = game.findPlayerById(this.id);
			player.rotate(1);
			player.screen = H.drawScreen(player);
			const data = {
				id: this.id,
				screen: player.screen,
			};
			this.emit("PLAYER:ROTATE", data);
		});
	}

	_onPlayerMove() {
		this.socket.on("PLAYER:MOVE", ({ dir }) => {
			const game = ROOMS.get(this.roomName);
			if (!game.isStarted) return;

			const player = game.findPlayerById(this.id);
			if (!player.move(dir)) return;

			player.screen = H.drawScreen(player);
			this.emit("PLAYER:MOVE", {
				id: this.id,
				screen: player.screen,
			});
		});
	}

	_onPlayerReady() {
		this.socket.on("PLAYER:READY", () => {
			const game = ROOMS.get(this.roomName);
			game.setPlayerStatus(this.id, PLAYER_STATUS.READY);
			this.emit("PLAYER:READY", {
				id: this.id,
			});
		});
	}

	_onGameStart() {
		this.socket.on("GAME:START", () => {
			const game = ROOMS.get(this.roomName);
			if (this.id !== game.owner) return;
			if (!game.isAllReady()) return;
			game.setIsStarted(true);
			game.initGamePieces();
			game.initPlayersPieces();
			game.initPlayersScreens();
			this.emit("GAME:START", {
				players: game.getPlayers(),
				isStarted: game.isStarted,
			});
		});
	}

	_onPlayerAdd() {
		this.socket.on("ROOM:ADD_PLAYER", ({ roomName, userName }) => {
			const game = ROOMS.get(roomName);
			if (!game) return;
			const player = new Player(this.id, userName);
			if (game.players.size === 0) game.owner = player.id;

			this.socket.join(roomName);
			this.roomName = roomName;
			game.addPlayer(player);

			this.emit("ROOM:PLAYERS", {
				players: game.getPlayers(),
			});
			this.emit("ROOM:OWNER", {
				owner: game.owner,
			});
			console.log("ROOMS", ROOMS);
		});
	}

	_onDisconnecting() {
		this.socket.on("disconnecting", () => {
			console.log(`disconnecting ${this.id}`);
			const game = ROOMS.get(this.roomName);
			if (!game) return;

			game.removePlayerById(this.id);
			this.socket.leave(this.roomName);

			if (game.players.size === 0) {
				ROOMS.delete(this.roomName);
				console.log("ROOMS", ROOMS);
				return;
			}
			if (game.owner === this.id) {
				game.owner = game.players.keys().next().value;
				game.findPlayerById(game.owner).status = PLAYER_STATUS.INIT;
				this.emit("ROOM:OWNER", {
					owner: game.owner,
				});
			}
			this.emit("ROOM:PLAYERS", {
				players: game.getPlayers(),
			});
			console.log("ROOMS", ROOMS);
		});
	}
}

module.exports = SocketManager;
