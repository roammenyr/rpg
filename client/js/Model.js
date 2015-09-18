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
		this.characters = state.players.map(
			player => new Character(player.name, player.x, player.y));
		this.player = this.characters[0];
	}
}
