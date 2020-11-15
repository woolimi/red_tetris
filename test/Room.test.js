import React from "react";
import Room from "../src/client/components/Room";
import {
	render,
	cleanup,
	waitFor,
	fireEvent,
	act,
} from "@testing-library/react";
import TetrisProvider, {
	SocketContext,
} from "../src/client/components/TetrisProvider";
import MockedSocket from "socket.io-mock";
import "@testing-library/jest-dom";
import H, { PLAYER_STATUS } from "../src/client/gameHelper";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

const customRender = (children, socket) => {
	return render(
		<SocketContext.Provider value={socket}>
			<TetrisProvider>{children}</TetrisProvider>
		</SocketContext.Provider>,
	);
};

const match = {
	params: {
		roomName: "room",
		userName: "wpark",
	},
};

const history = {
	push: jest.fn(),
};

const players = {
	myId: {
		id: "myId",
		name: "wpark",
		status: PLAYER_STATUS.INIT,
		score: 0,
		screen: H.newStage(0),
		nextPiece: "",
	},
	otherId: {
		id: "otherId",
		name: "opponent",
		status: PLAYER_STATUS.INIT,
		score: 0,
		screen: H.newStage(0),
		nextPiece: "",
	},
};

global.alert = jest.fn();

afterEach(() => {
	jest.restoreAllMocks();
	cleanup();
});

describe("<Room />", () => {
	it("render loader if socket is not connected", () => {
		const socket = new MockedSocket();
		socket.connected = false;
		socket.close = jest.fn();
		fetch.mockResponseOnce(JSON.stringify({}));
		const { getByText } = customRender(
			<Room history={history} match={match} />,
			socket,
		);
		getByText("Loading");
	});
	it("redirect to root(/) and close socket if fetch response has error message", async () => {
		const socket = new MockedSocket();
		socket.connected = false;
		socket.socketClient.close = jest.fn();
		socket.close = jest.fn();

		fetch.mockResponseOnce(JSON.stringify({ error: "ERROR !!" }));
		customRender(<Room history={history} match={match} />, socket);
		await waitFor(() => {
			expect(history.push).toHaveBeenCalledTimes(1);
			expect(history.push).toHaveBeenCalledWith("/");
			cleanup();
			expect(socket.close).toHaveBeenCalledTimes(1);
		});
	});

	it("won't trigger keyDown event if game is not started", () => {
		const socket = new MockedSocket();
		socket.connected = true;
		socket.close = jest.fn();
		socket.emit = jest.fn();
		fetch.mockResponseOnce(JSON.stringify({}));
		const { getByRole } = customRender(
			<Room history={history} match={match} />,
			socket,
		);
		const roomEl = getByRole("tetris");
		fireEvent.keyDown(roomEl, {
			key: "ArrowUp",
		});
		expect(socket.emit).not.toHaveBeenCalledWith("PLAYER:ROTATE");
	});

	it("tests overall tetris game play", () => {
		const socket = new MockedSocket();
		socket.connected = true;
		socket.close = jest.fn();
		socket.emit = jest.fn();

		fetch.mockResponseOnce(JSON.stringify({}));
		const { getByRole, getByText } = customRender(
			<Room history={history} match={match} />,
			socket,
		);
		const roomEl = getByRole("tetris");
		// OTHER PLAYER
		act(() => {
			// OTHER PLAYER ENTER
			socket.socketClient.emit("ROOM:PLAYERS", {
				winner: "",
				players: players,
			});
			socket.socketClient.emit("ROOM:OWNER", {
				owner: "myId",
			});

			// OTHER PLAYER READY
			socket.socketClient.emit("PLAYER:READY", {
				id: "otherId",
			});
			// GAME START
			socket.socketClient.emit("GAME:START", {
				players: players,
				isStarted: true,
				winner: "",
			});
		});

		// KEYDONW EVENT TEST
		fireEvent.keyDown(roomEl, {
			key: "ArrowUp",
		});
		fireEvent.keyDown(roomEl, {
			key: "ArrowLeft",
		});
		fireEvent.keyDown(roomEl, {
			key: "ArrowRight",
		});
		fireEvent.keyDown(roomEl, {
			key: "ArrowDown",
		});
		fireEvent.keyDown(roomEl, {
			key: " ",
		});
		expect(socket.emit).toHaveBeenCalledWith("PLAYER:ROTATE");
		expect(socket.emit).toHaveBeenCalledWith("PLAYER:MOVE", {
			dir: -1,
		});
		expect(socket.emit).toHaveBeenCalledWith("PLAYER:MOVE", {
			dir: 1,
		});
		expect(socket.emit).toHaveBeenCalledWith("PLAYER:DROPDOWN", {
			type: "DOWN",
		});
		expect(socket.emit).toHaveBeenCalledWith("PLAYER:DROPDOWN", {
			type: "DROP",
		});

		// PLAYER SOCKET EVENT TEST
		act(() => {
			socket.socketClient.emit("PLAYER:ROTATE", {
				id: "myId",
				screen: players["myId"].screen,
			});
			socket.socketClient.emit("PLAYER:MOVE", {
				id: "myId",
				screen: players["myId"].screen,
			});
			socket.socketClient.emit("PLAYER:DROPDOWN", {
				id: "myId",
				screen: players["myId"].screen,
				nextPiece: players["myId"].nextPiece,
				score: players["myId"].score,
			});
		});

		// GAMEOVER AND FINISH
		act(() => {
			socket.socketClient.emit("PLAYER:GAMEOVER", {
				id: "myId",
			});
			socket.socketClient.emit("GAME:FINISH", {
				winner: "myId",
				owner: "myId",
				players: players,
				isStarted: false,
			});
			socket.socketClient.emit("PLAYER:QUIT", {
				id: "otherId",
			});
		});
	});
});
