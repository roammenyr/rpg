"use strict";

let self;

class Game {

	constructor() {
		self = this;
 		this.lastTick = 0;
		this.model    = new Model();
		this.renderer = new Renderer(this.model);
	}

	gameLoop(e) {
		const currentTime = createjs.Ticker.getTime();
		const delta = currentTime - self.lastTick;
		self.lastTick = currentTime;

		self.sendUserCommands();
		self.model.update(self.state);
		self.renderer.render(e);
	}

	sendUserCommands() {
		let directions = Input.directions();
		console.log("send directions", JSON.stringify(directions));
		this.ws.emit("move", directions);
	}

	run() {
		Input.setUpKeyBindings();
		this.renderer.init();
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", this.gameLoop);
	}
}
