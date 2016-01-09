module.exports = function(t, color, backcolor) {
	var text = {};

	text.element = "text";
	text.text = t;
	text.color = color;
	text.backcolor = backcolor;
	text.center = false;

	text.getTextArray = function(w) {
		var str = splitString(text.text, w);
		for (var i=0; i<str.length; i++) 		
			str[i] = pad(str[i], w)[text.color][bgColor(text.backcolor)];
		
		return str;
	}


	function splitString(str, rowlength) {
		return str.match(new RegExp(".{1,"+(rowlength-1)+"}","g"));
	}

	function bgColor(color) {
		return "bg"+color.substring(0,1).toUpperCase()+color.substring(1);
	}

	function pad(string, padding) {
		if (!text.center)
			return string + new Array(padding-string.length).join(" ");
		else 
			return new Array(Math.floor((padding-string.length)/2.0)+1).join(" ") + string + new Array(Math.ceil((padding-string.length)/2.0)).join(" ");
	}

	return text;
}