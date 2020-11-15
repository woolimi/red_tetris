import React, { useCallback, useMemo } from "react";
import StyledDisplay from "./style/StyledDisplay";
import { Button, Container } from "semantic-ui-react";
import { useTetrisStore, useSocketStore } from "./TetrisProvider";

const MapSelector = ({ isOwner }) => {
	const socket = useSocketStore();
	const { mapIdx, isStarted } = useTetrisStore();
	let mapName = useMemo(() => {
		if (mapIdx === 0) return "basic";
		if (mapIdx === 1) return "heart";
		if (mapIdx === 2) return "zigzag";
		if (mapIdx === 3) return "tree";
	}, [mapIdx]);

	const changeMap = useCallback((e) => {
		const dir = e.currentTarget.dataset.direction;
		socket.emit("GAME:CHANGE_MAP", {
			dir,
		});
	}, []);

	return (
		<StyledDisplay>
			<div className="title">Map</div>
			<Button.Group>
				<Button
					floated="left"
					color="red"
					icon="left chevron"
					onClick={changeMap}
					data-direction="left"
					disabled={isStarted ? true : isOwner ? false : true}
				/>
				<Button content={mapName} color="black" disabled={true} />
				<Button
					floated="right"
					color="red"
					icon="right chevron"
					data-direction="right"
					onClick={changeMap}
					disabled={isStarted ? true : isOwner ? false : true}
				/>
			</Button.Group>
		</StyledDisplay>
	);
};

export default React.memo(MapSelector);
