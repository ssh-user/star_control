// star.js

export class Star {
    constructor(name, WIDHT, HEIGHT, speedScale) {
        // constants
        this.name = name;
        this.WORLD_WIDTH = WIDHT;
        this.WORLD_HEIGHT = HEIGHT;
        this.speedScale = speedScale * -1; // change direction to opposide

        // variable
        this.x = null;
        this.y = null;
    };


    updatePosition(speedX, speedY) {
        this.x += speedX * this.speedScale;
        this.y += speedY * this.speedScale;

        if (this.x < 0)
            this.x = this.WORLD_WIDTH;
        else if (this.x > this.WORLD_WIDTH)
            this.x = 0;

        if (this.y < 0)
            this.y = this.WORLD_HEIGHT;
        else if (this.y > this.WORLD_HEIGHT)
            this.y = 0;
    };
};

