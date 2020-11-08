import React from "react";
import styled from "styled-components";
import Cell from "./Cell";

const StyledStage = styled.div`
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	grid-gap: 2px;
	border: 4px solid #333;
	width: calc(20vw * ${(props) => props.scale});
	height: calc(40vw * ${(props) => props.scale});
	background: #111;
	margin: auto;
	position: relative;
`;

const StyledStatus = styled.div`
	position: absolute;
	top: 50%;
	right: 50%;
	font-size: 4vmin;
	transform: translateX(50%);
	font-family: Pixel;
`;

const Stage = ({ screen, scale, status = "" }) => {
	return (
		<StyledStage scale={scale}>
			{screen &&
				screen.map((row, y) => {
					if (y === 0) return null;
					return row.map((cell, x) => <Cell key={x} type={cell} />);
				})}
			<StyledStatus>{status}</StyledStatus>
		</StyledStage>
	);
};

export default Stage;
