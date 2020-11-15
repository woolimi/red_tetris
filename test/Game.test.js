import { pick } from "lodash";
import Game from "../src/server/classes/Game";
import Player from "../src/server/classes/Player";
const H = require("../src/server/gameHelper");
const { PLAYER_STATUS } = H;

describe("Game", () => {
	let g;
	let p1;
	let p2;
	let p3;

	beforeEach(() => {
		g = new Game("room");
		p1 = new Player("myId", "wpark");
		p2 = new Player("otherId", "toto");
		p3 = new Player("otherId2", "tutu");
		g.owner = p1.id;
		g.addPlayer(p1);
	});
	it("tests isAllReady()", () => {
		g.addPlayer(p2);
		g.addPlayer(p3);
		expect(g.isAllReady()).toBe(false);
		p1.status = PLAYER_STATUS.READY;
		expect(g.isAllReady()).toBe(false);
		p2.status = PLAYER_STATUS.READY;
		expect(g.isAllReady()).toBe(false);
		p3.status = PLAYER_STATUS.READY;
		expect(g.isAllReady()).toBe(true);
	});
	it("tests isFinished()", () => {
		// solo play
		p1.status = PLAYER_STATUS.INGAME;
		expect(g.isFinished()).toBe(false);
		p1.status = PLAYER_STATUS.GAMEOVER;
		expect(g.isFinished()).toBe(true);
		// multi play
		g.addPlayer(p2);
		g.addPlayer(p3);
		p2.status = PLAYER_STATUS.INGAME;
		p3.status = PLAYER_STATUS.INGAME;
		expect(g.isFinished()).toBe(false);
		p3.status = PLAYER_STATUS.GAMEOVER;
		expect(g.isFinished()).toBe(true);
		expect(g.winner).toBe(p2.id);
	});
	it("tests addPenaltyToOthers()", () => {
		g.addPlayer(p2);
		g.addPlayer(p3);
		g.addPenaltyToOthers(p1.id, 3);
		expect(p2.penalty).toBe(3);
		expect(p3.penalty).toBe(3);
	});
	it("tests findPlayerByName()", () => {
		expect(g.findPlayerByName(p1.name)).toMatchObject(p1);
		expect(g.findPlayerByName("blabla")).toBeFalsy();
	});
	it("tests findPlayerById()", () => {
		expect(g.findPlayerById(p1.id)).toMatchObject(p1);
		expect(g.findPlayerById("blabla")).toBeFalsy();
	});
	it("tests getPlayers()", () => {
		g.addPlayer(p2);
		g.addPlayer(p3);
		const players = g.getPlayers();
		expect(players).toHaveProperty(p1.id);
		expect(players).toHaveProperty(p2.id);
		expect(players).toHaveProperty(p3.id);
	});
	it("tests removePlayerById()", () => {
		g.addPlayer(p2);
		g.addPlayer(p3);
		g.removePlayerById(p2.id);
		expect(g.getPlayers()).not.toHaveProperty(p2.id);
	});
	it("tests setPlayerStatus()", () => {
		g.setPlayerStatus(p1.id, PLAYER_STATUS.INGAME);
		expect(p1.status).toBe(PLAYER_STATUS.INGAME);
	});
	it("tests init()", () => {
		g.init();
	});
});
