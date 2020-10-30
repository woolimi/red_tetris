import React from "react";
import styled from "styled-components";
import Cell from "./Cell";

const StyledStage = styled.div`
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	grid-gap: 1px;
	border: 2px solid #333;
	width: calc(90vh / 2 * ${(props) => props.scale});
	height: calc(90vh * ${(props) => props.scale});
	max-height: 500px;
	background: #111;
`;

const Stage = ({ stage, scale }) => {
	return (
		<StyledStage scale={scale}>
			{stage &&
				stage.map((row) => row.map((cell, x) => <Cell key={x} type={cell} />))}
		</StyledStage>
	);
};

export default Stage;
