const conf = require('./config/game_conf');
const { Button } = require ('./button');

const canvas = document.querySelector ('canvas');
const ctx = canvas.getContext ('2d');

// snake should move continuously
// snake has length of body
// each food consumption adds one square to snake
// it looses when it hits the wall or itself (itself is not possible with this design as the snake is only on one line, it changes complete direction)
// it eats food when it hits food
// at each time there will be one food to be consumed on board
// maximum score achievement is the objective

var loop = 0;

var score = 0;

var snake_body_length = 2;
var snake_position = [50, 50];

var noOfHorizontalBox, noOfVerticalBox;

// var snake_body = [[50, 50], [50-10, 50], [50-20, 50]];
var snake_body;

var snake_direction = 'down';  // up, right, down, left

var food_pos = [];
var food_on_board = false;

var started = false;

const initialize = () => {
    canvas.width = conf.canvasWidth;
    canvas.height = conf.canvasHeight;

    noOfHorizontalBox = (canvas.width - (2*conf.boxSize))/conf.boxSize;
    noOfVerticalBox = (canvas.height - (2*conf.boxSize))/conf.boxSize;

    // console.log('noOfHorizontalBox ', noOfHorizontalBox);
    // console.log('noOfVerticalBox ', noOfVerticalBox);

    let newXPos = Math.round(Math.random () * noOfHorizontalBox);
    let newYPos = Math.round(Math.random () * noOfVerticalBox);

    //console.log('newXPos, newYPos ', newXPos, newYPos);
    //console.log('[newXPos, (newYPos-1)], [newXPos, (newYPos - (2*1))] ', [newXPos, (newYPos-1)], [newXPos, (newYPos - (2*1))]);
    snake_body = [[newXPos, newYPos], [newXPos, (newYPos-1)], [newXPos, (newYPos - (2*1))]];
    //snake_body = [[newXPos, newYPos], [newXPos, (newYPos-1)], [newXPos, (newYPos - (2*1))], [newXPos, (newYPos - (3*1))], [newXPos, (newYPos - (4*1))], [newXPos, (newYPos - (5*1))], [newXPos, (newYPos - (6*1))], [newXPos, (newYPos - (7*1))], [newXPos, (newYPos - (8*1))]];

    //console.log('snake_body ', JSON.stringify(snake_body));
    // snake_position = [newXPos,newYPos];
    snake_position = JSON.parse(JSON.stringify([newXPos,newYPos]));

    showBorders ();
}

const showBorders = () => {
    // Display borders
    ctx.fillStyle = 'blue';
    ctx.fillRect (0, 0, canvas.width - conf.borderWidth, conf.borderWidth);
    ctx.fillRect (canvas.width - conf.borderWidth, 0, conf.borderWidth, canvas.height);
    ctx.fillRect (0, canvas.height - conf.borderWidth, canvas.width - conf.borderWidth, conf.borderWidth);
    ctx.fillRect (0, 0, conf.borderWidth, canvas.height - conf.borderWidth);
}

const moveSnake = () => {

    switch (snake_direction.toLowerCase()) {
        case "up":
            snake_position[1]--;
            break;
        case "right":
            snake_position[0]++;
            break;
        case "down":
            snake_position[1]++;
            break;
        case "left":
            snake_position[0]--;
            break;
        default:
            break;
    }

    // let snake_draw_length = snake_body_length;

    // while (snake_draw_length < snake_body_length) {
    //     drawBlock (snake_body_length - snake_draw_length);
    //     snake_draw_length++;
    // }

    //console.log('moveSnake snake_position ', JSON.stringify(snake_position));
    //console.log('moveSnake snake_body ', JSON.stringify(snake_body));

}

// const drawBlock = (blockNumber) => {

//     console.log('drawBlock ');
//     console.log(snake_position);
//     console.log(snake_direction);
//     console.log(blockNumber);

//     let xPos = snake_position[0];
//     let yPos = snake_position[1];

//     switch (snake_direction.toLowerCase()) {
//         case "up":
//             yPos = snake_position[1] - blockNumber;
//             break;
//         case "right":
//             xPos = snake_position[0] + blockNumber;
//             break;
//         case "down":
//             yPos = snake_position[1] + blockNumber;
//             break;
//         case "left":
//             xPos = snake_position[0] - blockNumber;
//             break;
//         default:
//             break;
//     }

//     console.log('xPos, yPos ', xPos, yPos);
//     ctx.fillStyle = 'red';

//     ctx.fillRect (xPos*conf.boxSize, yPos*conf.boxSize, conf.boxSize, conf.boxSize);

//     console.log('after drawing blocks');
// }

