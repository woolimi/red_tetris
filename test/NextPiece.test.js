import React from "react";
import NextPiece from "../src/client/components/NextPiece";
import { render } from "@testing-library/react";

describe("<NextPiece />", () => {
	it("shows next piece I", () => {
		let type = "I";
		const { container } = render(<NextPiece type={type} />);
		expect(container).toMatchSnapshot();
	});
	it("shows next piece J", () => {
		let type = "J";
		const { container } = render(<NextPiece type={type} />);
		expect(container).toMatchSnapshot();
	});
	it("shows next piece L", () => {
		let type = "L";
		const { container } = render(<NextPiece type={type} />);
		expect(container).toMatchSnapshot();
	});
	it("shows next piece O", () => {
		let type = "O";
		const { container } = render(<NextPiece type={type} />);
		expect(container).toMatchSnapshot();
	});
	it("shows next piece S", () => {
		let type = "S";
		const { container } = render(<NextPiece type={type} />);
		expect(container).toMatchSnapshot();
	});
	it("shows next piece T", () => {
		let type = "T";
		const { container } = render(<NextPiece type={type} />);
		expect(container).toMatchSnapshot();
	});
	it("shows next piece Z", () => {
		let type = "Z";
		const { container } = render(<NextPiece type={type} />);
		expect(container).toMatchSnapshot();
	});
});
