"use strict";

const LIVERELOAD_PORT = 33333;
const HTTP_PORT = 3000;
const WS_PORT = 4000;


const express    = require("express");
const livereload = require("connect-livereload");
const app = express();

const server = app.listen(HTTP_PORT, function() {
	const host = server.address().address;
	const port = server.address().port;

	console.log(`Server running at http://${host}:${port}`);
});

var ws = require('socket.io')(server);
ws.on('connection', function(socket) {
	console.log("websocket connected");
});
ws.listen(WS_PORT);

app.use(livereload({ port: LIVERELOAD_PORT }));
app.use(express.static("client"));
