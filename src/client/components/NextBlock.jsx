import React from "react";
import Cell from "./Cell";
import styled from "styled-components";

// display: grid;
// grid-template-columns: repeat(3, 1fr);
// grid-gap: 1px;

const StyledNextBlock = styled.div`
	border: 2px solid #333;
	width: 100px;
	height: 100px;
	margin: 1em;
`;

const NextBlock = ({ type = "L" }) => {
	// const { shape, color } = TETROMINOS[type];
	// console.log(shape, color);
	return (
		<StyledNextBlock>
			{/* {shape.map((row) =>
				row.map((cell, x) => <Cell key={x} type={cell[0]} />),
			)} */}
		</StyledNextBlock>
	);
};

export default NextBlock;
