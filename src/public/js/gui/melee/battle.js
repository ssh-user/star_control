// battle.js
import { PIXI, WIDTH, HEIGHT, root } from "../initScene/init";

import { Players } from "./i-battle/players";
import { Stars } from "./i-battle/stars";

let container = new PIXI.Container();
let playersContainer = null;
let starsContainer = null;


/**Create the battle scene
 * @param { Array<Object> } players array of players */
function draw(players, stars, size) {
    // add players to view
    playersContainer = new Players(players, size);
    // add stars to view
    starsContainer = new Stars(stars);

    container.addChild(starsContainer);
    container.addChild(playersContainer);

    // add scene to root container
    root.addChild(container);
};

/**Change position of world elements.
 * @param { Array<Object> } players menu element */
function update(players, stars, size) {
    playersContainer.update(players, size);
    starsContainer.update(stars);
};


/** destroy container */
function clear() {
    // clear all and destroy container
    for (let index = container.children.length - 1; index >= 0; --index) {
        container.children[index].destroy();
    };

    root.removeChild(container);
};


export {
    draw,
    update,
    clear
};
