function main() {
    var canvas = document.getElementById('exampleCanvas');
    if (!canvas) {
        console.log("Failed to retrieve the <canvas> element");
    }

    var ctx = canvas.getContext("2d");

    let img = new Image();
    img.src = "../resources/sky.jpg";
    img.onload = () => {
        ctx.drawImage(img, 0, 0);
    }

    ctx.fillStyle= "rgba(0, 0, 255, 1.0";
    ctx.fillRect(120, 10, 150, 150);
}