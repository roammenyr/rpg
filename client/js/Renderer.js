"use strict";

class Renderer {

	constructor(model){

		this.model = model;
		this.stage;
		this.background;
		this.gridOverlay;
		this.player;

		this.squareSize = 50;
	}


	buildGridOverlay() {
		var grid = new createjs.Shape();
		grid.graphics.beginStroke("white");
		for (var i = 0; i < this.model.world.width; ++i) {
			grid.graphics.moveTo(i * this.squareSize, 0).lineTo(i * this.squareSize, this.model.world.height * this.squareSize - 1);
		}
		for (var j = 0; j < this.model.world.height; ++j) {
			grid.graphics.moveTo(0, j * this.squareSize).lineTo(this.model.world.width * this.squareSize - 1, j * this.squareSize);
		}
		grid.graphics.endStroke();
		return grid;
	}

	init() {
		var canvas = document.getElementById("gameCanvas");
		canvas.width  = this.model.world.width * this.squareSize;
		canvas.height = this.model.world.height * this.squareSize;

		this.stage = new createjs.Stage("gameCanvas");

		this.background = new createjs.Shape();
		this.background.graphics.beginFill("#9cf292").drawRect(0, 0, this.squareSize * this.model.world.width, this.squareSize * this.model.world.height);

		var grid = this.buildGridOverlay();

		this.stage.addChild(this.background, grid);

		const imgPerso1 = new Image();
		imgPerso1.src = "img/characters/perso1.png";

		const spriteSheet = new createjs.SpriteSheet({
			images: [imgPerso1],
			frames: { width: 50, height: 85, regX: 0, regY: 0 },
			animations: {
				standUp   : [12, 12],
				standDown : [0, 0],
				standLeft : [4, 4],
				standRight: [8, 8],
				// up   : [13, 15, "standUp"   , 0.2 * this.model.player.speed],
				// down : [1 , 3 , "standDown" , 0.2 * this.model.player.speed],
				// right: [9 , 11, "standRight", 0.2 * this.model.player.speed],
				// left : [5 , 7 , "standLeft" , 0.2 * this.model.player.speed]
				up   : [13, 15, "standUp"   , 0.2 * 5],
				down : [1 , 3 , "standDown" , 0.2 * 5],
				right: [9 , 11, "standRight", 0.2 * 5],
				left : [5 , 7 , "standLeft" , 0.2 * 5]
			},
			framerate: 20
		});

		this.drawMap();

		this.player = new createjs.Sprite(spriteSheet);
		this.player.isMoving = false;
		this.stage.addChild(this.player);
	}

	drawMap(){
		var imgMap = new Image();
		imgMap.src = "img/tilesets/" + this.model.map.tileset;

		const mapSheet = new createjs.SpriteSheet({
			images: [imgMap],
			frames: { width: 32, height: 32, regX: 0, regY: 0 }
		});

		for (var i = 0; i < this.model.map.layer1.length; i++) {
			this.drawTile(this.model.map.layer1[i], i, mapSheet);
		};

		for (var i = 0; i < this.model.map.layer2.length; i++) {
			this.drawTile(this.model.map.layer2[i], i, mapSheet);
		};
	}

	drawTile(element, index, mapSheet){
			var tileSprite = new createjs.Sprite(mapSheet);
			tileSprite.gotoAndStop(element);

			tileSprite.scaleX = 1.57;
			tileSprite.scaleY = 1.57;
			tileSprite.x = index % this.model.world.width * this.squareSize;
			tileSprite.y = Math.floor(index / this.model.world.width) * this.squareSize;
			this.stage.addChild(tileSprite);
	}

	movePlayer() {
		if (!this.player.isMoving && this.model.player.isMoving()) {
			this.player.isMoving = true;
			this.player.origX = this.player.x;
			this.player.origY = this.player.y;
			this.player.gotoAndPlay(this.model.player.destination.directions[0]);
		} else if (this.player.isMoving && !this.model.player.isMoving()) {
			this.player.isMoving = false;
		}

		if (this.player.isMoving) {
			this.player.x = this.model.player.x * this.squareSize;
			this.player.y = this.model.player.y * this.squareSize;
		}
	}

	render(e) {
		this.movePlayer();
		this.stage.update(e);
	}

}
