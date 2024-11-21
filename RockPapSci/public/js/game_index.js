const conf = require('./config/game_conf');
const { Button } = require('./button');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

var gameOver;
var scores = []; // 0 is AI, 1 is Player

var restartButton;
var chooseButton;
var rockButton;
var paperButton;
var scissorButton;

/*
    Rock: 0 to 0.33,
    Paper: 0.33 to 0.66,
    Scissors: 0.66, 1.0
*/

const testRectGradientDraw = (ctx) => {
    let grd = ctx.createRadialGradient (70, 80, 2, 90, 100, 100);
    grd.addColorStop (0, 'blue');
    grd.addColorStop (1, 'white');

    ctx.fillStyle = grd;
    // ctx.fillRect (0, 0, 50, 50);
    // ctx.roundRect (0, 0, 100, 100, 5);
    ctx.fillRect (100, 180, 170, 40);
}

const winnerMatrix = 
[
    ['Rock', 'Paper', 'Paper'],      // choice 1, choice 2, result
    ['Paper', 'Scissor', 'Scissor'],
    ['Scissor', 'Rock', 'Rock']
];

// helper functions

const showBorders = () => {
    // Display borders
    ctx.fillStyle = 'violet';
    ctx.fillRect (0, 0, canvas.width - conf.borderWidth, conf.borderWidth);
    ctx.fillRect (canvas.width - conf.borderWidth, 0, conf.borderWidth, canvas.height);
    ctx.fillRect (0, canvas.height - conf.borderWidth, canvas.width - conf.borderWidth, conf.borderWidth);
    ctx.fillRect (0, 0, conf.borderWidth, canvas.height - conf.borderWidth);
}

const choiceOfAi = () => {
    let aiChoice = Math.random ();
    return aiChoice;
}

const win = (playerChoice) => {
    // rock vs scissors - rock wins
    // paper vs scissors - scissors wins
    // paper vs rock - paper wins

    let aiCh, plCh, winner;

    aiChoice = choiceOfAi();

    aiCh = getTextChoice (aiChoice);
    plCh = playerChoice;

    //console.log('aiCh, plCh ', aiCh, plCh);

    winnerMatrix.forEach ((combo) => {
        //console.log ('combo ', combo);

        // // 1st Version
        // if ((combo[0] === aiCh) && (combo[1] === plCh)) {
        //     if (combo[0] === combo[2]) {
        //         winner = "AI";
        //     } else if (combo[1] === combo[2]) {
        //         winner = "Player";
        //     }
        // }

        // 2nd Version
        //console.log('loop winner, !winner ', winner, !winner);
        if (!winner) {
            if (combo[0] === aiCh) {
                if (combo[1] === plCh) {
                    // console.log ('combo[0] ', combo[0], 'combo[1] ', combo[1], 'combo[2] ', combo[2]);
                    // console.log ('combo[0] === combo[2] ', combo[0] === combo[2]);
                    // console.log('combo[1] === combo[2] ', combo[1] === combo[2]);
                    if (combo[0] === combo[2]) {
                        winner = 'AI';
                        scores[0] += 1;
                        // showIndividualResult (winner);
                    } else if (combo[1] === combo[2]) {
                        winner = 'Player';
                        scores[1] += 1;
                        // showIndividualResult (winner);
                    }
                }
            }
    
            if (combo[0] === plCh) {
                if (combo[1] === aiCh) {
                    // console.log ('combo[0] ', combo[0], 'combo[1] ', combo[1], 'combo[2] ', combo[2]);
                    // console.log ('combo[0] === combo[2] ', combo[0] === combo[2]);
                    // console.log('combo[1] === combo[2] ', combo[1] === combo[2]);
                    if (combo[0] === combo[2]) {
                        winner = 'Player';
                        scores[1] += 1;
                        // showIndividualResult (winner);
                    } else if (combo[1] === combo[2]) {
                        winner = 'AI';
                        scores[0] += 1;
                        // showIndividualResult (winner);
                    }
                }
            }    
        }
    });
    // console.log('Winner before check for no result: ', winner);

    // if (!winner) {
    //     winner = '';

    //     // No resuld

    //     // showIndividualResult (winner);
    // }

    //console.log('AI Choice: ', aiCh);
    //console.log('Player choice: ', plCh);
    //console.log('scores ', scores);
    showIndividualResult (winner, aiCh, plCh);
    showScoresOnGame ();

    if (scores[0] >= conf.win_score || scores[1] >= conf.win_score) {
        endGame (winner);
    }
}

const getTextChoice = (numChoice) => {
    let ch;
    if (numChoice <= 0.33) {
        ch = "Rock";
    } else if ((numChoice > 0.33) && (numChoice <= 0.66)) {
        ch = "Paper";
    } else {
        ch = "Scissor";
    }
    return ch;
}

