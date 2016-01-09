var layout = require("./terminal-layout")();
layout.setColors("white", "red");

layout.setWidth(100);
var grid = layout.grid(1);
grid.border = false;

grid.add(" ");
var header = layout.text("SUPERAPP");
header.center = true;
grid.add(header);
grid.add(" ");

var menu_grid = layout.grid(2);
grid.add(menu_grid);

var menu = layout.menu();
menu.add("Test", function() {
	console.log("Test");
	menu.unfocus();
});
menu.add("Quit", function() {
	layout.kill();
});
menu.backcolor = "green";
menu_grid.add(menu);

var submenu = layout.menu();
submenu.title = "Subber";
submenu.add("Submenu", function() {
	console.log("Test");
});
submenu.add("Wadda", function() {
	// Repaint layout
	layout.paint();

	console.log("Wadda");
});
submenu.add("No kill", function() {

});
menu_grid.add(submenu);

var thirdGrid = layout.grid(2);

var mainmenu = layout.menu();
mainmenu.title = "ANIMALS";
mainmenu.add("Cat", function() {
	console.log("Cat");
});
mainmenu.add("Dog", function() {
	console.log("Dog");
	layout.paint();
});
mainmenu.add("Frog", function() {
	console.log("Frog");
});
thirdGrid.add(mainmenu);

var table = layout.grid(1);
table.add("Upper direct");
table.add(layout.text("Bottom"));
table.border = true;
thirdGrid.add(table);

grid.add(thirdGrid);

layout.print(grid);