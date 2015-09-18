"use strict";

const utils = require("./utils");

class Player {

	constructor(socket, name) {
		this.socket = socket;
		this.name = name;
		this.x = 0;
		this.y = 0;
		this.speed = 5;
		this.destination = null;
		this.nextDirections = [];
	}

	isMoving() {
		return !!this.destination;
	}

	setDestination(directions) {
		this.destination = {
			x: this.x,
			y: this.y,
			origX: this.x,
			origY: this.y,
			progress: 0,
			directions: directions,
			movingX: directions[0] === "left" || directions[0] === "right",
			movingY: directions[0] === "up"   || directions[0] === "down" ,
			direction: utils.directionToInt(directions[0])
		};

		switch (directions[0]) {
			case "left" : --this.destination.x; break;
			case "right": ++this.destination.x; break;
			case "up"   : --this.destination.y; break;
			case "down" : ++this.destination.y; break;
		}
	}

	move(delta) {
		if (!this.isMoving()) return;
		var destination = this.destination;

		destination.progress += delta / 1000 * this.speed;
		if (destination.progress >= 1)
			destination.progress = 1;

		if (destination.movingX)
			this.x = destination.origX + destination.progress * destination.direction;
		if (destination.movingY)
			this.y = destination.origY + destination.progress * destination.direction;

		if (destination.progress === 1)
			this.destination = null;
	}
}

module.exports = Player;
