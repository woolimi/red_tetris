class Piece {
	constructor() {
		const types = "IJLOSTZ";
		this.matrix = TETROMINOS[types[(Math.random() * types.length) | 0]];
	}
}

module.exports = Piece;
