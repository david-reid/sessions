let loop, cnv, ctx;
let bird;
let pipes, pipe;
let frameCount;

window.onload = function() {
    cnv = document.getElementById('canvas');
    ctx = cnv.getContext('2d');
    addEventListener("keydown",keyPressed);
    init();
    loop = setInterval(() => {
        update();
        render();
    }, 1000/60);
}

function init() {
    pipes = [];
    frameCount = 0;
    bird = {
        x:75,
        y:50,
        yv:0,
        size:15,
        color:"#fff",
        gravity:0.1,
        lift:-8,
    }
    pipe = {
        top:0,
        bottom:0,
        x:0,
        width:60,
        speed:4,
        color:"#fff",
    }
}
function update() {
    updateBird();
    updatePipes();
}
function render() {
    drawRect(0,0,cnv.width,cnv.height,"#000");
    drawCircle(bird.x,bird.y,bird.size,bird.color);
    drawPipes();
}

function drawRect(x,y,width,height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,width,height);
    ctx.fill();
}
function drawCircle(x,y,size,color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x,y, size, 0, Math.PI*2);
    ctx.fill();
}
function drawPipes() {
    pipes.forEach(p => {
        drawRect(p.x,0,p.width,p.top,p.color);
        drawRect(p.x,cnv.height-p.bottom,p.width,p.bottom,p.color);
    });
}
function resetPipe(pipe) {
    let lowerLimit = cnv.height/3;
    pipe.top = Math.random(cnv.height/2) * 100 + lowerLimit;
    pipe.bottom = Math.random(cnv.height/2) * 100 + lowerLimit;
    pipe.x = cnv.width;
}
function updatePipes() {
    frameCount++;
    if ( frameCount % 60 == 0 ) {
        let p = {...pipe};
        resetPipe(p);
        pipes.push(p);
    }
    for ( let i = 0; i < pipes.length; i++ ) {
        let p = pipes[i];
        p.x -= p.speed;
        checkForCollisions(bird,p);
        if ( p.x < -p.width ) {
            pipes.splice(i,1);
        }
    }
}

function updateBird() {
    bird.yv += bird.gravity;
    bird.y += bird.yv;

    if ( bird.yv < bird.lift ) {
        bird.yv = bird.lift;
    }
    if ( bird.y >= cnv.height-bird.size ) {
        bird.yv = 0;
        bird.y = cnv.height-bird.size;
    }
    if ( bird.y <= bird.size ) {
        bird.yv = 0;
        bird.y = bird.size;
    }
}

function liftBird() {
    bird.yv += bird.lift;
}
function keyPressed(event) {
    if ( event.keyCode == 32 ) {
        liftBird();
    }
}

function checkForCollisions(bird,pipe) {
    pipe.color = "#fff";
    if ( bird.y < pipe.top || bird.y > cnv.height - pipe.bottom ) {
        if ( bird.x+bird.size > pipe.x && bird.x-bird.size < pipe.x + pipe.width ) {
            pipe.color = "#ff0000";
        }
    }
}
