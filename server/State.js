"use strict";

require('node-easel');

let self = null;

class State {

	constructor() {
		this.lastTick = 0;
		this.players = new Map();
		this.world = {
			width : 27,
			height: 12
		};
		self = this;
	}

	addPlayer(player) {
		this.players.set(player.name, player);
	}

	removePlayer(name) {
		this.players.delete(name);
	}

	update() {
		const currentTime = createjs.Ticker.getTime();
		const delta = currentTime - self.lastTick;
		self.lastTick = currentTime;

		self.players.forEach(function(player, name) {
			console.log("player is moving = ", player.isMoving());
			console.log("player nextdirections = ", player.nextDirections);
			if (!player.isMoving() && player.nextDirections.length > 0)
				player.setDestination(player.nextDirections);
			console.log("   => player is moving = ", player.isMoving());
			player.move(delta);

			if (player.x >= self.world.width ) player.x = 0;
			if (player.y >= self.world.height) player.y = 0;
			if (player.x < 0) player.x = self.world.width  - 1;
			if (player.y < 0) player.y = self.world.height - 1;
		});
		self.ws.emit("update", self.state());
	}

	state() {
		console.log("send ", Array.from(this.players.values(), player => player.state()));
		return Array.from(this.players.values(), player => player.state());
	}

	run() {
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", this.update);
	}
}

module.exports = State;
