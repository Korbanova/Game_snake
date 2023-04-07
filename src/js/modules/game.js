import {Snake} from "./snake.js";
import {Food} from "./food.js";

export class Game {

    context = null;
    positionCount = null;
    positionSize = null;
    snake = null;
    score = 0;
    scoreElement = null;
    interval = null;
    sizeGrid = null;

    constructor(context, settings) {
        this.context = context;
        this.positionCount = settings.positionCount;
        this.positionSize = settings.positionSize;
        this.sizeGrid = settings.positionCount * settings.positionSize;

        document.getElementById('start').onclick = () => {
            this.startGame();
        }
        this.scoreElement = document.getElementById('score');
    }

    startGame() {
        if(this.interval){
            clearInterval(this.interval);
        }
        this.food = new Food(this.context, this.positionCount, this.positionSize);
        this.snake = new Snake(this.context, this.positionCount, this.positionSize);

        this.food.setNewFoodPosition();
        this.interval = setInterval(this.gameProcess.bind(this), 100);
    }

    gameProcess() {
        this.context.clearRect(0, 0, this.sizeGrid, this.sizeGrid);

        this.showGrid();
        this.food.showFood();
        let result = this.snake.showSnake(this.food.foodPosition);
        if (result) {
            if(result.collision){
                this.endGame();
            } else if (result.gotFood) {
                this.score++;
                this.scoreElement.innerText = this.score;
                this.food.setNewFoodPosition();
            }
        }
    }
    endGame(){
        clearInterval(this.interval);

        this.context.fillStyle = 'black';
        this.context.font = 'bold 48px Arial';
        this.context.textAlign = 'center';
        this.context.fillText('Вы набрали: '+ this.score + ' очков!', this.sizeGrid/2, this.sizeGrid/2);

    }
    showGrid() {
        for (let x = 0; x <= this.sizeGrid; x += this.positionSize) {
            this.context.moveTo(0.5 + x + this.positionSize, 0);
            this.context.lineTo(0.5 + x + this.positionSize, this.sizeGrid + this.positionSize);
        }
        for (let x = 0; x <= this.sizeGrid; x += this.positionSize) {
            this.context.moveTo(0, 0.5 + x + this.positionSize);
            this.context.lineTo(this.sizeGrid + this.positionSize, 0.5 + x + this.positionSize);
        }
        this.context.strokeStyle = "black";
        this.context.stroke();
    }
}