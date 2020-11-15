import Piece from "../src/server/classes/Piece";

describe("Piece", () => {
	it("create 100 random piecees", () => {
		const list = Piece.createList();
		expect(list.length).toBe(100);
	});
});
