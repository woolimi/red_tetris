import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import stc from "string-to-color";

const StyledChatList = styled.div`
	height: 85%;
	width: 100%;
	box-sizing: border-box;
	border: 3px solid #333;
	background-color: #35353538;
	border-radius: 3px;
	overflow-y: scroll;
	overflow-x: hidden;
	padding: 0 1em 0 1em;
`;

const Message = styled.div`
	text-align: left;
`;

const Content = styled.p`
	color: ${(props) => stc(props.color)};
	margin-bottom: 3px !important;
`;

const ChatList = ({ list }) => {
	const chatRef = useRef(null);

	useEffect(() => {
		chatRef.current.scrollTop = chatRef.current.scrollHeight;
	}, [list]);

	return (
		<StyledChatList ref={chatRef}>
			{list.map((l, idx) => (
				<Message key={idx}>
					<Content color={l.userName}>
						{l.userName} : {l.content}
					</Content>
				</Message>
			))}
		</StyledChatList>
	);
};

export default React.memo(ChatList);
