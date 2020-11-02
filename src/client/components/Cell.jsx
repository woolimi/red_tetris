import React from "react";
import styled from "styled-components";
import { TETROMINOS } from "../gameHelper";

const StyledCell = styled.div`
	width: auto;
	background: rgba(${(props) => props.color}, 0.8);
	border: 4px solid;
	border-bottom-color: rgba(${(props) => props.color}, 0.1);
	border-right-color: rgba(${(props) => props.color}, 1);
	border-top-color: rgba(${(props) => props.color}, 1);
	border-left-color: rgba(${(props) => props.color}, 0.3);
`;

const Shadow = styled.div`
	width: auto;
	background: rgba(${(props) => props.color}, 0.2);
`;

const Cell = ({ type }) => {
	return type.length === 1 || type === 0 ? (
		<StyledCell color={TETROMINOS[type].color} />
	) : (
		<Shadow color={TETROMINOS[type].color} />
	);
};

export default React.memo(Cell);
