// getElementsByClassName() Method
function Hello_World_Function() {
    var A = document.getElementsByClassName("Click"); // Assigns variable to Class Array
    A[0].innerHTML = "The text has changed!"; // gets the first index of class "Click"
}



// Draw Graphics with JavaScript
function drawGraphic() {
    var c = document.getElementById("canvasELEMENT");

    // get 2D drawing tool with this method
    var ctx = c.getContext("2d");
    const x = 250;      // Center X
    const y = 125;      // Center Y
    const r = 125;     // Radius


    // Create gradient
    var style = ctx.createRadialGradient(x, y, 5, x, y, r); // first two corrdinates are the start of the gradient, last two coordinates are end of the gradient (they are the same because its a circle)
    style.addColorStop(0, "red");
    style.addColorStop(1, "white");

    // Fill with gradient
    ctx.fillStyle = style;
    ctx.fillRect(0, 0, x * 2, y * 2); // multiple it by 2 to get gradient in center of circle


    // Draw Circle
    ctx.beginPath();
    // First variable is X coordinate, second variable is Y coordinate, third variable is size, last two variable are how much circle to draw
    var circle = ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
}