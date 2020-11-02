const H = require("../gameHelper");
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
		this.isReady = false;
		this.isGameOver = false;
		this.pos = { x: 0, y: 0 };
		this.piece = [0];
		this.nextPiece = "";
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
			this.merge();
			this.reset();
			this.score += this.sweep();
		}
	}

	drop() {
		while (!H.collide(this)) {
			this.pos.y++;
		}
		this.pos.y--;
		this.merge();
		this.reset();
		this.score += this.sweep();
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
	merge() {
		this.piece.forEach((row, y) => {
			row.forEach((val, x) => {
				if (val !== 0) {
					this.stage[y + this.pos.y][x + this.pos.x] = val;
				}
			});
		});
	}

	// remove prev piece => add new piece
	// reset player pos
	reset() {
		this.pieceIdx = (this.pieceIdx + 1) % 100;
		this.piece = Piece.TETROMINOS[Game.pieceList[this.pieceIdx]];
		this.nextPiece = Game.pieceList[this.pieceIdx];
		const initOffset = this.piece.length === 4 ? 5 : 4;
		this.pos.x = initOffset - ((this.piece.length / 2) | 0);
		this.pos.y = 0;
	}

	// remove filled line and return score
	sweep() {
		let rowCount = 1;
		let score = 0;
		outer: for (let y = this.stage.length - 1; y > 0; --y) {
			for (let x = 0; x < this.stage[y].length; ++x) {
				if (this.stage[y][x] === 0) {
					continue outer;
				}
			}
			const row = this.stage.splice(y, 1)[0].fill(0);
			this.stage.unshift(row);
			++y;
			score += rowCount * 10;
			rowCount *= 2;
		}
		return score;
	}
}

module.exports = Player;
