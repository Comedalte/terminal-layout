# terminal-layout

Under construction do not use for production.

This is an experiment with terminal layout

### Features

- Grid with optional border where menus and text can fit
- Multiple menus changing focus on tab
- Text views

Menu and text can easaly be colored (text and background).

### Docs

#### Layout

var layout = require("terminal-layout")()

- setColors(color, backcolor)
- setWidth(width) //
- grid(cols) // creates new grid view
- text(string) // creates new text view
- menu(title) // creates new menu view
- print(view) // prints view (resets focus to first focusable view)
- paint() // prints view
- kill() // destroys layout (do this to quit application)
- focusNext() // focus on next focusable view
- focus(view) // focus a view

#### Grid

var grid = layout.grid(3);

- add(view) // adds view to grid at first possible slot
 - cols // number of columns
 - border // have border around cells or not, Default: true

 #### Text

var text = layout.text("My text string");

  - text // Text to print
  - color // color of text
  - backcolor // background color
  - center // center align text, Default false

#### Menu

var menu = layout.menu("MY MENU TITLE");

- add(label, callback) // Add a menu option
 - title // title of menu
 - color // text color for menu
 - backcolor // background color

### Example

Example with 3 menus and som text
```js
var layout = require("terminal-layout")();
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
```

### License

MIT