let cnv, ctx, loop;
let snake, tile, apple;

window.onload = function() {

    cnv = document.getElementById("canvas");
    ctx = cnv.getContext("2d");
    addEventListener("keydown",keyPressed);

    init();
    loop = setInterval(() => {

        update();
        render();
    },1000/15);
}

function drawRect(x,y,width,height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,width,height);
    ctx.fill();
}

function init() {
    snake = { xpos:10, xvel:0, yvel:0, ypos:10, trail:[], tail: 5 };
    tile = { size:20, count:40 };
    apple = { x: 15, y: 15 };
}
function update() {
    snake.xpos += snake.xvel;
    snake.ypos += snake.yvel;

    if ( snake.xpos < 0 ) {
        snake.xpos = tile.count - 1;
    }
    if ( snake.xpos > tile.count-1 ) {
        snake.xpos = 0;
    }
    if ( snake.ypos < 0 ) {
        snake.ypos = tile.count - 1;
    }
    if ( snake.ypos > tile.count-1 ) {
        snake.ypos = 0;
    }

    for ( let i = 0; i < snake.trail.length; i++ ) {
        if ( snake.trail[i].x == snake.xpos && snake.trail[i].y == snake.ypos ) {
            snake.tail = 5;
        }
    }

    snake.trail.push({ x:snake.xpos, y:snake.ypos });
    while ( snake.trail.length > snake.tail ) {
        snake.trail.shift();
    }
    if ( apple.x == snake.xpos && apple.y == snake.ypos ) {
        snake.tail++;
        apple.x = Math.floor(Math.random() * tile.count );
        apple.y = Math.floor(Math.random() * tile.count );
    }
}
function render() {
    drawRect(0,0,cnv.width,cnv.height,"#000");
    for ( let i = 0; i < snake.trail.length; i++ ) {
        drawRect(snake.trail[i].x*tile.size,snake.trail[i].y*tile.size,tile.size-2,tile.size-2,"#32CD32");
    }
    drawRect(apple.x*tile.size,apple.y*tile.size,tile.size-2,tile.size-2,"#ff0000");
}
function keyPressed(event) {
    switch(event.keyCode) {
        case 37: // left
            snake.xvel=-1;snake.yvel=0;
            break;
        case 38: // up
            snake.xvel=0;snake.yvel=-1;
            break;
        case 39: // right
            snake.xvel=1;snake.yvel=0;
            break;
        case 40: // down
            snake.xvel=0;snake.yvel=1;
            break;
    }
}
