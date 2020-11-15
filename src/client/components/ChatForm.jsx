import React from "react";
import styled from "styled-components";
import { Input } from "semantic-ui-react";
const ChatFormWrapper = styled.div`
	height: 15%;
	width: 100%;
	margin-bottom: 10px;
`;

const ChatForm = ({ onSubmit, onChange, content }) => {
	return (
		<ChatFormWrapper>
			<form onSubmit={onSubmit}>
				<Input
					fluid
					action={{
						color: "red",
						icon: "send",
					}}
					value={content}
					onChange={onChange}
					placeholder="some message..."
				/>
			</form>
		</ChatFormWrapper>
	);
};

export default React.memo(ChatForm);
