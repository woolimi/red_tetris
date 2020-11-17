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

const bs = new Audio(BgmSound);
const gos = new Audio(GameoverSound);
const fs = new Audio(FallSound);
const ps = new Audio(PenaltySound);
let bsPromise;
let gosPromise;
let fsPromise;
let psPromise;

bs.loop = true;

H.bgmSound = {
	play: async () => {
		if (bsPromise) bs.pause();
		bs.currentTime = 0;
		bsPromise = await bs.play();
	},
	stop: () => {
		bs.pause();
	},
};

H.gameoverSound = {
	play: async () => {
		if (gosPromise) gos.pause();
		gos.currentTime = 0;
		gosPromise = await gos.play();
	},
	stop: () => {
		gos.pause();
	},
};

H.fallSound = {
	play: async () => {
		if (fsPromise) fs.pause();
		fs.currentTime = 0;
		fsPromise = await fs.play();
	},
	stop: () => {
		fs.pause();
	},
};

H.penaltySound = {
	play: async () => {
		if (psPromise) ps.pause();
		ps.currentTime = 0;
		psPromise = await ps.play();
	},
	stop: () => {
		ps.pause();
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
