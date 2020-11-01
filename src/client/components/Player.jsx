import React, { useCallback } from "react";
import Stage from "./Stage";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import H from "../gameHelper";

const CenterDiv = styled.div`
	text-align: center;
	margin: 1em;
	position: relative;
`;

const Ready = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	font-size: 20px;
	transform: translateX(-50%) translateY(-50%);
`;

const Player = ({ player, scale = 0.4, owner }) => {
	return (
		<CenterDiv>
			{owner === player.id && <Icon color="red" name="star"></Icon>}
			<span>{player ? player.name : ""}</span>
			<Stage screen={player ? player.screen : H.newStage()} scale={scale} />
			{!owner
				? null
				: owner !== player.id && (
						<Ready>{player.isReady ? "ready" : "notReady"}</Ready>
				  )}
		</CenterDiv>
	);
};

export default Player;
