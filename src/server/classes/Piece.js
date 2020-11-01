class Piece {
	static TETROMINOS = {
		0: [0],
		I: [
			[0, 0, 0, 0],
			["I", "I", "I", "I"],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		J: [
			["J", 0, 0],
			["J", "J", "J"],
			[0, 0, 0],
		],
		L: [
			[0, 0, "L"],
			["L", "L", "L"],
			[0, 0, 0],
		],
		O: [
			[0, "O", "O", 0],
			[0, "O", "O", 0],
			[0, 0, 0, 0],
		],
		S: [
			[0, "S", "S"],
			["S", "S", 0],
			[0, 0, 0],
		],
		T: [
			[0, "T", 0],
			["T", "T", "T"],
			[0, 0, 0],
		],
		Z: [
			["Z", "Z", 0],
			[0, "Z", "Z"],
			[0, 0, 0],
		],
	};
	static types = "IJLOSTZ";
	static createList() {
		let list = "";
		for (let i = 0; i < 100; i++) {
			list += Piece.types[(Math.random() * Piece.types.length) | 0];
		}
		return list;
	}
}

module.exports = Piece;
