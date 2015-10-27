document.addEventListener("DOMContentLoaded", function(e) {
	"use strict";

	window.ws = io();

	let game = null;

	ws.emit("login", `roammenyr${Math.random()}`, () => {
 		game = new Game();
		game.ws = ws;
		game.run();
	});

	ws.on("update", state => { if (game) game.state = state });

});
