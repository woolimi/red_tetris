import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { TETROMINOS, PLAYER_STATUS } from "../gameHelper";

const StyledCell = styled.div`
	width: 100%;
	height: 100%;
	background: rgba(${(props) => props.color}, 0.8);
	border: 4px solid;
	border-bottom-color: rgba(${(props) => props.color}, 0.1);
	border-right-color: rgba(${(props) => props.color}, 1);
	border-top-color: rgba(${(props) => props.color}, 1);
	border-left-color: rgba(${(props) => props.color}, 0.3);
	opacity: ${(props) => (props.type === "S" ? 0.2 : 1)};
`;

const Cell = ({ type, status }) => {
	return (
		<StyledCell
			data-testid="cell"
			color={
				type === 0
					? TETROMINOS[type].color
					: !_.isUndefined(status) && status !== PLAYER_STATUS.INGAME
					? TETROMINOS["B"].color
					: TETROMINOS[type].color
			}
			type={type.length && type.length > 1 ? "S" : "N"}
		/>
	);
};

export default React.memo(Cell);
