"use strict";

let state;

class State {

	constructor() {
		this.lastTick = 0;
		this.players = new Map();
		this.world = {
			width : 27,
			height: 12
		};
		state = this;
	}

	addPlayer(player) {
		this.players.set(player.name, player);
	}

	removePlayer(name) {
		this.players.delete(name);
	}

	update() {
		const currentTime = new Date().getTime();
		const delta = currentTime - this.lastTick;
		this.lastTick = currentTime;

		this.players.forEach((player, name) => {
			console.log("player is moving = ", player.isMoving());
			console.log("player nextdirections = ", player.nextDirections);
			if (!player.isMoving() && player.nextDirections.length > 0)
				player.setDestination(player.nextDirections);
			console.log("    => player is moving = ", player.isMoving());
			player.move(delta);

			if (player.x >= this.world.width ) player.x = 0;
			if (player.y >= this.world.height) player.y = 0;
			if (player.x < 0) player.x = this.world.width  - 1;
			if (player.y < 0) player.y = this.world.height - 1;
		});
		this.ws.emit("update", this.state());
	}

	state() {
		console.log("send ", Array.from(this.players.values(), player => player.state()));
		return Array.from(this.players.values(), player => player.state());
	}

	run() {
		setInterval(() => {
			if (state) state.update()
		}, 1000/60);
	}
}

module.exports = State;
