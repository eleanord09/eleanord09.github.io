const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = 0;
let dx = 5;
let y = 0;
let dy =1; 
let score = 0;
let gameRunning = true;

//this is an object
//we access values in an object like  this:
//player.x 
const player = {
    //key:value pair
    x : 200,
    y : 200,
    color: 'green',
    speed: 3
};

//this is also an object. We'll add the keys later.
//we access values from this kind of object
//like this:
//  keys['ArrowUp']
//Every time a key is pressed or released, we'll update this object
//if a key is currently being pressed, that key will be set to True.
//When the key is released, it will be set to False.
const keys = {};

//define functions
function drawRect(x,y) {
    //console.log("drawing rect");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(x,y,50,50);
    //ctx.fill();
}

function drawPlayer(){
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(
        player.x, //accessing the variable called x inside the player object
        player.y,
        20,
        0,
        2*Math.PI
    );
    ctx.fill();
}

//This function moves the player based on the
//values inside the `keys` object. We check each of
//ArrowUp, ArrowDown, etc, and move the player accordingly
function movePlayer(){
    //note this if statement is kind of interesting. keys['ArrowDown']
    //is already a true/false value(boolean), so we don't need a comparison
    //this is equivalent to saying
    //if(keys['ArrowDown']==true)
    if(keys['ArrowDown']){
        player.y += player.speed;
    }
    if(keys['ArrowUp']){
        player.y -= player.speed;
    }
    if(keys['ArrowLeft'] && 
    player.x > 50){
        player.x -= player.speed;
    }
    if(keys['ArrowRight'] && player.x < 350){
        player.x += player.speed;
    }
    //TODO: what  happens if the player
    //goes off the edge of the screen??
    if(player.y < 0){
        player.y = 400;
    }
    if (player.y > 400){
        player.y = 0;
    }
}

function drawScore(){
    ctx.font = "10px Arial";
    ctx.fillText(score, 10,10);
}

function moveBox(){
        // This code handles the position of the bouncing box.
        x = x + dx;
        y = y + dy;

        if(x > 350){
            dx = dx * -1;
        }
        if(x < 0){
            dx = dx * -1;
        }
        if(y > 350){
            dy = dy * -1;
        }
        if(y < 0){
            dy = dy * -1;
        }
}
function checkCollision() {
    let playerLeft = player.x - 20;
    let playerRight = player.x + 20;
    let playerTop = player.y - 20;
    let playerBottom = player.y + 20;

    let boxLeft = x;
    let boxRight = x + 50;
    let boxTop = y;
    let boxBottom = y + 50;

    if (
        playerRight > boxLeft &&
        playerLeft < boxRight &&
        playerBottom > boxTop &&
        playerTop < boxBottom
    ) {
        // Collision detected!
        gameRunning = false;
        alert("Game Over! Score: " + score);
    }
}



function animate() {
    //`gameRunning` tracks the game state. 
    //when it becomes false, game over
    //so we'll only update score, move shapes, etc
    //as long as gameRunning is true
    if(gameRunning){
        score++;

        drawRect(x,y);
        drawScore();
        movePlayer();
        drawPlayer();
        moveBox();
	checkCollision();
    }
    //this schedules the next call of this function for 1/60
    //of a second from now
    requestAnimationFrame(animate);
}

//This is the "event listner" that we'll attach to the DOM
//it automatically receives an input, e, which is the event
//and includes properties like which key was pressed 
function handleKeyPress(e){
    //as an early test to see which key was pressed, we wrote this:
    //console.log(e.key); 
    keys[e.key] = true;
}

document.addEventListener('keydown', handleKeyPress);

//This is a shorthand way to define and use a function
// at the same time. We call this
//an "arrow function"
document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

//call our animate function the first time
//after this first run, requestAnimationFrame() will
//take over
animate();
