// player.js
import { compass, DIRECTION } from "./compass";


export class Player {
    constructor(id, ship, WIDHT, HEIGHT) {
        // constants
        this.id = id; // socket id
        this.WORLD_WIDTH = WIDHT;
        this.WORLD_HEIGHT = HEIGHT;

        this.name = ship.name;
        this.race = ship.race;
        this.value = ship.value;
        this.mass = ship.mass;
        this.max_crew = ship.max_crew || ship.crew;             // some ships have not full crew
        this.max_battery = ship.max_battery || ship.battery;    // the same about battery
        this.batt_reg = ship.batt_reg;
        // original game property used 24 FPS, 320x240 resolution and own parameters like WORLD UNIT == 1/4 PIXEL
        // so I have to adapt parameters with "/4"
        // "/6" is .. my attempt to level the speed. requires fine-tuning. Something wrong in my formula of speed.
        this.max_speed = ship.max_speed / 4 / 6;
        this.acceleration = ship.acceleration / 4;
        this.turn_rate = ship.turn_rate;

        // change duiring battle
        this.crew = ship.crew;
        this.battery = ship.battery;
        this.speedX = 0;
        this.speedY = 0;
        this.stepDirection = 0; // step to change direction
        this.isDirectionDelay = false;

        // default position and direction
        this.direction = "N";
        this.x = 0;
        this.y = 0;

        // update
        this.action = new Set();
    };

    /**Add action like "left", "rigth", "fire" etc.
     * Will be execute on next tick.
     * @param { String } action 
    */
    addAction(action) {
        this.action.add(action);
    };

    _left() {
        // if delay - nothing doing
        if (this.isDirectionDelay)
            return;
        // start delay time
        this.isDirectionDelay = true;

        // change direction
        let index = DIRECTION.indexOf(this.direction);
        --index;
        if (index >= 0)
            this.direction = DIRECTION[index];
        else
            this.direction = DIRECTION[DIRECTION.length - 1];
    };

    _right() {
        // if delay - nothing doing
        if (this.isDirectionDelay)
            return;
        // start delay time
        this.isDirectionDelay = true;

        // change direction
        let index = DIRECTION.indexOf(this.direction);
        ++index;
        if (index != DIRECTION.length - 1)
            this.direction = DIRECTION[index];
        else
            this.direction = DIRECTION[0];
    };

    _accelerate() {
        // calculate new speed
        this.speedX += (this.acceleration * compass[this.direction].x);
        this.speedY += (this.acceleration * compass[this.direction].y) * -1; // -1 because start point is up-left corner

        // chack max speed
        if (this.speedX > this.max_speed)
            this.speedX = this.max_speed;
        else if (this.speedX < this.max_speed * -1)
            this.speedX = this.max_speed * -1;

        if (this.speedY > this.max_speed)
            this.speedY = this.max_speed;
        else if (this.speedY < this.max_speed * -1)
            this.speedY = this.max_speed * -1;
    };

    _fire() { };

    _special() { };


    update() {
        // execute all users actions on this frame
        for (const action of this.action) {
            switch (action) {
                case "left":
                    this._left();
                    break;
                case "right":
                    this._right();
                    break;
                case "accelerate":
                    this._accelerate();
                    break;
                case "fire":
                    this._fire();
                    break;
                case "special":
                    this._special();
                    break;
            }
        };
        // clear all and wait another actions which will be execute on next frame
        this.action.clear();

        // recalculation position
        this.x += this.speedX;
        this.y += this.speedY;

        // if a player goes abroad then we change the position to the opposite
        if (this.x < 0)
            this.x = this.WORLD_WIDTH;
        else if (this.x > this.WORLD_WIDTH)
            this.x = 0;

        if (this.y < 0)
            this.y = this.WORLD_HEIGHT;
        else if (this.y > this.WORLD_HEIGHT)
            this.y = 0;

        // calc rotate delay
        if (this.isDirectionDelay) {
            this.stepDirection += this.turn_rate;
            // check if delay time end
            if (this.stepDirection >= 1) {
                this.isDirectionDelay = false;
                this.stepDirection = 0;
            };
        };
    };
};

