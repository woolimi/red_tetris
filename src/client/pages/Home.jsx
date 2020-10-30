import React, { useState } from "react";
import { Message, Button, Form, Grid, Input } from "semantic-ui-react";

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
		if (!roomName || !userName) return;
		try {
			const res = await fetch(`http://localhost:5000/api/room`, {
				method: "POST",
				body: JSON.stringify({ roomName, userName }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const { error } = await res.json();
			if (error) {
				throw error;
			}
			history.push(`/${roomName}[${userName}]`);
		} catch (e) {
			setError(e);
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