const showIndividualResult = (winner, aiChoice, playerChoice) => {
    //console.log('Winner: ', winner?winner:'No result');

    ctx.clearRect (0.3*canvas.width, 0.45*canvas.height, 200, 100);

    ctx.fillStyle = '#7091E6';
    ctx.fillRect ((0.3*canvas.width), (0.45*canvas.height), 200, 100);

    let scoreFontSize = 25;
    ctx.font = ''+scoreFontSize+'px "Comic Sans MS"';
    ctx.strokeText ('AI Choice: '+aiChoice, (0.5*canvas.width), (0.53*canvas.height), 150);
    ctx.strokeText ('Player Choice: '+playerChoice, (0.5*canvas.width), (0.63*canvas.height), 150);

}

const showScoresOnGame = () => {

    // ctx.clearRect (0, 0, canvas.width, canvas.height);
    ctx.clearRect ((canvas.width - 130), 55, 80, 49);
    
    ctx.fillStyle = 'cyan';
    ctx.fillRect ((canvas.width - 130), 50, 80, 49);

    let scoreFontSize = 15;
    ctx.font = ''+scoreFontSize+'px "Comic Sans MS"';
    ctx.strokeText ('AI Score: '+scores[0], (canvas.width - 90), (66), 65);
    ctx.strokeText ('Player Score: '+scores[1], (canvas.width - 90), (86), 65);
    // console.log('showing score ');
}

const showEndResult = (winner) => {
    
    // ctx.fillStyle = 'cyan';
    // ctx.fillRect ((canvas.width - 130), 50, 80, 50);

    // Show final message
    let scoreFontSize = 30;
    ctx.font = ''+scoreFontSize+'px "Comic Sans MS"';
    ctx.strokeText ('Winner is '+winner, (0.50*canvas.width), (0.35*canvas.height), 150);
    ctx.strokeText ('AI Score: '+scores[0], (0.49*canvas.width), (0.48*canvas.height), 100);
    ctx.strokeText ('Player Score: '+scores[1], (0.49*canvas.width), (0.58*canvas.height), 100);
    // console.log('showing score ');

    // Show restart button
    restartButton.draw (ctx);

}

const endGame = (winner) => {
    // clear all on the canvas
    ctx.clearRect (0, 0, canvas.width, canvas.height);

    showBorders ();

    // Display score of the winner and looser
    showEndResult (winner);

}

// main functions

const initialize = () => {
    gameOver = false;
    scores ['computer'] = 0;
    scores ['player'] = 0;

    canvas.width = conf.canvasWidth;
    canvas.height = conf.canvasHeight;

    // Create borders
    showBorders();

    // Show button to start
    restartButton = new Button ('Start / Restart', '#eeaa00', '#001122');
    restartButton.setPosition (canvas.width*0.32, canvas.height*0.75);
    restartButton.setSize (170, 40);
    restartButton.draw (ctx);
    restartButton.activate();

    // testRectGradientDraw (ctx);
}

const startGame = () => {

    // Clear all
    ctx.clearRect (0, 0, canvas.width, canvas.height);
    
    showBorders ();

    scores = [0, 0]; // Ai and Player

    rockButton = new Button ('Rock', 'yellow', '#001122');
    rockButton.setSize (80, 30);
    rockButton.setPosition (50, 80);
    rockButton.draw (ctx);
    rockButton.activate();

    paperButton = new Button ('Paper', 'yellow', '#001122');
    paperButton.setSize (80, 30);
    paperButton.setPosition (150, 80);
    paperButton.draw (ctx);
    paperButton.activate();

    scissorButton = new Button ('Scissor', 'yellow', '#001122');
    scissorButton.setSize (80, 30);
    scissorButton.setPosition (250, 80);
    scissorButton.draw (ctx);
    scissorButton.activate();

    restartButton.clear (ctx);

    showScoresOnGame ();
}

const play = () => {

}

const handleButtonClick = (evt) => {
    let x = evt.pageX - (canvas.clientLeft + canvas.offsetLeft);
    let y = evt.pageY - (canvas.clientTop + canvas.offsetTop);

    if (restartButton.inBounds (x, y) && !!restartButton.onClick)
        restartButton.onClick(startGame);

    if (rockButton.inBounds (x, y) && !! rockButton.onClick) {
        rockButton.onClick (win);
    }

    if (scissorButton.inBounds (x, y) && !! scissorButton.onClick) {
        scissorButton.onClick (win);
    }

    if (paperButton.inBounds (x, y) && !! paperButton.onClick) {
        paperButton.onClick (win);
    }
}



initialize();



// Event handlers

window.addEventListener('click', handleButtonClick);





