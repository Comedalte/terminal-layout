var colors = require('colors');
var keypress = require('keypress');


var currentMenu = null;

 
keypress(process.stdin);

var menu = function() {

	var obj = {};

	var self = this;

	obj.element = "menu";
	obj.items = [];
	obj.title = "MENU";
	obj.color = "white";
	obj.backcolor = "blue";

	obj.add = function(title, callback) {
		this.items.push({title: title, callback: callback});
	}
	
	obj.print = function(){};

	obj.selected = 0;
	


	obj.getMenuArray = function(width) {
		var array = [];
		array.push(pad("", width)[obj.color][bgColor(obj.backcolor)]);
		var title = pad("     "+obj.title, width);
		array.push(pad(title, width)[obj.color][bgColor(obj.backcolor)]);
		var dash = " "+new Array(width-2).join("-")+" ";
		array.push(dash[obj.color][bgColor(obj.backcolor)]);

		for (var i=0; i<obj.items.length; i++) {
			var str = pad(" "+(i+1)+". "+obj.items[i].title, width);
			if (obj.selected == i) {
				if (obj.isFocused)
					array.push(str[obj.backcolor][bgColor(obj.color)]);
				else
					array.push(str[obj.backcolor].bgMagenta);
			}
			else
				array.push(str[obj.color][bgColor(obj.backcolor)]);
		}

		array.push(pad("", width)[obj.color][bgColor(obj.backcolor)]);
		return array;
	}


	function bgColor(color) {
		return "bg"+color.substring(0,1).toUpperCase()+color.substring(1);
	}


	function pad(string, padding) {
		if (typeof padding !== "number")
			padding = 49;
		return string + new Array(padding-string.length).join(" ");
	}

	obj.isFocused = false;

	obj.focus = function() {
		currentMenu = obj;
		obj.isFocused = true;
	}

	obj.unfocus = function() {
		currentMenu = null;
		obj.isFocused = false;
	}

	obj.focus();
	
	return obj;
}

// listen for the "keypress" event 
process.stdin.on('keypress', function (ch, key) {


	if (key && key.ctrl && key.name == 'c') {
		console.log("\n");
		process.stdin.pause();
	}

	if (currentMenu==null)
		return;

	if (key.name=="down") {

		if (currentMenu.selected+1<currentMenu.items.length) {
			currentMenu.selected++;

			currentMenu.print();
		}
		
	}

	if (key.name=="up") {
		if (currentMenu.selected>0) 
			currentMenu.selected--;

		currentMenu.print();
	}

	if (key.name=="return") {	
		currentMenu.items[currentMenu.selected].callback();
	}

});

process.stdin.setRawMode(true);
process.stdin.resume();

module.exports = exports = menu;