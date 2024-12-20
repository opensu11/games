const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
// const { restart } = require('nodemon');
const conf = require('../config/game_conf');
const { Button } = require('./button');

var score;
var gameStarted;
var gaveOver;

var xBallPos;
var yBallPos;

var xPaddlePos;
var yPaddlePos;

var xBallDir;
var yBallDir;

var xBallIncrPos;
var yBallIncrPos;

var loopInterval;

var restartButton;

const initialize = () => {
    gameOver = false;
    score = 0;

    canvas.width = conf.canvasWidth;
    canvas.height = conf.canvasHeight;

    // Create borders
    showBorders ();

    // Show paddle
    let xCenterPaddlePos = (canvas.width/2)-(conf.paddlewidth/2);
    xPaddlePos = xCenterPaddlePos;
    yPaddlePos = conf.yPaddlePosPerct/100 * canvas.height;
    drawPaddle (xPaddlePos, yPaddlePos);

    // Show ball
    let xCenterBallPos = canvas.width/2;
    let yStartBallPos = (conf.yPaddlePosPerct * canvas.height)/100 - (conf.ballPaddleHeight/2);

    xBallPos = xCenterBallPos;
    yBallPos = yStartBallPos;
    drawBall (xBallPos, yBallPos);

    gameStarted = false;
    gameOver = false;

    // console.log ('before new Button ');
    restartButton = new Button ('Start again', '#eeaa00', '#001122');
    restartButton.setPosition (canvas.width*0.35, canvas.height*0.75);
    restartButton.setSize (120, 40);
    // console.log ('after new Button');
    // console.log ('restartButton ', restartButton);
    
}

const showBorders =  () => {
    // borders
    ctx.fillStyle = 'orange';
    ctx.fillRect (0, 0, canvas.width - conf.borderWidth, conf.borderWidth);
    ctx.fillRect (canvas.width - conf.borderWidth, 0, conf.borderWidth, canvas.height);
    ctx.fillRect (0, canvas.height - conf.borderWidth, canvas.width, conf.borderWidth);
    ctx.fillRect (0, 0, conf.borderWidth, canvas.height - conf.borderWidth);
}

const drawPaddle = (xPos, yPos) => {
    // console.log('draPaddle ', xPos, yPos);
    // paddle
    ctx.fillStyle = 'black';
    ctx.fillRect (xPos, yPos, conf.paddlewidth, conf.paddleHeight);
}

const drawBall = (xPos, yPos) => {
    //console.log(xPos, yPos);
    // ball
    // ctx.fillRect (xPos, yPos, conf.ballPaddleHeight, conf.ballPaddleHeight);
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.arc (xPos, yPos, conf.ballPaddleHeight/2, 0, 360*Math.PI);
    ctx.stroke();
    ctx.fill();
}

const startGame = () => {
    gameStarted = true;
    xBallIncrPos = Math.random() * 2;
    yBallIncrPos = Math.random() * 2;
    if (Math.random () < 0.5) {
         xBallDir = 'left';
    } else {
        xBallDir = 'right';
    }
    yBallDir = 'up';
    loopInterval = setInterval (play, conf.speedTimeFrame);
}

const handleWallHit = () => {
    if (xBallPos <= (0 + conf.borderWidth)) {
        // ball hit left wall
        xBallDir = 'right';
    }

    if (xBallPos >= (canvas.width - conf.borderWidth)) {
        // ball hit right wall
        xBallDir = 'left';
    }

    if (yBallPos <= (0 + conf.borderWidth)) {
        // ball hit top wall
        yBallDir = 'down';
    }

    // This is handled by game over function
    // if (yBallPos >= (canvas.height - conf.borderWidth)) {
    //     // ball
    // }
}

const handlePaddleBallHit = () => {
    if (((xBallPos + conf.ballPaddleHeight/2) >= (xPaddlePos))
        && ((xBallPos + conf.ballPaddleHeight/2) <= (xPaddlePos + conf.paddlewidth))
        && ((yBallPos + conf.ballPaddleHeight/2) >= yPaddlePos)) {
            // ball hit the paddle
            score += 1;
            // console.log('increasing score ', score);
            // console.log(xBallPos, yBallPos, xPaddlePos, yPaddlePos);
            // continue
            // change direction of ball to bounce off paddle
            yBallDir = 'up';
        
    } else if ((yBallPos + conf.ballPaddleHeight/2) >= yPaddlePos) {
        // handle going below paddle and losing the game
        gameOver = true;
        showGameOverMes();
        clearInterval (loopInterval);
    }
}

