import React from "react";
import MapSelector from "../src/client/components/MapSelector";
import { render, fireEvent, act, getByText } from "@testing-library/react";
import {
	TetrisStoreContext,
	SocketContext,
} from "../src/client/components/TetrisProvider";
import H, { PLAYER_STATUS } from "../src/client/gameHelper";
import MockedSocket from "socket.io-mock";
import "@testing-library/jest-dom";

const customRender = (children, socket) => {
	return render(
		<SocketContext.Provider value={socket}>
			<TetrisStoreContext.Provider value={tetris}>
				{children}
			</TetrisStoreContext.Provider>
		</SocketContext.Provider>,
	);
};

const tetris = {
	players: {
		myid: {
			id: "myid",
			name: "wpark",
			status: PLAYER_STATUS.INIT,
			score: 0,
			nextPiece: "",
		},
		otherid: {
			id: "otherid",
			name: "toto",
			status: PLAYER_STATUS.INIT,
			score: 0,
			nextPiece: "",
		},
	},
	owner: "",
	dropTime: null,
	isStarted: false,
	mapIdx: 0,
};

describe("<MapSelector />", () => {
	it("test socket event", () => {
		const socket = new MockedSocket();
		socket.emit = jest.fn();
		const { getByText, getAllByRole } = customRender(
			<MapSelector isOwner={true} />,
			socket,
			tetris,
		);
		getByText("basic");
		const btns = getAllByRole("button");
		const left = btns[0];
		const right = btns[2];
		fireEvent.click(left);
		expect(socket.emit).toHaveBeenCalledWith("GAME:CHANGE_MAP", {
			dir: "left",
		});
		fireEvent.click(right);
		expect(socket.emit).toHaveBeenCalledWith("GAME:CHANGE_MAP", {
			dir: "right",
		});
	});

	it("test mapIdx = 0", () => {
		const socket = new MockedSocket();
		tetris.mapIdx = 0;
		const { getByText } = customRender(<MapSelector isOwner={true} />, socket);
		getByText("basic");
	});

	it("test mapIdx = 1", () => {
		const socket = new MockedSocket();
		tetris.mapIdx = 1;
		const { getByText } = customRender(<MapSelector isOwner={true} />, socket);
		getByText("heart");
	});
	it("test mapIdx = 2", () => {
		const socket = new MockedSocket();
		tetris.mapIdx = 2;
		const { getByText } = customRender(<MapSelector isOwner={true} />, socket);
		getByText("zigzag");
	});
	it("test mapIdx = 3", () => {
		const socket = new MockedSocket();
		tetris.mapIdx = 3;
		const { getByText } = customRender(<MapSelector isOwner={true} />, socket);
		getByText("tree");
	});
	it("test disabled", () => {
		const socket = new MockedSocket();
		tetris.isStarted = true;
		const { getAllByRole } = customRender(
			<MapSelector isOwner={true} />,
			socket,
		);
		const btns = getAllByRole("button");
		const left = btns[0];
		const right = btns[2];
		expect(left).toBeDisabled();
		expect(right).toBeDisabled();
	});
	it("test disabled2", () => {
		const socket = new MockedSocket();
		tetris.isStarted = false;
		const { getAllByRole } = customRender(
			<MapSelector isOwner={false} />,
			socket,
		);
		const btns = getAllByRole("button");
		const left = btns[0];
		const right = btns[2];
		expect(left).toBeDisabled();
		expect(right).toBeDisabled();
	});
});
