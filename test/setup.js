global.Audio = class {
	constructor(name) {
		this.name = name;
		this.pause = jest.fn();
		this.play = jest.fn();
	}
};
