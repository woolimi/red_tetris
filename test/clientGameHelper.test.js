import H from "../src/client/gameHelper";

beforeAll(() => {
	H.bs.play = jest.fn(() => Promise.resolve(null));
	H.bs.pause = jest.fn();
	H.gos.play = jest.fn(() => Promise.resolve(null));
	H.gos.pause = jest.fn();
	H.fs.play = jest.fn(() => Promise.resolve(null));
	H.fs.pause = jest.fn();
	H.ps.play = jest.fn(() => Promise.resolve(null));
	H.ps.pause = jest.fn();
});

describe("gameHelper", () => {
	it("creates new stage size 21 X 10 and filled with 0", () => {
		const stage = H.newStage(0);
		expect(stage.length).toBe(21);
		expect(stage[0].length).toBe(10);
		expect(stage[0][0]).toBe(0);
	});
	it("checks Audio.play() promise", () => {
		H.bgmSound.play();
		H.gameoverSound.play();
		H.fallSound.play();
		H.penaltySound.play();
		expect(H.bs.pause).not.toBeCalled();
		expect(H.gos.pause).not.toBeCalled();
		expect(H.fs.pause).not.toBeCalled();
		expect(H.ps.pause).not.toBeCalled();

		H.bsPromise = {};
		H.gosPromise = {};
		H.fsPromise = {};
		H.psPromise = {};
		H.bgmSound.play();
		H.gameoverSound.play();
		H.fallSound.play();
		H.penaltySound.play();
		expect(H.bs.pause).toBeCalled();
		expect(H.gos.pause).toBeCalled();
		expect(H.fs.pause).toBeCalled();
		expect(H.ps.pause).toBeCalled();
	});
});
