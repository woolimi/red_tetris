const _ = require("lodash");

H = {};

H.newStage = () => {
	return Array.from(Array(20 + 1), () => new Array(10).fill(0));
};

H.collide = (player) => {
	const { stage, piece, pos } = player;
	for (let y = 0; y < piece.length; ++y) {
		for (let x = 0; x < piece[y].length; ++x) {
			if (
				piece[y][x] !== 0 &&
				(stage[y + pos.y] && stage[y + pos.y][x + pos.x]) !== 0
			) {
				return true;
			}
		}
	}
	return false;
};

H.drawScreen = (player) => {
	const { stage, piece, pos } = player;
	const newScreen = _.cloneDeep(stage);
	piece.forEach((row, y) => {
		row.forEach((val, x) => {
			if (val !== 0) {
				newScreen[pos.y + y][pos.x + x] = val;
			}
		});
	});
	return newScreen;
};

module.exports = H;
