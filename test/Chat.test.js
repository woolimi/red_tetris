import React from "react";
import Chat from "../src/client/components/Chat";
import { render, cleanup, act, fireEvent } from "@testing-library/react";
import { SocketContext } from "../src/client/components/TetrisProvider";
import MockedSocket from "socket.io-mock";
import "@testing-library/jest-dom";

const customRender = (children, socket) => {
	return render(
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>,
	);
};

afterEach(cleanup);

describe("<Chat />", () => {
	it("render chat component", () => {
		const socket = new MockedSocket();
		customRender(<Chat />, socket);
	});

	it("show enter message when user entered", () => {
		const socket = new MockedSocket();
		const { getByText } = customRender(<Chat />, socket);
		act(() => {
			socket.socketClient.emit("CHAT", {
				userName: "wpark",
				content: "hello!",
			});
		});
		getByText("wpark : hello!");
	});

	it("remove input when user submit message", () => {
		const socket = new MockedSocket();
		const { getByPlaceholderText } = customRender(<Chat />, socket);
		const chatInput = getByPlaceholderText("some message...");
		fireEvent.change(chatInput, {
			target: {
				value: "blabla",
			},
		});
		fireEvent.submit(chatInput);
		expect(chatInput).toHaveValue("");
	});

	it("maintain maximum 50 chats", () => {
		const socket = new MockedSocket();
		const { container } = customRender(<Chat />, socket);
		act(() => {
			for (let index = 0; index < 55; index++) {
				socket.socketClient.emit("CHAT", {
					userName: "wpark",
					content: "hello!",
				});
			}
		});
		expect(container.firstChild.firstChild.children.length).toBe(50);
	});
});
