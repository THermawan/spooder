var canvas = document.getElementById("textCanvas");
var ctx = canvas.getContext("2d");
var img = new Image();
img.src = "images/background.jpg";
img.onload = function() {
    ctx.drawImage(img, 0, 0);
};