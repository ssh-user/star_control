// main.js
import { PIXI, WIDTH, HEIGHT, root } from "../initScene/init";

import { Background } from "./i-main/Background";
import { MenuElement } from "./i-main/MenuElement";


let _isDraw = false;
let container = new PIXI.Container();


/**
 * Create the menu scene
 * @param { Array<String> } elements menu elements 
 * @param { Number } active active element
 */
function draw(elements, active = 0) {
    if (_isDraw)
        return update(active);

    _isDraw = true;

    let background = new Background(WIDTH, HEIGHT);
    container.addChild(background);

    for (let i = 0; i < elements.length; ++i) {
        if (i == active) {
            let element = new MenuElement(elements[i]);
            element.active();
            element.position.x = 20;
            element.position.y = 120 + 30 * i;
            container.addChild(element);
        } else {
            let element = new MenuElement(elements[i]);
            element.position.x = 20;
            element.position.y = 120 + 30 * i;
            container.addChild(element);
        };
    };

    // add scene to root container
    root.addChild(container);
};

/**
 * Move by elements menu.
 * @param { Number } active menu element
 */
function move(active) {
    // because first element of CONTAINER is Background image
    active++;

    for (const [index, elem] of container.children.entries()) {
        if (index == active) {
            if (elem.active)
                elem.active();
        } else {
            if (elem.inActive)
                elem.inActive();
        };
    };
};

/** Hide scene. */
function hide() {
    container.visible = false;
};

/** Show scene again. */
function show() {
    container.visible = true;
};

/** destroy container with menu main scene*/
function clear() {
    for (const elem of container.children) {
        elem.destroy();
    };

    root.removeChild(container);
};


export {
    draw,
    move,
    hide,
    show,
    clear
};