const drawBlock2 = () => {
    let snake_draw_length = 0;

    ctx.fillStyle = 'red';

    while (snake_draw_length < snake_body.length) {
        // draw the block
        //console.log('snake_body[snake_draw_length] ', snake_draw_length, snake_body[snake_draw_length]);
        //console.log('params ', snake_body[snake_draw_length][0]*conf.boxSize, snake_body[snake_draw_length][1]*conf.boxSize, conf.boxSize, conf.boxSize);

        ctx.fillRect (snake_body[snake_draw_length][0]*conf.boxSize, snake_body[snake_draw_length][1]*conf.boxSize, conf.boxSize, conf.boxSize);
        snake_draw_length++;

    }
  //console.log('snake_body at end of drawBlock2 ', snake_body);
}

const handleUserInput = (e) => {
    // left, up, right, down are 37, 38, 39, 40
    
    switch (e.keyCode) {
        case 37:
                // console.log('Left arrow pressed !!');
                if (snake_direction !== 'right') {
                    snake_direction = 'left';
                }
                break;
        case 38:
                // console.log('Up arrow pressed !!');
                if (snake_direction !== 'down') {
                    snake_direction = 'up';
                }
                break;
        case 39:
                // console.log('Right arrow pressed !!');
                if (snake_direction !== 'left') {
                    snake_direction = 'right';
                }
            break;
        case 40:
                // console.log('Down arrow pressed !!');
                if (snake_direction !== 'up') {
                    snake_direction = 'down';
                }
                break;
        // case 32:
                // // console.log('Space key pressed !!');
                // if (!gameStarted) {
                //     startGame();
                // }
                // break;
        default:
            // console.log('No arrow key pressed !!');
    }
}

const spawnFood = () => {
    if (!food_on_board) {
        let xFood = Math.random();
        let yFood = Math.random();
        //console.log ('xFood, yFood ', xFood, yFood);
        //console.log('xFood?xFood:0.23 ', xFood?xFood:0.23);
        //console.log('xFood?xFood:0.23 * (canvas.width - (2*conf.boxSize))/conf.boxSize ', xFood?xFood:0.23 * (canvas.width - (2*conf.boxSize))/conf.boxSize);
        //console.log('(canvas.width - (2*conf.boxSize))/conf.boxSize ', (canvas.width - (2*conf.boxSize))/conf.boxSize);
        //console.log('(yFood?yFood:0.33) * (canvas.height - (2*conf.boxSize))/conf.boxSize ', (yFood?yFood:0.33) * (canvas.height - (2*conf.boxSize))/conf.boxSize);
        let foodPosX = Math.round ((xFood?xFood:0.23) * (canvas.width - (2*conf.boxSize))/conf.boxSize);
        let foodPosY = Math.round ((yFood?yFood:0.33) * (canvas.height - (2*conf.boxSize))/conf.boxSize);
        food_pos [0] = foodPosX?foodPosX:15;
        food_pos [1] = foodPosY?foodPosY:35;
        //console.log('food_pos ', food_pos);
    }

  //console.log('food_pos ', food_pos);
    ctx.fillStyle = ('magenta');
    ctx.fillRect (food_pos[0]*conf.boxSize, food_pos[1]*conf.boxSize, conf.boxSize, conf.boxSize);

    food_on_board = true;

    return food_pos;
}

// const checkLostGame = () => {

//     // check if ball hits the wall
//     if (snake_position[0]*conf.boxSize <= (0 + conf.boxSize) 
//         || snake_position[0]*conf.boxSize >= (canvas.width - conf.boxSize)) {
//             // ball hit left or right wall

//             // game is lost
//             // end game
//             endGame ('Ball hit left or right wall!!');

//         }

//     if (snake_position[1]*conf.boxSize <= (0 + conf.boxSize) 
//         || snake_position[1]*conf.boxSize >= (canvas.height - conf.boxSize)) {
//             // ball hit top or bottom wall

//             // game is lost
//             // end game
//             endGame ('Ball hit top or bottom wall!!');
//         }

// }