const play = () => {

    ctx.clearRect (0, 0, canvas.width, canvas.height);

    showBorders ();

    moveBall ();
    // on user input move paddle - this is handled by event handler

    drawPaddle (xPaddlePos, yPaddlePos);

    // check wall hit left, right, top
    handleWallHit ();

    showScoreOnGame();

    // check if point gained that is Paddle hit
    handlePaddleBallHit ();

    // check if game over

    // repeat
}

const moveBall = () => {
    // move ball
    if (xBallDir === 'left') {
        xBallPos -= xBallIncrPos;
    } else if (xBallDir === 'right') {
        xBallPos += xBallIncrPos;
    }
    
    if (yBallDir === 'up') {
        yBallPos -= yBallIncrPos;
    } else if (yBallDir === 'down') {
        yBallPos += yBallIncrPos;
    }

    // console.log('play ', xBallPos, yBallPos);
    
    drawBall (xBallPos, yBallPos);
}

// const movePaddle = () => {

// }

const isGameOver = () => {

    if ((yBallPos + conf.ballPaddleHeight) > yPaddlePos) {
        // handle going below paddle and losing the game
        gameOver = true;
        showGameOverMes();
        // console.log('loopInterval ', loopInterval);
        clearInterval (loopInterval);
    }

}

const showGameOverMes = () => {

    if (gameOver) {
        ctx.clearRect (0, 0, canvas.width, canvas.height);

        showBorders ();
    
        // ctx.fillStyle('orange');
        // ctx.fillRect ()
    
        let fontSize = 25;
    
        ctx.font = ''+fontSize+'px Arial';
        // console.log(' (canvas.width/2 - 75), (canvas.height/2 - (fontSize/2)) ', (canvas.width/2 - 75), (canvas.height/2 - (fontSize/2)));
        ctx.strokeText ('Game Over !!', (canvas.width/2 - 75), (canvas.height/2 - (fontSize/2)));
        ctx.strokeText ('Score: '+score, (canvas.width/2 - 50), (canvas.height/2 + (fontSize/2)));   

        restartButton.draw (ctx);
    }
}

const handleUserInput = (e) => {
    switch (e.keyCode) {
        case 37:
            // console.log('Left arrow pressed !!');
            // the code for moving paddle to left to be written

            // if (dx > 0) {
            //     dx = -dx;
            // }

            if (xPaddlePos > (0 + conf.borderWidth + 5)) {
                xPaddlePos -= conf.paddleMoveDist;
            }
            break;
        case 39:
            // console.log('Right arrow pressed !!');
            // the code for moving paddle to right to be written

            // if (dx < 0) {
            //     dx = -dx;
            // }
            if (xPaddlePos < (canvas.width - conf.paddlewidth - conf.borderWidth - 5)) {
                xPaddlePos += conf.paddleMoveDist;
            }
            break;
        case 32:
            // console.log('Space key pressed !!');
            if (!gameStarted) {
                startGame();
            }
            break;
        default:
            // console.log('No arrow key pressed !!');
    }
}

const showScoreOnGame = () => {
    ctx.fillStyle = 'cyan';
    ctx.fillRect ((canvas.width - 100), 50, 50, 20);

    let scoreFontSize = 10;
    ctx.font = ''+scoreFontSize+'px "Comic Sans MS"';
    ctx.strokeText ('Score: '+score, (canvas.width - 95), (63), 55);
    // console.log('showing score ');
}

const handleRestartGame = (evt) => {
    let x = evt.pageX - (canvas.clientLeft + canvas.offsetLeft);
    let y = evt.pageY - (canvas.clientTop + canvas.offsetTop);

    if (restartButton.inBounds (x, y) && !!restartButton.onClick)
        restartButton.onClick(initialize);
}

window.addEventListener ('keydown', handleUserInput);

window.addEventListener ('click', handleRestartGame);

initialize();