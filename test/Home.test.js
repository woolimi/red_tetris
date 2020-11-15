import React from "react";
import Home from "../src/client/pages/Home";
import { enableFetchMocks } from "jest-fetch-mock";
import { render, fireEvent, waitFor } from "@testing-library/react";

// Mocking
enableFetchMocks();
const history = {
	push: jest.fn(),
};

// Init
afterEach(() => {
	jest.clearAllMocks();
});

// Test
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

	it("shows error message if userName or roomName is empty", () => {
		const { roomInput, userNameInput, gameStartBtn, getByText } = setup();

		fireEvent.submit(gameStartBtn);
		getByText("Please type room name and user name");

		fireEvent.change(roomInput, {
			target: {
				value: "room",
			},
		});
		fireEvent.submit(gameStartBtn);
		getByText("Please type room name and user name");

		fireEvent.change(roomInput, {
			target: {
				value: "",
			},
		});
		fireEvent.change(userNameInput, {
			target: {
				value: "wpark",
			},
		});
		fireEvent.submit(gameStartBtn);
		getByText("Please type room name and user name");
	});

	it("redirects user to room with right url", async () => {
		const { roomInput, userNameInput, gameStartBtn } = setup({ history });
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
		fetch.mockResponseOnce(JSON.stringify({}));
		fireEvent.submit(gameStartBtn);
		await waitFor(() => {
			expect(history.push).toHaveBeenCalledTimes(1);
			expect(history.push).toHaveBeenCalledWith("/room1[wpark]");
		});
	});

	it("doesn't redirect if api call failed", async () => {
		const { roomInput, userNameInput, gameStartBtn } = setup({ history });
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
		fetch.mockResponseOnce(JSON.stringify({ error: "some error" }));
		fireEvent.submit(gameStartBtn);
		await waitFor(() => {
			expect(history.push).toHaveBeenCalledTimes(0);
		});
	});
});
