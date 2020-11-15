import React from "react";
import PlayerInfo from "../src/client/components/PlayerInfo";
import { render } from "@testing-library/react";

describe("<PlayerInfo />", () => {
	it("renders PlayerInfo", () => {
		render(<PlayerInfo isOwner={false} name="wpark" />);
	});
	it("renders icon if user is owner", () => {
		const { getByTestId } = render(<PlayerInfo isOwner={true} name="wpark" />);
		getByTestId("icon");
	});
	it("doesn't render icon if user is not owner", () => {
		const { queryByTestId } = render(
			<PlayerInfo isOwner={false} name="wpark" />,
		);
		expect(queryByTestId("icon")).toBeNull();
	});
});
