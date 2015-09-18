document.addEventListener("DOMContentLoaded", function(e) {
	"use strict";

	window.ws = io();

	let game = null;

	console.log("before login");
	ws.emit("login", `roammenyr${Math.random()}`, () => {
		console.log("call login");
 		game = new Game();
		game.run();
		console.log("call end");
	});
	console.log("end");

	ws.on("update", state => game.update(state));

});
