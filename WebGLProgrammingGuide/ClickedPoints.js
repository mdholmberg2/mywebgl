// ClickedPoints.js

// vertex shader program
var VSHADER_SOURCE = 
    "attribute vec4 a_Position;\n" +
    "attribute float a_PointSize;\n" +
    "void main() {\n" +
    "  gl_Position = a_Position;\n" +       // coordinates
    "  gl_PointSize = a_PointSize;\n" +     // set point size
    "}\n";

// fragment shader program
var FSHADER_SOURCE =
    "void main() {\n" +
    "  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n" + // set the color
    "}\n";


function main() {
    // retrieve <canvas> element
    var canvas = document.getElementById("webgl");

    // get the rendering context for webgl
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log("Failed to get the rendering context for WebGL");
        return;
    }

    // initialize the shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("failed to initialize shaders.");
    }

    // get storage location of attribute variable
    var a_Position = gl.getAttribLocation(gl.program, "a_Position");
    var a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");

    // register function (event handler) to be called on mouse click
    canvas.onmousedown = function(ev) { 
        click(ev, gl, canvas, a_Position);
    }

    // pass vertex data to shader
    var pointSize = 10.0;

    gl.vertexAttrib1f(a_PointSize, pointSize);

    // specify the color for clearing the canvas
    gl.clearColor(0.7, 0.7, 0.7, 1.0);  // gray
    
    // clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

}

var g_points = []  // array for mouse clicks

function click(ev, gl, canvas, a_Position) {
    var x = ev.clientX;  // x,y coord of mouse
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();

    x = ((x - rect.left) - canvas.width/2) / (canvas.width/2);
    y = (canvas.height/2 - (y - rect.top)) / (canvas.height/2);

    // store coordinates to g_points array
    g_points.push(x);
    g_points.push(y);

    // clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_points.length;
    for (var i = 0; i < len; i+=2) {
        // pass the position of a point to shader
        gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 0.0);

        // draw the point
        gl.drawArrays(gl.POINTS, 0, 1);
    }

}