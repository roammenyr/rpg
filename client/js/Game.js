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
		console.log("gameloop begin");
		const currentTime = createjs.Ticker.getTime();
		const delta = currentTime - self.lastTick;
		self.lastTick = currentTime;

		self.sendUserCommands();
		console.log("gameloop end");
	}

	update(state) {
		console.log("update begin");
		this.model.update(state);
		this.renderer.render();
		console.log("update end");
	}

	sendUserCommands() {
		console.log("send ", Input.directions());
		ws.emit("move", Input.directions());
	}

	run() {
		console.log("run begin");
		Input.setUpKeyBindings();
		this.renderer.init();
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", this.gameLoop);
		console.log("run end");
	}
}
