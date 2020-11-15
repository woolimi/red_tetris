const _ = require("lodash");
const Piece = require("./Piece");
const H = require("../gameHelper");
const { PLAYER_STATUS } = H;

class Game {
	static pieceList = Piece.createList(); // 100 pieces

	constructor(roomName) {
		this.id = roomName;
		this.players = new Map(); // Map(Player)
		this.isStarted = false;
		this.owner = null;
		this.pieceIdx = 0;
		this.winner = null;
	}

	isAllReady() {
		for (let [key, p] of this.players) {
			if (p.status !== PLAYER_STATUS.READY && this.owner !== p.id) {
				return false;
			}
		}
		return true;
	}

	isFinished() {
		if (this.players.size === 1) {
			const solo = this.players.values().next().value;
			if (solo.status === PLAYER_STATUS.INGAME) return false;
			this.isStarted = false;
			this.winner = solo.id;
			return true;
		}

		const survivers = [];
		for (let [key, p] of this.players) {
			if (p.status === PLAYER_STATUS.INGAME) {
				survivers.push(p);
			}
		}
		if (survivers.length > 1) return false;
		this.isStarted = false;
		this.winner = survivers[0].id;
		return true;
	}

	addPlayer(player) {
		this.players.set(player.id, player);
	}

	addPenaltyToOthers(originId, penalty) {
		_.each([...this.players], ([key, p]) => {
			if (p.id !== originId) p.panalty += penalty;
		});
	}

	findPlayerByName(playerName) {
		return _.find([...this.players], ([key, p]) => p.name === playerName);
	}

	findPlayerById(playerId) {
		return this.players.get(playerId);
	}

	getPlayers() {
		const ret = {};
		_.each([...this.players], ([key, p]) => {
			ret[key] = {
				id: p.id,
				name: p.name,
				nextPiece: p.nextPiece,
				screen: p.screen,
				status: p.status,
				score: p.score,
			};
		});
		return ret;
	}

	removePlayerById(playerId) {
		this.players.delete(playerId);
	}

	setPlayerStatus(playerId, status) {
		this.players.get(playerId).status = status;
	}

	init() {
		this.isStarted = true;
		this.winner = null;
		this._initGamePiece();
		this._initPlayers();
	}

	_initGamePiece() {
		this.pieceIdx = (Math.random() * 99) | 0;
	}

	_initPlayers() {
		const nextPiece = Game.pieceList[this.pieceIdx + 1];
		_.each([...this.players], ([key, p]) => p.init(this.pieceIdx, nextPiece));
	}
}

module.exports = Game;
