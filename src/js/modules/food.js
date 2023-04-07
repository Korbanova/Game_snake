import {NumberUtils} from "../utils/number-utils.js";

export class Food {

    foodPosition = {
        x: 1,
        y: 1
    }
    context = null;
    positionCount = null;
    positionSize = null;
    foodRadius = null;

    constructor(context, positionCount, positionSize) {
        this.context = context;
        this.positionCount = positionCount;
        this.positionSize = positionSize;

        this.foodRadius = this.positionSize / 2;
    }

    setNewFoodPosition() {
        this.foodPosition = {
            x: NumberUtils.getRandomInt(1, this.positionCount),
            y: NumberUtils.getRandomInt(1, this.positionCount)
        }
    }

    showFood() {
        this.context.fillStyle = 'white';
        this.context.beginPath();
        this.context.arc(this.foodPosition.x * this.positionSize - this.foodRadius,
            this.foodPosition.y * this.positionSize - this.foodRadius, this.foodRadius, 0, 2 * Math.PI);
        this.context.fill();
    }

}