const Game = require("game");
const ws = require("./websocket");
import * as db from "./database";
import { compass, DIRECTION } from "./data/compass";
import { WIDHT, HEIGHT } from "./data/world";
import { Star } from "./data/star";

export class Battle extends Game {
    constructor(players) {
        super({
            framesPerSecond: 24, // DEBUG изменить на 24 фрейма в секунду
            // maxFrameSkip: 0,
            waitTime: 0
        });

        // constants. World Size
        this.WIDTH = WIDHT;
        this.HEIGHT = HEIGHT;

        // add players to battle scene
        this.players = players;

        // add stars
        this.stars = [];
        let blueBright = generateRandom(6, 10);
        let blue = generateRandom(8, 20);
        let white = generateRandom(10, 30);

        for (let index = 0; index < blueBright; index++) {
            this.stars.push(new Star("star-blue-bright", this.WIDTH, this.HEIGHT, 0.4))
        };

        for (let index = 0; index < blue; index++) {
            this.stars.push(new Star("star-blue", this.WIDTH, this.HEIGHT, 0.1))
        };

        for (let index = 0; index < white; index++) {
            this.stars.push(new Star("star-white", this.WIDTH, this.HEIGHT, 0.05))
        };
    };

    battle_start() {
        this.on("start", () => {
            // init players in game. Set random position and direction
            for (let player of this.players) {
                // generate random direction
                player.direction = Object.keys(compass)[Math.floor(Math.random() * Object.keys(compass).length)];

                // generate random position
                player.x = generateRandom(0, this.WIDTH);
                player.y = generateRandom(0, this.HEIGHT);
            };

            // generate world. Set stars positions
            for (const star of this.stars) {
                // generate random position
                star.x = generateRandom(0, this.WIDTH);
                star.y = generateRandom(0, this.HEIGHT);
            };

            // send users data to write scene
            let socket1 = db.getSocket(this.players[0].id);
            let socket2 = db.getSocket(this.players[1].id);
            let scene = this._createSceneData();

            ws.battle.start(socket1, socket2, scene);
        });

        this.on("update", () => { // call every frame            
            // update players
            for (let player of this.players) {
                player.update();
            };

            let speedX = this.players[0].speedX + this.players[1].speedX;
            let speedY = this.players[0].speedY + this.players[1].speedY;

            // update world
            for (const star of this.stars) {
                star.updatePosition(speedX, speedY);
            };

            // check crew at players
            if (this.players[0].crew < 1 || this.players[1].crew < 1) {
                // battle end
                this.stop();
                // ws.batte.end()
            } else {
                // send updated info to users
                let socket1 = db.getSocket(this.players[0].id);
                let socket2 = db.getSocket(this.players[1].id);
                let scene = this._createSceneData();

                ws.battle.update(socket1, socket2, scene);
            };
        });

        this.on("stop", () => {
            // player1,2.battle = false
        });

        this.start();
    };

    _createSceneData() {
        // create short information about players to show users scene
        let player1 = {
            name: this.players[0].name,
            race: this.players[0].race,
            crew: this.players[0].crew,
            battery: this.players[0].battery,
            direction: DIRECTION.indexOf(this.players[0].direction), // get index of direction
            x: this.players[0].x,
            y: this.players[0].y
        };

        let player2 = {
            name: this.players[1].name,
            race: this.players[1].race,
            crew: this.players[1].crew,
            battery: this.players[1].battery,
            direction: DIRECTION.indexOf(this.players[1].direction), // get index of direction
            x: this.players[1].x,
            y: this.players[1].y
        };

        // DEBUG тут должен быть расчет расстояния друг до друга и указания размеров кораблей, звезд и т.д.
        let size = "sml";


        return {
            players: [player1, player2],
            stars: this.stars,
            size: size
        };
    };
};



function generateRandom(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}