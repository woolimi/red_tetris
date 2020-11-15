import { TETROMINOS } from "../src/server/classes/Piece";
import Player from "../src/server/classes/Player";
import Piece from "../src/server/classes/Piece";
import Game from "../src/server/classes/Game";
const H = require("../src/server/gameHelper");
const { PLAYER_STATUS } = H;

import _ from "lodash";

describe("Player", () => {
	let p;

	beforeEach(() => {
		p = new Player("myId", "wpark");
		p.pieceIdx = 0;
		p.nextPiece = Game.pieceList[p.pieceIdx];
		p.piece = _.cloneDeep(Piece.TETROMINOS["I"]);
	});
	it("create new stage and screen after init()", () => {
		const { stage, screen } = p;
		p.init(0, "T");
		expect(stage).not.toBe(p.stage);
		expect(screen).not.toBe(p.screen);
	});
	it("set position of player with setPos()", () => {
		p.setPos(1, 1);
		expect(p.pos.x).toBe(1);
		expect(p.pos.y).toBe(1);
	});
	it("tests move()", () => {
		expect(p.move(1)).toBe(true);
		p.setPos(0, 0);
		expect(p.move(-1)).toBe(false);
	});
	it("tests down()", () => {
		p.setPos(0, 0);
		p.down();
		// move to down
		expect(p.pos.y).toBe(1);
		p.setPos(0, 20);
		p.down();
		// collided, so reset position
		expect(p.pos.y).toBe(0);
	});
	it("tests drop()", () => {
		p.setPos(0, 0);
		p.drop();
		// collided, so reset position
		expect(p.pos.y).toBe(0);
	});
	it("tests _cleanUp()", () => {
		expect(p.status).not.toBe(PLAYER_STATUS.GAMEOVER);
		p._cleanUp();
		p.stage[0] = new Array(10).fill("B");
		p._cleanUp();
		expect(p.status).toBe(PLAYER_STATUS.GAMEOVER);
	});
	it("tests rotate()", () => {
		p.rotate(1); // "I" shape
		expect(p.pos.x).toBe(0);
		p.setPos(7, 0); // attatch to wall
		p.rotate(1);
		expect(p.pos.x).toBe(6);
		p.rotate(1); // "I" shape
		p.setPos(-1, 17);
		const newline = new Array(10).fill("I");
		newline[0] = 0;
		p.stage[17] = newline;
		p.stage[18] = newline;
		p.stage[19] = newline;
		p.stage[20] = newline;
		p.rotate(1);
		expect(p.pos.x).toBe(-1);
	});
	it("tests mergePenalty()", () => {
		p.penalty = 1;
		p.mergePenalty();
		expect(p.stage[20]).toEqual(new Array(10).fill("B"));
	});
	it("tests sweep()", () => {
		p.stage[17] = new Array(10).fill("I");
		p.stage[18] = new Array(10).fill("I");
		p.stage[19] = new Array(10).fill("I");
		p.stage[20] = new Array(10).fill("I");
		expect(p.sweep()).toBe(4);
	});
	it("tests reset()", () => {
		p.nextPiece = "I";
		p.reset();
		expect(p.pos.x).toBe(3);
		p.nextPiece = "J";
		p.reset();
		expect(p.pos.x).toBe(3);
		p.nextPiece = "L";
		p.reset();
		expect(p.pos.x).toBe(3);
		p.nextPiece = "O";
		p.reset();
		expect(p.pos.x).toBe(4);
		p.nextPiece = "S";
		p.reset();
		expect(p.pos.x).toBe(3);
		p.nextPiece = "T";
		p.reset();
		expect(p.pos.x).toBe(3);
		p.nextPiece = "Z";
		p.reset();
		expect(p.pos.x).toBe(3);
	});
});
