import React, { useMemo } from "react";
import styled from "styled-components";
import { PLAYER_STATUS } from "../gameHelper";
import Cell from "./Cell";
import { useTetrisStore } from "./TetrisProvider";

const StyledStage = styled.div`
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	grid-gap: 2px;
	border: 4px solid #333;
	width: calc(20vw * ${(props) => props.scale});
	height: calc(40vw * ${(props) => props.scale});
	min-width: calc(250px * ${(props) => props.scale});
	min-height: calc(500px * ${(props) => props.scale});
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

const Stage = ({ screen, scale, pstatus, pid }) => {
	const { isStarted, winner } = useTetrisStore();
	let statusMessage = useMemo(() => {
		if (!isStarted && pstatus === PLAYER_STATUS.READY) {
			return "READY";
		} else if (!isStarted && pstatus === PLAYER_STATUS.GAMEOVER) {
			if (winner === pid) return "WIN";
			else return "LOSE";
		}
	}, [isStarted, winner, pstatus, pid]);

	return (
		<StyledStage scale={scale}>
			{screen &&
				screen.map((row, y) => {
					if (y === 0) return null;
					return row.map((cell, x) => (
						<Cell key={x} type={cell} status={pstatus} />
					));
				})}
			<StyledStatus>{statusMessage}</StyledStatus>
		</StyledStage>
	);
};

export default React.memo(Stage);
