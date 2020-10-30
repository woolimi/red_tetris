import React from "react";
import Home from "../src/client/pages/Home";
import { render, fireEvent } from "@testing-library/react";

const history = {
	push: jest.fn(),
};

describe("<Home/>", () => {
	const setup = (props = {}) => {
		const utils = render(<Home {...props} />);
		const { getByPlaceholderText, getByText } = utils;
		const roomInput = getByPlaceholderText("Room");
		const userNameInput = getByPlaceholderText("User Name");
		const gameStartBtn = getByText("Game Start");
		return {
			...utils,
			roomInput,
			userNameInput,
			gameStartBtn,
		};
	};

	it("changes input value", () => {
		const { roomInput, userNameInput } = setup();
		fireEvent.change(roomInput, {
			target: {
				value: "room1",
			},
		});
		fireEvent.change(userNameInput, {
			target: {
				value: "wpark",
			},
		});
		expect(roomInput).toHaveProperty("value", "room1");
		expect(userNameInput).toHaveProperty("value", "wpark");
	});

	it("redirects user to room with right url", () => {
		const { roomInput, userNameInput, gameStartBtn } = setup({ history });
		fireEvent.submit(gameStartBtn);
		expect(history.push).toHaveBeenCalledTimes(0);
		fireEvent.change(roomInput, {
			target: {
				value: "room1",
			},
		});
		fireEvent.change(userNameInput, {
			target: {
				value: "wpark",
			},
		});
		fireEvent.submit(gameStartBtn);
		expect(history.push).toHaveBeenCalledTimes(1);
		expect(history.push).toHaveBeenCalledWith("/room1[wpark]");
	});
});
