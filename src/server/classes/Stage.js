class Stage {
	constructor(w, h) {
		this.matrix = new Array(h).fill(new Array(w).fill(0));
	}
}

module.exports = Stage;
