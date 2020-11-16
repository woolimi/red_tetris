import H from "../src/server/gameHelper";
import Player from "../src/server/classes/Player";
import Game from "../src/server/classes/Game";

describe("gameHelper", () => {
	it("won't draw screen if player is not in game", () => {
		const p = new Player("myId", "wpark");
		const g = new Game("room");
		g.addPlayer(p);
		expect(H.drawScreen(p)).toEqual(p.stage);
	});
	it("calc droptime depends on score", () => {
		const p1 = new Player("myId", "wpark");
		const p2 = new Player("otherId", "other");
		const g = new Game("room");
		g.addPlayer(p1);
		g.addPlayer(p2);
		expect(H.calcDropTime(g.players)).toBe(1000);
		p1.score += 100;
		p2.score += 100;
		expect(H.calcDropTime(g.players)).toBe(900);
		p1.score += 100;
		p2.score += 100;
		expect(H.calcDropTime(g.players)).toBe(800);
		p1.score += 100;
		p2.score += 100;
		expect(H.calcDropTime(g.players)).toBe(700);
		p1.score += 100;
		p2.score += 100;
		expect(H.calcDropTime(g.players)).toBe(600);
		p1.score += 100;
		p2.score += 100;
		expect(H.calcDropTime(g.players)).toBe(500);
		p1.score += 100;
		p2.score += 100;
		expect(H.calcDropTime(g.players)).toBe(400);
		p1.score += 100;
		p2.score += 100;
		expect(H.calcDropTime(g.players)).toBe(300);
		p1.score += 100;
		p2.score += 100;
		expect(H.calcDropTime(g.players)).toBe(200);
	});
});

// H.calcDropTime = (players) => {
// 	let totalScore = 0;
// 	for (const [key, p] of players) {
// 		totalScore += p.score;
// 	}
// 	const nbPlayers = players.size;
// 	const indicator = totalScore / nbPlayers;
// 	if (indicator < 100) return 1000;
// 	if (indicator < 200) return 900;
// 	if (indicator < 300) return 800;
// 	if (indicator < 400) return 700;
// 	if (indicator < 500) return 600;
// 	if (indicator < 600) return 500;
// 	if (indicator < 700) return 400;
// 	if (indicator < 800) return 300;
// 	return 200;
// };
