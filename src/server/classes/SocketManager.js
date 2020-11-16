const { ROOMS } = require("../ROOMS");
const H = require("../gameHelper");
const { PLAYER_STATUS } = H;
const Player = require("./Player");
const _ = require("lodash");

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
		this._onChat();
		this._onChangeMap();
	}

	emit(eventName, data) {
		this.io.to(this.roomName).emit(eventName, data);
	}

	_onChangeMap() {
		this.socket.on("GAME:CHANGE_MAP", ({ dir }) => {
			const game = ROOMS.get(this.roomName);
			if (game.owner !== this.id) return;
			if (dir === "left") {
				game.mapIdx -= 1;
				if (game.mapIdx < 0) game.mapIdx = H.MAP.length - 1;
			} else if (dir === "right") {
				game.mapIdx += 1;
				if (game.mapIdx >= H.MAP.length) game.mapIdx = 0;
			}
			this.emit("GAME:CHANGE_MAP", {
				mapIdx: game.mapIdx,
			});
		});
	}

	_onChat() {
		this.socket.on("CHAT", ({ content }) => {
			const game = ROOMS.get(this.roomName);
			const player = game.findPlayerById(this.id);
			this.emit("CHAT", {
				userName: player.name,
				content,
			});
		});
		this.socket.on("CHAT:ENTER", () => {
			const game = ROOMS.get(this.roomName);
			const player = game.findPlayerById(this.id);
			this.emit("CHAT", {
				userName: "system",
				content: `user "${player.name}" just arrived`,
			});
		});
	}

	_onPlayerDropDown() {
		this.socket.on("PLAYER:DROPDOWN", ({ type }) => {
			const game = ROOMS.get(this.roomName);
			if (!game.isStarted) return;

			const player = game.findPlayerById(this.id);
			const isPenalty = player.penalty ? true : false;
			const lines = type === "DOWN" ? player.down() : player.drop();

			if (lines > 1) game.addPenaltyToOthers(player.id, lines - 1);
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
				this.emit("PLAYER:GAMEOVER", {
					id: this.id,
				});
			} else {
				this.emit("PLAYER:DROPDOWN", {
					id: this.id,
					screen: player.screen,
					nextPiece: player.nextPiece,
					score: player.score,
					isPenalty,
					dropTime: H.calcDropTime(game.players),
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
			this.emit("PLAYER:ROTATE", {
				id: this.id,
				screen: player.screen,
			});
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
			game.init();
			this.emit("GAME:START", {
				players: game.getPlayers(),
				isStarted: game.isStarted,
				winner: null,
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
				winner: game.winner,
				players: game.getPlayers(),
			});
			this.emit("ROOM:OWNER", {
				owner: game.owner,
			});
		});
	}

	_onDisconnecting() {
		this.socket.on("disconnecting", () => {
			const game = ROOMS.get(this.roomName);
			if (!game) return;

			const player = game.findPlayerById(this.id);
			this.emit("CHAT", {
				userName: "system",
				content: `user "${player.name}" just left`,
			});

			game.removePlayerById(this.id);
			this.socket.leave(this.roomName);

			if (game.players.size === 0) {
				ROOMS.delete(this.roomName);
				return;
			}

			// someone quit during game
			if (game.isStarted && game.players.size === 1) {
				const lastPlayer = game.players.values().next().value;
				lastPlayer.status = PLAYER_STATUS.GAMEOVER;
				game.isStarted = false;
				game.winner = lastPlayer.id;
				game.owner = game.winner;
				game.dropTime = null;
				return this.emit("GAME:FINISH", {
					winner: game.winner,
					owner: game.winner,
					players: game.getPlayers(),
					isStarted: game.isStarted,
				});
			} else if (game.isStarted && game.players.size > 1) {
				return this.emit("PLAYER:QUIT", {
					id: this.id,
				});
			}

			if (!game.isStarted && game.owner === this.id) {
				game.owner = game.players.keys().next().value;
				game.findPlayerById(game.owner).status = PLAYER_STATUS.INIT;
				this.emit("ROOM:OWNER", {
					owner: game.owner,
				});
			}
			this.emit("ROOM:PLAYERS", {
				winner: game.winner,
				players: game.getPlayers(),
			});
		}); // disconnecting
	}
}

module.exports = SocketManager;
