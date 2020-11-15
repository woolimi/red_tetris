import React from "react";
import Stage from "../src/client/components/Stage";
import { render, cleanup } from "@testing-library/react";
import H, { PLAYER_STATUS } from "../src/client/gameHelper";
import { TetrisStoreContext } from "../src/client/components/TetrisProvider";

const customRender = (children, tetris) => {
	return render(
		<TetrisStoreContext.Provider value={tetris}>
			{children}
		</TetrisStoreContext.Provider>,
	);
};

beforeEach(cleanup);

describe("<Stage />", () => {
	const setup = () => {
		return {
			player: {},
			tetris: {},
		};
	};
	it("shows READY when player in ready status", () => {
		const { player, tetris } = setup();
		player.status = PLAYER_STATUS.READY;
		tetris.isStarted = false;
		const { getByText } = customRender(
			<Stage screen={H.newStage()} pid={player.id} pstatus={player.status} />,
			tetris,
		);
		getByText("READY");
	});
	it("shows result WIN when game is finished", () => {
		const { player, tetris } = setup();
		player.status = PLAYER_STATUS.GAMEOVER;
		player.id = "me";
		tetris.winner = "me";
		tetris.isStarted = false;
		const { getByText } = customRender(
			<Stage screen={H.newStage()} pid={player.id} pstatus={player.status} />,
			tetris,
		);
		getByText("WIN");
	});

	it("shows result LOSE when game is finished", () => {
		const { player, tetris } = setup();
		player.status = PLAYER_STATUS.GAMEOVER;
		player.id = "me";
		tetris.winner = "anotherUser";
		tetris.isStarted = false;
		const { getByText } = customRender(
			<Stage screen={H.newStage()} pid={player.id} pstatus={player.status} />,
			tetris,
		);
		getByText("LOSE");
	});

	it("shows no result message if game is not finished", () => {
		const { player, tetris } = setup();
		player.status = PLAYER_STATUS.GAMEOVER;
		player.id = "me";
		tetris.winner = "anotherUser";
		tetris.isStarted = true;
		const { queryByText } = customRender(
			<Stage screen={H.newStage()} pid={player.id} pstatus={player.status} />,
			tetris,
		);
		expect(queryByText("WIN")).toBeNull();
		expect(queryByText("LOSE")).toBeNull();
	});
});
