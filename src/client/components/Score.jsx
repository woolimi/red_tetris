import React from "react";
import StyledDisplay from "./style/StyledDisplay";

const Score = ({ score }) => {
	return (
		<StyledDisplay>
			<div className="title">score</div>
			<div>{score}</div>
		</StyledDisplay>
	);
};

export default React.memo(Score);
