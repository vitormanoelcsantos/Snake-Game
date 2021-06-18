let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let button = document.querySelector('.play-btn');
let score = document.querySelector('.score');
let title = document.querySelector('.title');
let rankingButton = document.querySelector('.ranking-btn');
let gameOver = document.querySelector('.gm');
let game = document.querySelector('.game');
let point = document.querySelector('.point');
let ranking = document.querySelector('.ranking');
let send = document.querySelector('.send');
let nickName = document.querySelector('.nickname');
let sendButton = document.querySelector('.send-btn');
let pontuation = document.querySelector('.ypoint');

let snake = [];
snake[0] = { x: 8 * box, y: 8 * box }

let direction = "right";

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function createBackground() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function theGame() {
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            score.style.display = 'none';
            game.style.display = 'none';
            gameOver.style.display = 'flex';
            pontuation.innerHTML = point.innerHTML;
        }
    }

    createBackground();
    createSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") {
        snakeX += box;
    }
    if (direction == "left") {
        snakeX -= box;
    }
    if (direction == "up") {
        snakeY -= box;
    }
    if (direction == "down") {
        snakeY += box;
    }

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        point.innerHTML++;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}

createBackground();

score.style.display = 'none';
gameOver.style.display = 'none';
ranking.style.display = 'none';
send.style.display = 'none';

function startTheGame() {
    setInterval(theGame, 100);
    score.style.display = 'flex';
    button.style.display = 'none';
    title.style.display = 'none';
    ranking.style.display = 'none';
    rankingButton.style.display = 'none';
}

function restart() {
    window.location.reload('.index/html');
}

function showRanking() {
    if (ranking.style.display == 'none') {
        ranking.style.display = 'flex';
    }
    else {
        ranking.style.display = 'none';
    }
}

function showSubmit() {
    send.style.display = 'flex';
}

function postRanking() {
    send.addEventListener('submit', (e) => {

        e.preventDefault();

        fetch("https://api-rpg-game.herokuapp.com/tempscore", {
            method: 'POST',
            body: JSON.stringify({
                nick: nickName.value,
                score: pontuation.innerHTML
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            redirect: 'follow'
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
        })

        restart();
    })
}