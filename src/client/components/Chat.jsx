import React from "react";
import styled from "styled-components";
import { TETROMINOS } from "../gameHelper";

const ChatBox = styled.div`
	height: 100%;
	width: 80%;
	box-sizing: border-box;
	border: 3px solid #333;
	padding: 20px;
	margin: auto;
	background-color: #0e0e0e;
	border-radius: 20px;
`;

const Chat = () => {
	return (
		<ChatBox>
			{/* <ChatList /> */}
			{/* <ChatForm /> */}
		</ChatBox>
	);
};

export default Chat;
