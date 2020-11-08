import React from "react";
import { Icon } from "semantic-ui-react";

const PlayerInfo = ({ isOwner, name }) => {
	return (
		<div>
			{isOwner && <Icon color="red" name="star"></Icon>}
			{name}
		</div>
	);
};

export default React.memo(PlayerInfo);
