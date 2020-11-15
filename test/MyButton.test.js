import React from "react";
import MyButton from "../src/client/components/MyButton";
import { render, fireEvent } from "@testing-library/react";
import { SocketContext } from "../src/client/components/TetrisProvider";

const socket = {
	id: "myid",
	emit: jest.fn(),
};

const wrapperRef = {
	current: {
		focus: jest.fn(),
	},
};

const customRender = (children, socket) => {
	return render(
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>,
	);
};

describe("<MyButton />", () => {
	it("render ready button if I am not owner", () => {
		const { getByText } = render(
			<MyButton isOwner={false} diabled={false} wrapperRef={wrapperRef} />,
		);
		getByText("ready");
	});
	it("send socket PLAYER:READY event when click readyBtn", () => {
		const { getByText } = customRender(
			<MyButton isOwner={false} diabled={false} wrapperRef={wrapperRef} />,
			socket,
		);
		const readyBtn = getByText("ready");
		fireEvent.click(readyBtn);
		expect(socket.emit).toHaveBeenCalledWith("PLAYER:READY");
	});
	it("send socket PLAYER:READY event when click startBtn", () => {
		const { getByText } = customRender(
			<MyButton isOwner={true} diabled={false} wrapperRef={wrapperRef} />,
			socket,
		);
		const startBtn = getByText("start");
		fireEvent.click(startBtn);
		expect(socket.emit).toHaveBeenCalledWith("GAME:START");
	});
});