const checkLostGame2 = () => {

    // check if ball hits the wall
    if (snake_position[0]*conf.boxSize <= (0 + conf.boxSize) 
        || snake_position[0]*conf.boxSize >= (canvas.width - conf.boxSize)) {
            // ball hit left or right wall

            // game is lost
            // end game
            endGame ('Ball hit left or right wall!!');

        }

    if (snake_position[1]*conf.boxSize <= (0 + conf.boxSize) 
        || snake_position[1]*conf.boxSize >= (canvas.height - conf.boxSize)) {
            // ball hit top or bottom wall

            // game is lost
            // end game
            endGame ('Ball hit top or bottom wall!!');
        }

    // // check if snake hit itself
    // console.log('snake_body length ', snake_body.length);
    let l = snake_body.length;
    for (let i=1; i<l; i++) {
        // console.log('check if snake hit itself ');
        // console.log('snake_body ', JSON.stringify(snake_body));
        // console.log('snake_body[i] and snake_position ', i, snake_body[i], JSON.stringify(snake_position));
        // console.log('in checkLostGame 2 snake_position ', JSON.stringify(snake_position));
        // console.log('snake_body[i][0] === snake_position[0] and [1] hit ', snake_body[i][0] === snake_position[0], snake_body[i][1] === snake_position[1]);
        // console.log('snake_body[i] === snake_position ', snake_body[i] === snake_position);
        // console.log('typeof(snake_body[i]) and snake_position ', typeof(snake_body[i]), typeof(snake_position));
        // console.log('snake_body[i][1] === snake_position[1] hit ', snake_body[i][1] === snake_position[1]);

        if (snake_body[i][0] === snake_position[0]
                && snake_body[i][1] === snake_position[1])
            {
                // snake hit itself
                endGame ('Snake hit itself!!!');
            }
    }

}

const endGame = (message) => {
    // display the message and end game
    
    ctx.clearRect (0, 0, canvas.width, canvas.height);

    showBorders ();

    let fontSize = 25;
    
    ctx.font = ''+fontSize+'px Arial';
    // console.log(' (canvas.width/2 - 75), (canvas.height/2 - (fontSize/2)) ', (canvas.width/2 - 75), (canvas.height/2 - (fontSize/2)));
    ctx.strokeText ('Game Over !!', (canvas.width/2 - 75), (canvas.height/2 - (fontSize/2)));
    ctx.strokeText ('Score: '+score, (canvas.width/2 - 50), (canvas.height/2 + (fontSize/2)));

    // console.log('message.length ', message.length);
    // console.log((message?message.length:0)*fontSize/2);
    // console.log(2, ((canvas.width/2 - (message?message.length:0)*14/2)));

    ctx.strokeText ('Message: '+message, (canvas.width/2 - (message?message.length:0)*14/2), (canvas.height/2 + 4*(fontSize/2)));
    clearInterval (loop);
}

const eatFood = () => {
    // check if the snake touched food to eat

    //console.log('snake_body before unshift ', JSON.stringify(snake_body));
    // return;
    let tempSnakePos = JSON.parse(JSON.stringify(snake_position));
    snake_body.unshift(tempSnakePos);
    //console.log('snake_body after unshift ', JSON.stringify(snake_body));

    if (snake_position[0] === food_pos[0] 
        && snake_position[1] === food_pos[1]) {
            // ball hit food to eat

            score++;
            snake_body_length++;
            // delete food
            ctx.clearRect (food_pos[0], food_pos[1], conf.boxSize, conf.boxSize);
            // set food_
            food_on_board = false;

        } else {
            snake_body.pop();
            //console.log('snake_body after pop ', JSON.stringify(snake_body));
        }
}




// Game loop

var gameLoopStep = 0;
var maxSteps = 1500;

const game_loop = () => {

  //console.log('canvas.width and height ', canvas.width, canvas.height);
    ctx.clearRect (0, 0, canvas.width, canvas.height);

    showBorders ();

    // // move_snake ();
    // if (!started) {
    //     // snake_position[0] = Math.round(Math.random () * (canvas.width - (2*conf.boxSize))/conf.boxSize);
    //     // snake_position[1] = Math.round(Math.random () * (canvas.height - (2*conf.boxSize))/conf.boxSize);

    //     // snake_position[0] = Math.round(Math.random () * (canvas.width - noOfHorizontalBox));
    //     // snake_position[1] = Math.round(Math.random () * (canvas.height - noOfVerticalBox));

    //     started = true;
    // }
  //console.log('snake_position ', snake_position);

    moveSnake ();

    eatFood ();

    spawnFood ();

    //console.log('snake_body before drawBlock2 ', JSON.stringify(snake_body));
    drawBlock2 ();

    checkLostGame2 ();

    //console.log('snake_position ', JSON.stringify(snake_position));

    // score++;
    // let scoreFontSize = 25;
    // ctx.font = ''+scoreFontSize+'px "Comic Sans MS"';
    // ctx.strokeText (score, (0.5*canvas.width), (0.53*canvas.height), 150);

    if (score > 100) {
        endGame ('Stop after 100 loops!!');
    }

    gameLoopStep++;

    if (gameLoopStep > maxSteps) {
        endGame ('Testing after '+maxSteps+' steps');
    }
}

initialize();

console.log('conf.speedTimeFrame ', conf.speedTimeFrame);
var loop = setInterval (game_loop, conf.speedTimeFrame);
// game_loop ();

window.addEventListener ('keydown', handleUserInput);

module.exports = {
    spawnFood
};