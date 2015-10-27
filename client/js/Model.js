"use strict";

class Model {

	constructor() {
		this.characters = [];
		this.map = new AreaMap();
		this.world = {
			width : 27,
			height: 12
		};
	}

	update(state) {
		console.log("update from ", JSON.stringify(state));
		this.characters = state.map(
			player => new Character(player.name, player.x, player.y, player.isMoving, player.directions[0]));
		this.player = this.characters[0];
		if (this.player.isMoving) {
			console.log("SHOULD MOVE");
		}
	}
}
