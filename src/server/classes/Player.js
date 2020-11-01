class Player {
	constructor(id, name) {
		this.id = id;
		this.name = name;
		this.pieces = []; // Map(Pieces)
		this.stage = new Array(10).fill(new Array(20).fill(0));
		this.score = 0;
		this.isReady = false;
	}

	addPiece(newPiece) {
		this.pieces.push(newPiece);
	}

	getPiece() {
		if (this.pieces[0]) return this.pieces[0];
		else throw new Error("getPiece() : No piece");
	}

	getNextPiece() {
		if (this.pieces[1]) return this.pieces[1];
		else throw new Error("getNextPiece() : No next piece");
	}

	removePiece() {
		if (!this.pieces.unshift())
			throw new Error("removePiece() : No piece to remove");
	}
}

module.exports = Player;
