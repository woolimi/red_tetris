export const SOCKET_ADDR = "http://localhost:5000";
export const WIDTH = 10;
export const HEIGHT = 20;
export const TETROMINOS = {
	0: {
		matrix: [0],
		color: "0, 0, 0",
	},
	I: {
		matrix: [
			[0, 0, 0, 0],
			["I", "I", "I", "I"],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		color: "80, 227, 230",
	},
	J: {
		matrix: [
			["J", 0, 0],
			["J", "J", "J"],
			[0, 0, 0],
		],
		color: "36, 95, 223",
	},
	L: {
		matrix: [
			[0, 0, "J"],
			["J", "J", "J"],
			[0, 0, 0],
		],
		color: "223, z73, 36",
	},
	O: {
		matrix: [
			[0, "O", "O", 0],
			[0, "O", "O", 0],
			[0, 0, 0, 0],
		],
		color: "223, 217, 36",
	},
	S: {
		matrix: [
			[0, "S", "S"],
			["S", "S", 0],
			[0, 0, 0],
		],
		color: "48, 211, 56",
	},
	T: {
		matrix: [
			[0, "T", 0],
			["T", "T", "T"],
			[0, 0, 0],
		],
		color: "132, 61, 198",
	},
	Z: {
		matrix: [
			["Z", "Z", 0],
			[0, "Z", "Z"],
			[0, 0, 0],
		],
		color: "227, 78, 78",
	},
};
