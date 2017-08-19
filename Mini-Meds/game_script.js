var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-30;


var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var score = 0;

var lives = 3;

var start = false;

var level = 1;
var levelwon = false;
var gameOver = false;

var speed = 1.5

var dx = speed;
var dy = -speed;
var mouse_x = null;
var mouse_y = null;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function setCookie(NameOfCookie, value, expiredays)
{
    var ExpireDate = new Date ();
    ExpireDate.setTime(ExpireDate.getTime() + (expiredays * 24 * 3600 * 1000));
    document.cookie = NameOfCookie + "=" + escape(value) +
    ((expiredays == null) ? "" : "; expires=" + ExpireDate.toGMTString());
}

function getCookie(NameOfCookie)
{
    if (document.cookie.length > 0)
    {
        begin = document.cookie.indexOf(NameOfCookie+"=");
        if (begin != -1)
        {
            begin += NameOfCookie.length+1;
            end = document.cookie.indexOf(";", begin);
            if (end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(begin, end));
        }
    }
    return null;
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function getPositionTryAgain(event)
{
    var canvas = document.getElementById("myCanvas");
    var rect = canvas.getBoundingClientRect();
    mouse_x = event.clientX - rect.left;
    mouse_y = event.clientY - rect.top;
    if(mouse_x > 160 && mouse_x < 315 && mouse_y >180 && mouse_y < 250){
        document.location.reload();
    }
}

function drawBall() {
    if(levelwon == true){
        x = canvas.width/2
        y = canvas.height-30;
    }
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0099ff";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    if(levelwon == true){
        paddleX = (canvas.width-paddleWidth)/2;
    }
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0099ff";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(levelwon == true){
                bricks[c][r].status = 1;
            }
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#800000";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x+ballRadius > b.x && x-ballRadius < b.x+brickWidth && y+ballRadius > b.y && y-ballRadius < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score%(brickRowCount*brickColumnCount) == 0) {
                        levelwon = true;
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#800000";
    ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#800000";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function drawLevel() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#800000";
    ctx.fillText("Level: "+level, 200, 20);
}

function drawFinalScore() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000066";
    ctx.fillText("Game Over", 165, 90);
    ctx.fillText("Final Score: "+score, 150, 150);
}

function drawTryAgain(){
    ctx.beginPath();
    ctx.rect(165, 180, 150, 70);
    ctx.fillStyle = "#0099ff";
    ctx.fill();
    ctx.closePath();
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000066";
    ctx.fillText("Try Again", 175, 225);

}

function drawStart(){
    ctx.beginPath();
    ctx.rect(165, 120, 150, 70);
    ctx.fillStyle = "#0099ff";
    ctx.fill();
    ctx.closePath();
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000066";
    ctx.fillText("Start", 210, 165);
}

function getPositionStart(event)
{
    var canvas = document.getElementById("myCanvas");
    var rect = canvas.getBoundingClientRect();
    mouse_x = event.clientX - rect.left;
    mouse_y = event.clientY - rect.top;
    if(mouse_x > 165 && mouse_x < 315 && mouse_y >120 && mouse_y < 190){
        start = true;
    }
}

function setHighScore(){
    if(sessionStorage.getItem("game_highscore")<score){
        setCookie("email", sessionStorage.getItem("email"), 7);
        setCookie("game_highscore", score, 7);
        console.log("in");
        var dataPass = $(score).serialize();
        $.ajax({
            url : "game.php",
            type : "GET",
            data : dataPass,
            success : function(data) {
            sessionStorage.setItem("game_highscore", getCookie("game_highscore"));
            }
        });
    }

}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(start == false){
        drawStart();
        myCanvas.addEventListener("click", getPositionStart, false);
    }
    if(gameOver == false && start == true){
        drawBricks();
        drawBall();
        drawPaddle();
        if(levelwon == true){
            level ++;
            speed += 0.3;
            dx = speed;
            dy = -speed;
            levelwon = false;
        }
        drawScore();
        drawLives();
        drawLevel();
        collisionDetection();

        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
        }
        if(y + dy < ballRadius) {
            dy = -dy;
        }
        else if(y + dy > canvas.height-(ballRadius+paddleHeight)) {
            if(x+ballRadius > paddleX && x-ballRadius < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                lives--;
                if(!lives) {
                    gameOver = true;
                }
                else {
                    x = canvas.width/2;
                    y = canvas.height-30;
                    dx = speed;
                    dy = -speed;
                    paddleX = (canvas.width-paddleWidth)/2;
                }
            }
        }

        if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 7;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        x += dx;
        y += dy;
    }
    else if (gameOver == true){
        if(sessionStorage.getItem("loggedIn") == "true"){
            console.log("Hello");
            setHighScore();
        }
        myCanvas.addEventListener("click", getPositionTryAgain, false);
        drawFinalScore();
        drawTryAgain();
    }
}




setInterval(draw, 10);

