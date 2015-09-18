const Input = (function() {
	"use strict";

	const input = {
		up   : false,
		down : false,
		left : false,
		right: false,

		setUpKeyBindings() {
			Mousetrap.bind("up"   , function() { input.up    = true; });
			Mousetrap.bind("down" , function() { input.down  = true; });
			Mousetrap.bind("left" , function() { input.left  = true; });
			Mousetrap.bind("right", function() { input.right = true; });

			Mousetrap.bind("up"   , function() { input.up    = false; }, "keyup");
			Mousetrap.bind("down" , function() { input.down  = false; }, "keyup");
			Mousetrap.bind("left" , function() { input.left  = false; }, "keyup");
			Mousetrap.bind("right", function() { input.right = false; }, "keyup");
		},

		directions() {
			const res = [];
			if (this.up)    res.push("up");
			if (this.down)  res.push("down");
			if (this.left)  res.push("left");
			if (this.right) res.push("right");
			this.up    = false;
			this.down  = false;
			this.left  = false;
			this.right = false;
			return res;
		}
	};

	return input;

})();
