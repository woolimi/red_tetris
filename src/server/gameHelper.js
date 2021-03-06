const _ = require("lodash");

const H = {};

H.PLAYER_STATUS = {
	INIT: 0,
	READY: 1,
	INGAME: 2,
	GAMEOVER: 3,
};

H.newStage = (mapIdx) => {
	return _.cloneDeep(H.MAP[mapIdx]);
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
	const spos = { ...pos };

	if (player.status !== H.PLAYER_STATUS.INGAME) {
		return newScreen;
	}

	while (!H.collide({ ...player, pos: spos })) {
		spos.y++;
	}
	spos.y--;

	piece.forEach((row, y) => {
		row.forEach((val, x) => {
			if (
				val !== 0 &&
				!_.isUndefined(newScreen[spos.y + y]) &&
				!_.isUndefined(newScreen[spos.y + y][spos.x + x]) &&
				!_.isUndefined(newScreen[pos.y + y]) &&
				!_.isUndefined(newScreen[pos.y + y][pos.x + x])
			) {
				newScreen[spos.y + y][spos.x + x] = "S" + val;
				newScreen[pos.y + y][pos.x + x] = val;
			}
		});
	});
	return newScreen;
};

H.calcDropTime = (players) => {
	let totalScore = 0;
	for (const [key, p] of players) {
		totalScore += p.score;
	}
	const nbPlayers = players.size;
	const indicator = totalScore / nbPlayers;
	if (indicator < 100) return 1000;
	if (indicator < 200) return 900;
	if (indicator < 300) return 800;
	if (indicator < 400) return 700;
	if (indicator < 500) return 600;
	if (indicator < 600) return 500;
	if (indicator < 700) return 400;
	if (indicator < 800) return 300;
	return 200;
};

H.MAP = [
	[
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	],
	[
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, "Z", 0, 0, 0, 0, "Z", 0, 0],
		[0, "Z", "Z", "Z", 0, 0, "Z", "Z", "Z", 0],
		[0, "Z", "Z", "Z", "Z", "Z", "Z", "Z", "Z", 0],
		[0, 0, "Z", "Z", "Z", "Z", "Z", "Z", 0, 0],
		[0, 0, 0, "Z", "Z", "Z", "Z", 0, 0, 0],
		[0, 0, 0, 0, "Z", "Z", 0, 0, 0, 0],
	],
	[
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		["J", 0, "J", 0, "J", 0, "J", 0, "J", 0],
		[0, "S", 0, "S", 0, "S", 0, "S", 0, "S"],
		["T", 0, "T", 0, "T", 0, "T", 0, "T", 0],
		[0, "L", 0, "L", 0, "L", 0, "L", 0, "L"],
		["Z", 0, "Z", 0, "Z", 0, "Z", 0, "Z", 0],
		[0, "I", 0, "I", 0, "I", 0, "I", 0, "I"],
	],
	[
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, "S", "S", 0, 0, 0, 0],
		[0, 0, 0, "S", "S", "S", "S", 0, 0, 0],
		[0, 0, 0, "S", "S", "S", "S", 0, 0, 0],
		[0, 0, "S", "S", "S", "S", "S", "S", 0, 0],
		[0, 0, "S", "S", "S", "S", "S", "S", 0, 0],
		[0, "S", "S", "S", "S", "S", "S", "S", "S", 0],
		[0, 0, 0, 0, "L", "L", 0, 0, 0, 0],
		[0, 0, 0, 0, "L", "L", 0, 0, 0, 0],
	],
];

module.exports = H;
