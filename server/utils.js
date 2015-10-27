"use strict";

module.exports = {
 	directionToInt: function(direction) {
		switch (direction) {
		case "up"   :
		case "left" : return -1;
		case "down" :
		case "right": return 1;
		}
	}
};
