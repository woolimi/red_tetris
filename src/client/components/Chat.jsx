import React, { useState, useCallback, useEffect } from "react";
import ChatList from "./ChatList";
import ChatForm from "./ChatForm";
import styled from "styled-components";
import { useSocketStore } from "./TetrisProvider";

const StyledChat = styled.div`
	height: 40%;
	width: 80%;
	padding: 0;
	margin: auto;
`;

const Chat = () => {
	const [list, setList] = useState([]);
	const [content, setContent] = useState("");
	const socket = useSocketStore();

	useEffect(() => {
		socket.emit("CHAT:ENTER");
	}, [socket]);

	useEffect(() => {
		socket.on("CHAT", (data) => {
			setList((prev) => {
				const next = prev.concat(data);
				if (next.length > 50) next.shift();
				return next;
			});
		});
	}, [socket]);

	const onSubmit = useCallback((e) => {
		e.preventDefault();
		setContent((content) => {
			socket.emit("CHAT", {
				content,
			});
			return "";
		});
	});

	const onChange = useCallback((e) => {
		setContent(e.target.value);
	}, []);

	return (
		<StyledChat>
			<ChatList list={list} />
			<ChatForm onSubmit={onSubmit} onChange={onChange} content={content} />
		</StyledChat>
	);
};

export default Chat;
