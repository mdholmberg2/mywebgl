// HelloPoint1.js

// vertex shader program
var VSHADER_SOURCE = 
    "void main() {\n" +
    "  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n" + // coordinates
    "  gl_PointSize = 10.0;\n" +                    // set point size
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

    // specify the color for clearing the canvas
    gl.clearColor(0.0, 1.0, 0.0, 1.0);
    
    // clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    // draw a point
    gl.drawArrays(gl.POINTS, 0, 1);

}