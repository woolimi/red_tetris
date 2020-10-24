import React, { useEffect, useState } from 'react';
import { Button, Form, Grid, Input } from 'semantic-ui-react'

const Home = ({ history }) => {
	const [inputs, setInputs] = useState({
		room: '',
		userName: ''
	});

	const { room, userName } = inputs;

	const onChange = (e) => {
		const { value, name } = e.target;
		setInputs({
			...inputs,
			[name]: value
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		history.push(`/${room}[${userName}]`);
	};

	return (
		<Form inverted autoComplete="off" onSubmit={onSubmit}>
			<Form.Field>
				<label>Room</label>
				<Input icon='paper plane' iconPosition='left' placeholder='Room'
					name="room" value={room} onChange={onChange} />
			</Form.Field>
			<Form.Field>
				<label>User Name</label>
				<Input icon='user' iconPosition='left' placeholder='User Name'
					name="userName" value={userName} onChange={onChange} />
			</Form.Field>
			<Grid centered columns={2}>
				<Grid.Column>
					<Button type='submit' color='red'>Game Start</Button>
				</Grid.Column>
			</Grid>
		</Form>
	);
};

export default Home;