const canvas = document.getElementById("example");
const ctx = canvas.getContext("2d");

// ctx.beginPath();
// starting position is x=50, y=50
// ctx.moveTo(50, 50);
// draw the line that has final coordinates x=250, y=50
// ctx.lineTo(250, 50);

// ctx.lineTo(250,250);
// ctx.lineTo(200,300);

// .stroke() executes the drawing

// ctx.endPath();

// ctx.fillStyle = 'blue';
// ctx.fillRect(75, 75, 150, 150);

// ctx.arc(100, 100, 100, 0, 100, true);

// ctx.arc(150, 170, 75, 0, Math.PI * 1.5);
// ctx.fill();

let dino = new Image();
dino.src = "./dino.png";
let currentX = 25;
let currentY = 25;
let activeDirections = {up: false, down: false, left: false, right: false}



function drawDinosaur() {
    ctx.drawImage(dino, currentX, currentY, 50, 50);
}



function move(speed){

    ctx.clearRect(0,0,300,300);

    if (activeDirections.right) currentX += speed;

    if(activeDirections.left) currentX -=speed;

    if(activeDirections.down) currentY += speed;

    if(activeDirections.up) currentY -= speed;

    drawDinosaur();
}




dino.onload = function () { 
    drawDinosaur();
};

// setInterval(() => {
//     ctx.clearRect(0,0,300,300);
//     moveRight();
//     moveDown();
//     drawDinosaur();
    
// }, 80);

document.onkeydown = function(event){
const arrows = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    if( arrows.includes(event.key)){
        event.preventDefault();
    }
    if(event.key === "ArrowUp"){
        activeDirections.up = true;
    } else if(event.key === "ArrowDown"){
        activeDirections.down = true;
    } else if(event.key === "ArrowLeft"){
        activeDirections.left = true;
    } else if(event.key === "ArrowRight"){
        activeDirections.right = true;
    }
    move(3);
};

document.onkeyup = function(event){ 
        if(event.key === "ArrowUp"){
            activeDirections.up = false;
        } else if(event.key === "ArrowDown"){
            activeDirections.down = false;
        } else if(event.key === "ArrowLeft"){
            activeDirections.left = false;
        } else if(event.key === "ArrowRight"){
            activeDirections.right = false;
        }
    };



