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

	findPlayerByName(playerName) {
		for (let [key, p] of this.players) {
			if (p.name === playerName) {
				return p;
			}
		}
		return null;
	}

	findPlayerById(playerId) {
		return this.players.get(playerId);
	}

	getPlayers() {
		const ret = {};
		for (const [key, p] of this.players) {
			ret[key] = {
				id: p.id,
				name: p.name,
				nextPiece: p.nextPiece,
				screen: p.screen,
				status: p.status,
				score: p.score,
			};
		}
		return ret;
	}

	removePlayerById(playerId) {
		this.players.delete(playerId);
	}

	setPlayerStatus(playerId, status) {
		this.players.get(playerId).status = status;
	}

	setIsStarted(isStarted) {
		this.isStarted = isStarted;
		for (const [key, p] of this.players) {
			p.status = PLAYER_STATUS.INGAME;
		}
	}

	initGamePieces() {
		this.pieceIdx = (Math.random() * 99) | 0;
	}

	initPlayersPieces() {
		const piece = Piece.TETROMINOS[Game.pieceList[this.pieceIdx]];
		const nextPiece = Game.pieceList[this.pieceIdx + 1];
		const initOffset = piece.length === 4 ? 5 : 4;
		const pos = {
			x: initOffset - ((piece.length / 2) | 0),
			y: 0,
		};
		for (const [key, p] of this.players) {
			p.pieceIdx = this.pieceIdx;
			p.piece = _.cloneDeep(piece);
			p.nextPiece = nextPiece;
			p.setPos(pos.x, pos.y);
			p.status = PLAYER_STATUS.INGAME;
		}
	}
	initPlayersScreens() {
		for (const [key, p] of this.players) {
			p.stage = H.newStage();
			p.screen = H.drawScreen(p);
		}
	}
}

module.exports = Game;
