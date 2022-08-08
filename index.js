function getTitle(s) {
    document.write("<h1>"+s+"</h1>");
}

function clearColor_red(gl) {
    gl.clearColor(1,0.5,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);
}