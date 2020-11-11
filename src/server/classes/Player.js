const _ = require("lodash");
const H = require("../gameHelper");
const { PLAYER_STATUS } = H;
const Piece = require("./Piece");
const Game = require("./Game");

class Player {
	constructor(id, name) {
		this.id = id;
		this.name = name;
		this.pieceIdx = 0;
		this.stage = H.newStage();
		this.screen = H.newStage();
		this.score = 0;
		this.status = PLAYER_STATUS.INIT;
		this.pos = { x: 0, y: 0 };
		this.piece = [0];
		this.nextPiece = "";
		this.panalty = 0;
	}

	setPos(x, y) {
		this.pos.x = x;
		this.pos.y = y;
	}

	move(dir) {
		this.pos.x += dir;
		if (H.collide(this)) {
			this.pos.x -= dir;
			return false;
		}
		return true;
	}

	down() {
		this.pos.y++;
		if (H.collide(this)) {
			this.pos.y--;
			return this._cleanUp();
		}
		return 0;
	}

	drop() {
		while (!H.collide(this)) {
			this.pos.y++;
		}
		this.pos.y--;
		return this._cleanUp();
	}

	_cleanUp() {
		this.mergePiece();
		this.mergePanalty();
		const rows = this.sweep();
		this.reset();
		// shadow is always length = 2
		if (H.collide(this) || this.stage[0].find((v) => v !== 0 && v.length !== 2))
			this.status = PLAYER_STATUS.GAMEOVER;
		return rows;
	}

	rotate(dir) {
		const pos = this.pos.x;
		let offset = 1;
		this._rotate(this.piece, dir);
		while (H.collide(this)) {
			this.pos.x += offset;
			offset = -(offset + (offset > 0 ? 1 : -1));
			if (offset > this.piece[0].length) {
				this._rotate(this.piece, -dir);
				this.pos.x = pos;
				return;
			}
		}
	}

	_rotate(matrix, dir) {
		for (let y = 0; y < matrix.length; ++y) {
			for (let x = 0; x < y; ++x) {
				[matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
			}
		}
		if (dir > 0) {
			matrix.forEach((row) => row.reverse());
		} else {
			matrix.reverse();
		}
	}

	// piece to stage
	mergePiece() {
		this.piece.forEach((row, y) => {
			row.forEach((val, x) => {
				if (
					val !== 0 &&
					!_.isUndefined(this.stage[y + this.pos.y]) &&
					!_.isUndefined(this.stage[y + this.pos.y][x + this.pos.x])
				) {
					this.stage[y + this.pos.y][x + this.pos.x] = val;
				}
			});
		});
	}

	mergePanalty() {
		for (let i = 0; i < this.panalty; i++) {
			const row = new Array(10).fill("B");
			this.stage.shift();
			this.stage.push(row);
		}
		this.panalty = 0;
	}

	// remove prev piece => add new piece
	// reset player pos
	reset() {
		this.piece = _.cloneDeep(Piece.TETROMINOS[this.nextPiece]);
		this.pieceIdx = (this.pieceIdx + 1) % 100;
		this.nextPiece = Game.pieceList[this.pieceIdx];
		const initOffset = this.piece.length === 4 ? 5 : 4;
		this.pos.x = initOffset - ((this.piece.length / 2) | 0);
		this.pos.y = 0;
	}

	// remove filled line and return score
	// 1 line : 10 score
	// 2 line : 30 score
	// 3 line : 60 score
	// 4 line : 120 score
	sweep() {
		let rowCount = 0;
		let score = 0;
		outer: for (let y = this.stage.length - 1; y > 0; --y) {
			for (let x = 0; x < this.stage[y].length; ++x) {
				if (this.stage[y][x] === 0 || this.stage[y][x] === "B") {
					continue outer;
				}
			}
			const row = this.stage.splice(y, 1)[0].fill(0);
			this.stage.unshift(row);
			++y;
			rowCount += 1;
			score += rowCount * 10;
		}
		this.score += score;
		return rowCount;
	}
}

module.exports = Player;
