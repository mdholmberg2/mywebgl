// Plot.js

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
    "  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n" + // set the color
    "}\n"


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

    // set positions of vertices
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log("failed to init buffers");
        return;
    }

    // specify the color for clearing the canvas
    gl.clearColor(0.7, 0.7, 0.7, 1.0);  // gray
    
    // clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    // draw 3 points
    gl.drawArrays(gl.LINES, 0, n)


    // points
    n = initVertexBuffers2(gl);
    if (n < 0) {
        console.log("failed to init buffers");
        return;
    }

    gl.drawArrays(gl.POINTS, 0, n)

}


function initVertexBuffers(gl) {
    var verticies = new Float32Array([      // items of x,y
        -1.0, 0.0,  1.0, 0.0,   0.0, 1.0,   0.0, -1.0
    ])

    var n = verticies.length / 2; //number of vertices


    // create buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log("failed to create buffer object");
        return -1;
    }

    // bind buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // write data into buffer object
    gl.bufferData(gl.ARRAY_BUFFER, verticies, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, "a_Position");
    var a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");

    var pointSize = 10.0;

    gl.vertexAttrib1f(a_PointSize, pointSize);

    // assign buffer object to position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    //enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    return n;
}

function initVertexBuffers2(gl) {
    var verticies = new Float32Array([      // items of x,y
        0.0, 0.0,   -0.5, 0.7,  0.5, -0.3
    ])

    var n = verticies.length / 2; //number of vertices


    // create buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log("failed to create buffer object");
        return -1;
    }

    // bind buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // write data into buffer object
    gl.bufferData(gl.ARRAY_BUFFER, verticies, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, "a_Position");
    var a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");

    var pointSize = 10.0;

    gl.vertexAttrib1f(a_PointSize, pointSize);

    // assign buffer object to position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    //enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    return n;
}
