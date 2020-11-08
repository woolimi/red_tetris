import styled from "styled-components";

const StyledDisplay = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	margin: 0 0 20px 0;
	padding: 20px;
	border: 3px solid #333;
	min-height: 30px;
	width: 100%;
	border-radius: 20px;
	font-family: Pixel, Arial, Helvetica, sans-serif;
	font-size: 1rem;
	align-items: center;

	& .title {
		margin-bottom: 5px;
	}
`;

export default StyledDisplay;
