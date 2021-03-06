import React, { useState } from "react";
import { Message, Button, Form, Grid, Input } from "semantic-ui-react";
import { API } from "../gameHelper";

const Home = ({ history }) => {
	const [inputs, setInputs] = useState({
		roomName: "",
		userName: "",
	});
	const { roomName, userName } = inputs;
	const [error, setError] = useState("");

	const onChange = (e) => {
		const { value, name } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			if (!roomName || !userName)
				throw Error("Please type room name and user name");
			const res = await fetch(`${API}/api/room`, {
				method: "POST",
				body: JSON.stringify({ roomName, userName }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const { error } = await res.json();
			if (error) {
				throw new Error(error);
			}
			history.push(`/${roomName}[${userName}]`);
		} catch (e) {
			setError(e.message);
		}
	};

	return (
		<Form error={!!error} inverted autoComplete="off" onSubmit={onSubmit}>
			<Form.Field>
				<label>Room</label>
				<Input
					icon="paper plane"
					iconPosition="left"
					placeholder="Room"
					name="roomName"
					value={roomName}
					onChange={onChange}
				/>
			</Form.Field>
			<Form.Field>
				<label>User Name</label>
				<Input
					icon="user"
					iconPosition="left"
					placeholder="User Name"
					name="userName"
					value={userName}
					onChange={onChange}
				/>
			</Form.Field>
			<Grid centered columns={2}>
				<Grid.Column>
					<Button type="submit" color="red">
						Game Start
					</Button>
				</Grid.Column>
			</Grid>
			<Message error content={error} />
		</Form>
	);
};

export default Home;
