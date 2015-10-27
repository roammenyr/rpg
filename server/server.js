"use strict";

const LIVERELOAD_PORT = 33333;
const HTTP_PORT = 3000;
const WS_PORT = 4000;

const express    = require("express");
const livereload = require("connect-livereload");
const app = express();
const State = require("./State");
const Player = require("./Player");

const server = app.listen(HTTP_PORT, function() {
	const host = server.address().address;
	const port = server.address().port;

	console.log(`Server running at http://${host}:${port}`);
});

const state = new State();
const ws = require('socket.io')(server);
state.ws = ws;

ws.on('connection', function(socket) {
	socket.on("login", function(name, fn) {
		console.log("login as", name);
		let player = new Player(socket, name);
		state.addPlayer(player);
		socket.player = player;
		fn("logged in");
	});

	socket.on("move", function(directions) {
		console.log("received directions", JSON.stringify(directions));
		socket.player.nextDirections = directions;
	});

});

state.run();
ws.listen(WS_PORT);

app.use(livereload({ port: LIVERELOAD_PORT }));
app.use(express.static("client"));
