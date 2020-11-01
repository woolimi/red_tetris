class Game {
	constructor(roomName) {
		this.id = roomName;
		this.players = new Map(); // Map(Player)
		this.isStarted = false;
		this.owner = null;
	}

	addPlayer(player) {
		this.players.set(player.id, player);
	}

	broadcasting(eventName, data, io) {
		if (!io) throw Error("game.emit(): io is not defined");
		for (let [key] of this.players) {
			io.to("/game#" + key).emit(eventName, data);
		}
	}

	findPlayerByName(playerName) {
		for (let player of this.players) {
			if (player[1].name === playerName) {
				return player;
			}
		}
		return null;
	}

	findPlayerById(playerId) {
		return this.players.get(playerId);
	}

	getPlayers() {
		// return Object.fromEntries(this.players);
		return Array.from(this.players).map((p) => {
			return {
				id: p[1].id,
				name: p[1].name,
				stage: p[1].stage,
				isReady: p[1].isReady,
			};
		});
	}

	removePlayerById(playerId) {
		this.players.delete(playerId);
	}

	setPlayerReady(playerId) {
		this.players.get(playerId).isReady = true;
	}

	setStarted(isStarted) {
		this.isStarted = isStarted;
	}

	distributePieces() {}
}

module.exports = Game;
