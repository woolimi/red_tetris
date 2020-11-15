import React from "react";
import Score from "../src/client/components/Score";
import { render } from "@testing-library/react";

describe("<Score />", () => {
	it("shows proper score", () => {
		let score = 100;
		const { getByText } = render(<Score score={score} />);
		getByText(`${score}`);
	});
});
