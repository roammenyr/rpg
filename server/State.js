"use strict";

const createjs = require('createjs');

class State {

	constructor() {
		this.lastTick = 0;
		this.players = new Map();
		this.world = {
			width : 27,
			height: 12
		};
	}
	
	addPlayer(player) {
		this.players.set(player.name, player);
	}

	removePlayer(name) {
		this.players.delete(name);
	}

	update() {
		const currentTime = createjs.Ticker.getTime();
		const delta = currentTime - this.lastTick;
		this.lastTick = currentTime;
		
		// for (let [name, player] of this.players) {
		this.players.forEach(function(name, player) {
			if (!player.isMoving() && player.nextDirections.length > 0)
				player.setDestination(player.nextDirections);

			player.move(delta);

			if (player.x >= this.world.width ) player.x = 0;
			if (player.y >= this.world.height) player.y = 0;
			if (player.x < 0) player.x = this.world.width  - 1;
			if (player.y < 0) player.y = this.world.height - 1;	
		});
		this.ws.emit("update", this);
	}

	run() {
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", this.update);
	}
}

module.exports = State;
