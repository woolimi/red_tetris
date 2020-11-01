const Piece = require("./Piece");
const _ = require("lodash");
const H = require("../gameHelper");

class Game {
	static pieceList = Piece.createList(); // 100 pieces

	constructor(roomName) {
		this.id = roomName;
		this.players = new Map(); // Map(Player)
		this.isStarted = false;
		this.owner = null;
		this.pieceIdx = 0;
	}

	addPlayer(player) {
		this.players.set(player.id, player);
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
		const ret = {};
		for (const [key, p] of this.players) {
			ret[key] = {
				id: p.id,
				name: p.name,
				nextPiece: p.nextPiece,
				screen: p.screen,
				isReady: p.isReady,
			};
		}
		return ret;
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

	initGamePieces() {
		this.pieceIdx = (Math.random() * 99) | 0;
	}
	initPlayersPieces() {
		const piece = Piece.TETROMINOS[Game.pieceList[this.pieceIdx]];
		const nextPiece = Game.pieceList[this.pieceIdx + 1];
		const initoffset = piece.length === 4 ? 5 : 4;
		const pos = {
			x: initoffset - ((piece.length / 2) | 0),
			y: 0,
		};
		for (const [key, p] of this.players) {
			p.pieceIdx = this.pieceIdx;
			p.piece = piece;
			p.nextPiece = nextPiece;
			p.setPos(pos.x, pos.y);
		}
	}
	initPlayersScreens() {
		for (const [key, p] of this.players) {
			p.screen = H.drawScreen(p);
		}
	}
}

module.exports = Game;
