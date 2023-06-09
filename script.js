const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
let foodX , foodY  ;
let snakeX =5, snakeY =10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let gameOver = false; 
let setIntervalid;
let score = 0;

//Getting high score from the local storage             
let highScore = localStorage.getItem(".high-score") || 0;
highScoreElement.innerText = `High score: ${highScore}`;
const changeFoodPosition = () =>{
    //Passing rendom 0-30 value as food position
    foodX = Math.floor(Math.random() *30)+ 1;
    foodY = Math.floor(Math.random() *30)+ 1;
}

const handleGameOver = () =>{
    //clearing the timer and reloading the page on game over
    clearInterval(setIntervalid);
    alert("Game over! Press OK to repley...");
    location.reload();
}

const ChangeDirection = (e) =>{
    //Changing velocity value based on key press
   if(e.key === "ArrowUp" && velocityY != 1){
    velocityX = 0;
    velocityY = -1;
   }
   else if(e.key ==="ArrowDown" && velocityY != -1){
    velocityX = 0;
    velocityY = 1;
   }
   else if(e.key ==="ArrowLeft" && velocityX != 1){
    velocityX = -1;
    velocityY = 0;
   }
   else if(e.key ==="ArrowRight" && velocityX != -1){
    velocityX = 1;
    velocityY = 0;
   }

}

const initGame = ()=>{
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
if(snakeX === foodX && snakeY === foodY){
    changeFoodPosition();
    snakeBody.push([foodX , foodY]); // pushing food position to snake body array
    score++;// increment score by 1
    
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score",highScore);
    scoreElement.innerText = `score: ${score}`;
    highScoreElement.innerText = `High score: ${highScore}`;
}

for(let i = snakeBody.length - 1;i > 0; i--){
    snakeBody[i] = snakeBody[i-1]
}
    snakeBody[0] = [snakeX , snakeY];//setting 1st element
    //updating the snake's head position on the current velocity
    snakeX += velocityX;
    snakeY += velocityY;
    if(snakeX <=0 || snakeX >30 || snakeY <=0 || snakeY >30){
        gameOver = true;
    }

    for(let i=0 ; i < snakeBody.length ; i++){
       //Adding div for each part of the snake body
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

//checking if the snake head hit the body , if so set gameover to true

        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }

    }
   
    
    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();
setIntervalid = setInterval(initGame,125);
document.addEventListener("keydown",ChangeDirection);