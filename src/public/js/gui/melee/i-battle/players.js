// players.js
// container for Player

import { Player } from "./player";

export class Players extends PIXI.Container {
    constructor(players, size) {
        super();

        // create players
        for (let player of players) {
            let ship = new Player(player, size);
            this.addChild(ship);
        };
    };

    update(players, size) {
        // update each player
        for (let [index, player] of this.children.entries()) {
            player.update(players[index], size);
        };
    };

    destroy() {
        // clear all and destroy container
        for (let index = this.children.length - 1; index >= 0; --index) {
            this.children[index].destroy();
        };
        this.destroy();
    };
};