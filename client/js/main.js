document.addEventListener("DOMContentLoaded", function(e) {
	"use strict";

	window.ws = io();

	Game.run();

});
