// HelloCanvas.js

function main() {
    // retrieve <canvas> element
    var canvas = document.getElementById("webgl");

    

    // get the rendering context for webgl
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log("Failed to get the rendering context for WebGL");
        return;
    }

    // specify the color for clearing the canvas
    gl.clearColor(1.0, 0.0, 0.0, 1.0);
    
    // clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

}