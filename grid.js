module.exports = function(c) {
	var grid = {};

	grid.element = "grid";
	//grid.width = w;
	//grid.height = h;
	grid.cols = c;

	grid.views = [];

	grid.border = true;

	grid.add = function(el) {
		grid.views.push(el);
	}

	grid.calcCellWidth = function(width) {
		return Math.ceil((width-(grid.cols+1)*3*grid.border)/grid.cols);
	}


	return grid;
}

