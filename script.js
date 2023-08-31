var player = document.getElementById("Player");
var enemy = document.getElementById("Enemy");
var ball = document.getElementById("Ball");
var roundText = document.getElementById("Round");
var timerText = document.getElementById("Time");
var scoreText = document.getElementById("Score");

var currentTime = 60;
var currentRound = 0;

var modifier = 5 + "px";
var score = 0;

var speedMod = 5;
var duration = 0;

let ballX = 500;
let ballY = 500;

ball.style.top = ballY + "px";
ball.style.left = ballX + "px";

let playerY;
let playerX = 20;

let dir_left = false;
let dir_up = true;

enemy.style.left = 900 + "px";

//=================================================================//
//                      MATH LOGIC                                 //
//=================================================================//

function approxEqual(a, b, tolerance){
    return Math.abs(a - b) < tolerance;
}



function calcP1Dist(){
    
    const rectPlayer = player.getBoundingClientRect();
    const rectBall = ball.getBoundingClientRect();
    
    const centerPlayerX = rectPlayer.left + rectPlayer.width / 2;
    const centerPlayerY = rectPlayer.top + rectPlayer.height / 2;
    
    const centerBallX = rectBall.left + rectBall.width / 2;
    const centerBallY = rectBall.top + rectBall.height / 2;
    
    const P1_Ball_distance = Math.sqrt(Math.pow(centerBallX - centerPlayerX, 2) + Math.pow(centerBallY - centerPlayerY, 2));
    
    return P1_Ball_distance;
    
}



//=================================================================//
//                      GAME LOGIC                                 //
//=================================================================//


window.addEventListener("mousemove", (Event) => {
    let x = Event.clientX;
    let y = Event.clientY;
    playerY = Event.clientY;
    playerX = Event.clientX;
    
    player.style.top = y -50 + "px";
    
})


function ballMove(){
    
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
    
    enemy.style.top = ballY -40 + "px";
    
    const p1dist = calcP1Dist();
    console.log(`Distance: ${p1dist}px`);
    
    scoreText.textContent = score;
    
    if (dir_left == true){
        ballX -=speedMod;
    } else if (dir_left == false){
        ballX +=speedMod;
    } else {
        console.log("Failed");
    }
    
    
    if (dir_up == true){
        ballY+=speedMod;
    } else if (dir_up == false) {
        ballY -=speedMod;       
    }
    
    
    if (ballX < -50){
        ballX = 500;
        ballY = 500;
        score-=1;
    } else if (ballX > 870){
        //ballX = 500;
        //score+=1;
        dir_left = true;
    } else if (ballY < 200){
        dir_up = true;
    } else if (ballY > 900){
        dir_up = false;
    } else if (p1dist < 50){
        dir_left = false;
        speedMod+=0.1;
        score+=1;
    } else {
        console.log("failed");
    }
}


function roundTimer(){
    if (currentTime > 0) {
        currentTime--;
        
    } else if (currentTime == 0){
        currentTime = currentTime + 60;
        currentRound = currentRound + 1;
    } else {
        console.log("Failed");
    }
    
    
    
    timerText.textContent = currentTime;
    roundText.textContent = currentRound;
}

function speedModifier(){
    speedMod+=0.1;
}

//=================================================================//
//                        CALL UPDATE                              //
//=================================================================//

setInterval(roundTimer, 600);
setInterval(ballMove, 20);