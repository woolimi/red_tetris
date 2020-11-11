import React from "react";
import Cell from "./Cell";
import styled from "styled-components";
import { TETROMINOS } from "../gameHelper";

const NextPieceContainer = styled.div`
	box-sizing: border-box;
	margin-top: 3em;
	margin-bottom: 1em;
	padding: 20px;
	border: 3px solid #333;
	background: #000;
	font-family: Pixel, Arial, Helvetica, sans-serif;
	font-size: 1rem;
	align-items: center;
	width: 100%;
	border-radius: 20px;
`;

const StyledNextPiece = styled.div`
	display: grid;
	grid-template-columns: repeat(${(props) => props.columns}, 1fr);
	grid-gap: 1px;
	width: 5vw;
	height: 5vw;
	margin: auto;
`;

const NextPiece = ({ type }) => {
	return (
		<NextPieceContainer>
			<div>NEXT</div>
			<StyledNextPiece columns={type && TETROMINOS[type].matrix[0].length}>
				{type &&
					TETROMINOS[type].matrix.map((row) =>
						row.map((cell, x) => <Cell key={x} type={cell} />),
					)}
			</StyledNextPiece>
		</NextPieceContainer>
	);
};

export default React.memo(NextPiece);
