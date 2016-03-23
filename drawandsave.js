// JavaScript Document

var drawCanvas = document.getElementById("drawCanvas");
var context = drawCanvas.getContext("2d");

$('#drawCanvas').css('cursor','pointer')

$(document).ready(function () {
	initialize();
});

// works out the X, Y position of the click inside the canvas from the X, Y position on the page
function getPosition(mouseEvent, drawCanvas) {
	var x, y;
	if (mouseEvent.pageX != undefined && mouseEvent.pageY != undefined) {
		x = mouseEvent.pageX;
		y = mouseEvent.pageY;
	} else {
		x = mouseEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = mouseEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}

	return { X: x - drawCanvas.offsetLeft, Y: y - drawCanvas.offsetTop };
}

var clearCanvas = function() {
	context.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
}

function initialize() {
	// get references to the canvas element as well as the 2D drawing context
	context.strokeStyle = 'blue';

	// start drawing when the mousedown event fires, and attach handlers to
	// draw a line to wherever the mouse moves to
	$("#drawCanvas").mousedown(function (mouseEvent) {
		var position = getPosition(mouseEvent, drawCanvas);
		context.moveTo(position.X, position.Y);
		context.beginPath();

		// attach event handlers
		$(this).mousemove(function (mouseEvent) {
			drawLine(mouseEvent, drawCanvas, context);
		}).mouseup(function (mouseEvent) {
			finishDrawing(mouseEvent, drawCanvas, context);
		}).mouseout(function (mouseEvent) {
			finishDrawing(mouseEvent, drawCanvas, context);
		});
	});

}

// draws a line to the x and y coordinates of the mouse event inside
// the specified element using the specified context
function drawLine(mouseEvent, drawCanvas, context) {
	var position = getPosition(mouseEvent, drawCanvas);
	context.lineTo(position.X, position.Y);
	context.stroke();
}

// draws a line from the last coordiantes in the path to the finishing
// coordinates and unbind any event handlers which need to be preceded
// by the mouse down event
function finishDrawing(mouseEvent, drawCanvas, context) {
	// draw the line to the finishing coordinates
	drawLine(mouseEvent, drawCanvas, context);
	context.closePath();

	// unbind any events which could draw
	$(drawCanvas).unbind("mousemove")
				.unbind("mouseup")
				.unbind("mouseout");
}

// When the user clicks "Save Image" this function is called and it 
// passes the params variable to a drawandsave1.php to be saved as a PNG.
function saveImage() {
	var b_canvas = document.getElementById("drawCanvas");
	var b_context = b_canvas.getContext("2d");
	var img = b_canvas.toDataURL("image/png"); 
	var httpc = new XMLHttpRequest(); // simplified for clarity
	var url = "drawandsave1.php";
	httpc.open("POST", url, true); // sending as POST
	var params = 'img=' + img;
	
	httpc.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	//httpc.setRequestHeader("Content-Length", params.length); 
	
	httpc.onreadystatechange = function() { //Call a function when the state changes.
		if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
			//document.write(httpc.responseText);
			console.log("File saved!");
		}
	}
	httpc.send(params);
}
