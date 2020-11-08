import React, { useCallback } from "react";
import { Button } from "semantic-ui-react";
import { useSocketStore } from "./TetrisProvider";

const MyButton = ({ isOwner, disabled, wrapperRef }) => {
	const socket = useSocketStore();

	// button event
	const onReady = useCallback(() => {
		socket.emit("PLAYER:READY");
	}, [socket]);

	const onStart = useCallback(() => {
		wrapperRef.current.focus();
		socket.emit("GAME:START");
	}, [socket, wrapperRef]);

	return (
		<>
			<Button
				color={isOwner ? "red" : "blue"}
				onClick={isOwner ? onStart : onReady}
				disabled={disabled}
			>
				{isOwner ? "start" : "ready"}
			</Button>
		</>
	);
};

export default React.memo(MyButton);
