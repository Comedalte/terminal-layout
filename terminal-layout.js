var colors = require('colors');
var readline = require('readline');
var keypress = require('keypress');

// listen for the "keypress" event 
process.stdin.on('keypress', function (ch, key) {


	if (key && key.ctrl && key.name == 'c') {
		console.log("\n");
		process.stdin.pause();
	}
	else if (key.name=="tab") {
		if (current!==null) {
			current.focusNext();
		}
	}



});

var current = null;


var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var service = function(w, h) {

	var layout = {};


	var width = (typeof w === "number" ? w : 100);
	var color = "white", backcolor = "blue";

	layout.setColors = function(c1, c2) {
		color = c1;
		backcolor = c2;
	}

	layout.setWidth = function(w) {
		width = w;
	}


	layout.grid = function(cols) {
		return require("./grid")(cols);
	}

	layout.text = function(text) {
		return require("./text")(text, color, backcolor);
	}

	layout.menu = function(text) {
		var m = require("./menu")();
		m.color = color;
		m.backcolor = backcolor;
		m.print = layout.paint;
		return m;
	}

	var mainView = null;

	layout.print = function(el) {
		current = layout;
		mainView = el;
		unfocusAll(mainView);
		focusFirst(mainView);
		layout.paint();
	}

	// Printing grid, menu, table or text
	layout.paint = function() {
		var output = getOutput(mainView, width);

		process.stdout.write('\033c');
		readline.moveCursor(rl,0,0);

		console.log(output.join("\n"));

	}

	function getOutput(el, w) {
		if (typeof el == "string") 
			return layout.text(el).getTextArray(w);
		else if (el.element==="grid") {
			var grid_width = el.calcCellWidth(w);
			var output = [];
			var out = [];


			// Create top border
			if (el.border)
				out.push(pad(pad("  ", w-2, "-"), w, " "));

			for (var i=0; i<el.views.length; i++) 
				output.push(getOutput(el.views[i], grid_width));
			

			var row = 0;
			
			
			for (var r=0; r<output.length; r+=el.cols) {
				var part = output.slice(r,el.cols+r);	

				var max_rows=0; 
				for (var i=0; i<part.length; i++) 
					max_rows = (max_rows<part[i].length ? part[i].length : max_rows);

				var str = "";
				for (var k=0; k<max_rows; k++) {
					str = "";
					if (el.border)
						str = " | ";
					for (var i=0; i<el.cols; i++) {
						if (part.length>i) {
							if (part[i].length>=k+1) 
								str += part[i][k];
							else {
								str += pad(" ", grid_width, " ");
							}
						}
						else {
							str += pad(" ", grid_width, " ");
						}
						if (el.border)
							str += " | ";
					}
					out.push(str);
				}

				// Bottom grid border
				if (el.border)
					out.push(pad(pad("  ", w-2, "-"), w, " "));
	
				
			}		

			return out;
		}
		else if (el.element==="text") 
			return el.getTextArray(w);
		else if (el.element==="menu") 
			return el.getMenuArray(w);

	}

	

	function pad(string, padding, char) {
		return string + new Array(padding-string.length).join(char);
	}


	layout.kill = function() {
		rl.close();
	};

	layout.focusNext = function(){
		var res = focusNext(mainView, false);

		if (res===false)
			console.log("false returned");
		else if (res===true)
			focusFirst(mainView)

		layout.paint();
	}

	function focusFirst(view) {
		if (view.hasOwnProperty("isFocused")) {
			view.focus();
			return true;
		}
		if (view.hasOwnProperty("views")) {
			for (var i=0; i<view.views.length; i++) {
				if (focusFirst(view.views[i]))
					return true;
			}
		}
		return false;
	}

	// Hitta första
	// Fortsätt loopa tills någon är fokuserad

	function focusNext(view, focused) {
		if (view.isFocused===true) 
			return true;
		else if (focused && view.hasOwnProperty("isFocused")) {
			unfocusAll(mainView);
			view.focus();
			return 1;
		}
		else if (typeof view.views !== "undefined") {
			for (var i=0; i<view.views.length; i++) {
				var res = focusNext(view.views[i], focused);
				if (res===1)
					return 1;
				
				focused = res;
			}
		}

		return focused;
	}

	layout.focus = function(view) {
		unfocusAll(view);
		view.focus();
	}

	function unfocusAll(view) {	
		if (typeof view.unfocus == "function")
			view.unfocus();
		if (typeof view.views !== "undefined") {
			for (var i=0; i<view.views.length; i++) 			
				unfocusAll(view.views[i]);
		}
	}

	return layout;
}





module.exports = exports = service;