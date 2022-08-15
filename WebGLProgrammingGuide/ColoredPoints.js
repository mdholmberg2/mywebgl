// ColoredPoints.js

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
    "precision mediump float;\n" +
    "uniform vec4 u_FragColor;\n" +  // uniform variable
    
    "void main() {\n" +
    "  gl_FragColor = u_FragColor;\n" + // set the color
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

    // get storage location of attribute variable in vertex shader
    var a_Position = gl.getAttribLocation(gl.program, "a_Position");
    var a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");

    // get storage location of uniform variable in fragment shader
    var u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");

    // register function (event handler) to be called on mouse click
    canvas.onmousedown = function(ev) { 
        click(ev, gl, canvas, a_Position, u_FragColor);
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
var g_colors = [];

function click(ev, gl, canvas, a_Position, u_FragColor) {
    var x = ev.clientX;  // x,y coord of mouse
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();

    x = ((x - rect.left) - canvas.width/2) / (canvas.width/2);
    y = (canvas.height/2 - (y - rect.top)) / (canvas.height/2);

    // store coordinates to g_points array
    g_points.push([x, y]);

    // store colors to to g_colors array
    if (x >= 0.0 && y >= 0.0) {                 //first quadrant
        g_colors.push([1.0, 0.0, 0.0, 1.0])     //red
    } else if (x < 0.0 && y < 0.0) {            //third quadrant
        g_colors.push([0.0, 1.0, 0.0, 1.0])     //green
    } else  {                                   //other quadrant
        g_colors.push([1.0, 1.0, 1.0, 1.0])     //white
    }

    // clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_points.length;
    for (var i = 0; i < len; i++) {
        var xy = g_points[i];
        var rgb = g_colors[i];

        // pass the position of a point to vertex shader
        gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);

        // pass the color of point to fragment shader
        gl.uniform4f(u_FragColor, rgb[0], rgb[1], rgb[2], rgb[3], )

        // draw the point
        gl.drawArrays(gl.POINTS, 0, 1);
    }

}