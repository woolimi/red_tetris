import _ from "lodash";
import BgmSound from "./sound/bgm.mp3";
import FallSound from "./sound/fall.wav";
import GameoverSound from "./sound/gameover.wav";
import PenaltySound from "./sound/penalty.wav";

export const API = process.env.API;
export const WIDTH = 10;
export const HEIGHT = 20;
export const PLAYER_STATUS = {
	INIT: 0,
	READY: 1,
	INGAME: 2,
	GAMEOVER: 3,
};

const H = {};

H.bs = new Audio(BgmSound);
H.bs.loop = true;
H.bs.volume = 0.1;
H.gos = new Audio(GameoverSound);
H.gos.volume = 0.1;
H.fs = new Audio(FallSound);
H.fs.volume = 0.1;
H.ps = new Audio(PenaltySound);
H.fs.volume = 0.1;
H.bsPromise = null;
H.gosPromise = null;
H.fsPromise = null;
H.psPromise = null;

H.bgmSound = {
	play: async () => {
		if (H.bsPromise) H.bs.pause();
		H.bs.currentTime = 0;
		H.bsPromise = await H.bs.play();
	},
	stop: () => {
		H.bs.pause();
	},
};

H.gameoverSound = {
	play: async () => {
		if (H.gosPromise) H.gos.pause();
		H.gos.currentTime = 0;
		H.gosPromise = await H.gos.play();
	},
	stop: () => {
		H.gos.pause();
	},
};

H.fallSound = {
	play: async () => {
		if (H.fsPromise) H.fs.pause();
		H.fs.currentTime = 0;
		H.fsPromise = await H.fs.play();
	},
	stop: () => {
		H.fs.pause();
	},
};

H.penaltySound = {
	play: async () => {
		if (H.psPromise) H.ps.pause();
		H.ps.currentTime = 0;
		H.psPromise = await H.ps.play();
	},
	stop: () => {
		H.ps.pause();
	},
};

H.offSound = () => {
	H.bgmSound.stop();
	H.gameoverSound.stop();
	H.fallSound.stop();
	H.penaltySound.stop();
};

H.newStage = () => {
	return Array.from(Array(HEIGHT + 1), () => new Array(WIDTH).fill(0));
};

export default H;

export const TETROMINOS = {
	0: {
		color: "0,0,0",
	},
	B: {
		// penalty block
		color: "70,70,70",
	},
	I: {
		matrix: [
			[0, 0, 0, 0],
			["I", "I", "I", "I"],
			[0, 0, 0, 0],
		],
		color: "80,227,230",
	},
	J: {
		matrix: [
			[0, 0, 0],
			["J", 0, 0],
			["J", "J", "J"],
		],
		color: "36,95,223",
	},
	L: {
		matrix: [
			[0, 0, 0],
			[0, 0, "L"],
			["L", "L", "L"],
		],
		color: "223,173,36",
	},
	O: {
		matrix: [
			[0, 0, 0, 0],
			[0, "O", "O", 0],
			[0, "O", "O", 0],
		],
		color: "223,217,36",
	},
	S: {
		matrix: [
			[0, 0, 0],
			[0, "S", "S"],
			["S", "S", 0],
		],
		color: "48,211,56",
	},
	T: {
		matrix: [
			[0, 0, 0],
			[0, "T", 0],
			["T", "T", "T"],
		],
		color: "132,61,198",
	},
	Z: {
		matrix: [
			[0, 0, 0],
			["Z", "Z", 0],
			[0, "Z", "Z"],
		],
		color: "227,78,78",
	},
	SI: {
		color: "80,227,230",
	},
	SJ: {
		color: "36,95,223",
	},
	SL: {
		color: "223,173,36",
	},
	SO: {
		color: "223,217,36",
	},
	SS: {
		color: "48,211,56",
	},
	ST: {
		color: "132,61,198",
	},
	SZ: {
		color: "227,78,78",
	},
};
