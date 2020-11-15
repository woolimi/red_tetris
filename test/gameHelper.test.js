import H from "../src/client/gameHelper";

describe("gameHelper", () => {
	it("creates new stage size 21 X 10 and filled with 0", () => {
		const stage = H.newStage();
		expect(stage.length).toBe(21);
		expect(stage[0].length).toBe(10);
		expect(stage[0][0]).toBe(0);
	});
});
