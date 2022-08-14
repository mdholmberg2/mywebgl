// HelloPoint2.js

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

    // pass vertex data to shader
    var postion = new Float32Array([-0.5, 0.0, 0.0]);
    var pointSize = 10.0;
    
    gl.vertexAttrib3fv(a_Position, postion);
    gl.vertexAttrib1f(a_PointSize, pointSize);

    // specify the color for clearing the canvas
    gl.clearColor(0.7, 0.7, 0.7, 1.0);
    
    // clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    // draw a point
    gl.drawArrays(gl.POINTS, 0, 1);

}