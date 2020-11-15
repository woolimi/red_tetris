import React from "react";
import Cell from "../src/client/components/Cell";
import { render, cleanup } from "@testing-library/react";
import { TETROMINOS, PLAYER_STATUS } from "../src/client/gameHelper";
import "@testing-library/jest-dom";
import "jest-styled-components";

afterEach(() => {
	cleanup();
});

describe("<Cell/>", () => {
	it("shows black color with type = 0", () => {
		const { container } = render(<Cell type={0} />);
		expect(container.firstChild).toHaveStyleRule(
			"background",
			`rgba(${TETROMINOS[0].color},0.8)`,
		);
	});

	it("shows grey color block with type != 0 when player is not in game", () => {
		const { container } = render(
			<Cell type="T" status={PLAYER_STATUS.READY} />,
		);
		expect(container.firstChild).toHaveStyleRule(
			"background",
			`rgba(${TETROMINOS["B"].color},0.8)`,
		);
	});

	it("shows colored block  when player in game", () => {
		const { container } = render(
			<Cell type="T" status={PLAYER_STATUS.INGAME} />,
		);
		expect(container.firstChild).toHaveStyleRule(
			"background",
			`rgba(${TETROMINOS["T"].color},0.8)`,
		);
	});

	it("shows shadow block when type is S*", () => {
		const { container } = render(
			<Cell type="ST" status={PLAYER_STATUS.INGAME} />,
		);
		expect(container.firstChild).toHaveStyleRule("opacity", "0.2");
	});
});
