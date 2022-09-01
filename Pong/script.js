let userPaddle = document.querySelector('#user-paddle')
let compPaddle = document.querySelector('#comp-paddle')
let ball = document.querySelector('#ball')
let timer = 0;
userPaddle.style.marginLeft = '30px'
userPaddle.style.marginTop = '0px'
compPaddle.style.marginLeft = '1048px'
compPaddle.style.marginTop = '0px'
ball.style.marginLeft = '534px'
ball.style.marginTop = '262px'

let W_Pressed = false
let S_Pressed = false

let ID

let Vx = -1
let Vy = -1
let V = Math.sqrt(Math.sqrt(Math.pow(Vx,2)+Math.pow(Vy,2)))

document.addEventListener('keydown',(e)=>{
    if(e.keyCode=='87'){
        W_Pressed = true
    } else if (e.keyCode=='83'){
        S_Pressed = true
    }
})
document.addEventListener('keyup',(e)=>{
    if(e.keyCode=='87'){
        W_Pressed = false
    } else if (e.keyCode=='83'){
        S_Pressed = false
    }
})




function ballReset(){
    //clearInterval(ID)
    Vx = -1
    Vy = -1
    V = Math.sqrt(Math.sqrt(Math.pow(Vx,2)+Math.pow(Vy,2)))
    ball.style.marginLeft = '534px'
    ball.style.marginTop = '262px'
    //gameLoop()
}


 
function gameLoop(){
    
    setTimeout(()=> {
        ID = setInterval(()=>{

            if ( isGameOver() ) {
                console.log('the game should be over');
                endGame();
                return;
            }

            if(marginLeft(ball)<0){
                document.querySelector('#comp-score').innerHTML = Number(document.querySelector('#comp-score').innerHTML)+1
                ballReset()
                return
            } 
            if((marginLeft(ball)+20)>1088) {
                document.querySelector('#user-score').innerHTML = Number(document.querySelector('#user-score').innerHTML)+1
                ballReset()
                return
            } 


            if(marginTop(ball)<0 || (marginTop(ball)+20) > 544){
                Vy = -Vy
            }
            let paddle = (marginLeft(ball)+10<544) ? userPaddle : compPaddle

            if(collisionDetected(paddle)){
                let angle
                let type = (marginLeft(paddle) == 30) ? 'user' : 'comp'
                if (ball.centerY<paddle.centerY){
                    angle = (type=='user' ? -Math.PI/4 : (-3*Math.PI)/4)
                }
                else if (ball.centerY>paddle.centerY){
                    angle = (type=='user' ? Math.PI/4 : (3*Math.PI)/4)
                }
                else if (ball.centerY==paddle.centerY){
                    angle = (type=='user' ? 0 : Math.PI)
                }
                V +=0.5
                Vx = V * Math.cos(angle)
                Vy = V * Math.sin(angle)
            }
            
            let compLevel = 0.10
            compPaddle.style.marginTop = `${marginTop(compPaddle)+((ball.centerY - (marginTop(compPaddle)+ 36 ))) * compLevel}px`
            
            ball.style.marginLeft = `${marginLeft(ball)+Vx}px`
            ball.style.marginTop = `${marginTop(ball)+Vy}px`
            
            if(W_Pressed && marginTop(userPaddle)>0){
                userPaddle.style.marginTop =`${marginTop(userPaddle)-2}px`
            } else if (S_Pressed && marginTop(userPaddle)<472){
                userPaddle.style.marginTop =`${marginTop(userPaddle)+2}px`
            }
            if(marginTop(compPaddle)<0){
                compPaddle.style.marginTop = '0px'
            }
            else if(marginTop(compPaddle)>472){
                compPaddle.style.marginTop = '472px'
            }


        },5)

    },500)
}

function isGameOver() {

    let compScore = Number(document.querySelector('#comp-score').innerHTML);
    let userScore = Number(document.querySelector('#user-score').innerHTML);

    if ( compScore >= 3 || userScore >= 3 ) {
        return true;
    }
}


function collisionDetected(paddle){
    ball.top = marginTop(ball)
    ball.bottom = marginTop(ball) + 20
    ball.left = marginLeft(ball)
    ball.right = marginLeft(ball) + 20
    ball.centerX = marginLeft(ball) + 10 
    ball.centerY = marginTop(ball) + 10
    
    paddle.top = marginTop(paddle)
    paddle.bottom = marginTop(paddle) + 72
    paddle.left = marginLeft(paddle)
    paddle.right = marginLeft(paddle) + 10
    paddle.centerX = marginLeft(paddle) + 5
    paddle.centerY = marginTop(paddle) + 36
    
    return ball.left < paddle.right && ball.top < paddle.bottom && ball.right > paddle.left && ball.bottom > paddle.top
}


function marginTop(elem){
    return Number(elem.style.marginTop.split('p')[0])
}
function marginLeft(elem){
    return Number(elem.style.marginLeft.split('p')[0])
}




function startGame(){
    let startDiv = document.getElementById('start');
    let gameCanvas = document.getElementById('canvas');
    let gameContainer = document.getElementById('container');
    let gameOver = document.getElementById('game-over');
    startDiv.style.display = "none";
    gameCanvas.style.display = "block";
    gameContainer.style.display = "block";
    gameOver.style.display = "none";
    gameLoop();
}

function endGame() {

    document.querySelector('#comp-score').innerHTML = "0";
    document.querySelector('#user-score').innerHTML = "0";

    let startDiv = document.getElementById('start');
    let gameCanvas = document.getElementById('canvas');
    let gameContainer = document.getElementById('container');
    let gameOver = document.getElementById('game-over');
    startDiv.style.display = "none";
    gameCanvas.style.display = "none";
    gameContainer.style.display = "none";
    gameOver.style.display = "block";

    clearInterval(ID)
}
