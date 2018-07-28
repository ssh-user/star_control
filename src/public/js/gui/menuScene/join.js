// join.js 
import { PIXI, WIDTH, HEIGHT, root } from "../initScene/init";
import { Text } from "./i-join/Text";


let container = new PIXI.Container();

/**
 * Create the server scene.
 * @param { Array<{ name: string, password: string, maxUnits: number }> } elements list of waitings users.
 * @param { Number } active active element
 */
function draw(elements, active) {
    // create elements of waitings users.
    _createList(elements, active);

    // if re-draw
    container.visible = true;

    // add to global.
    root.addChild(container);
};

/**
 * Update data in server scene.
 * @param { Number } active active element.
 */
function move(active) {
    for (const [index, text] of container.children.entries()) {
        if (index == active)
            text.active();
        else
            text.inActive();
    };
};

/** Hide scene. */
function hide() {
    // have to use revers iteration, because removing element call auto clean container and indexes moving
    for (let index = container.children.length - 1; index >= 0; --index) {
        container.children[index].destroy();
    };
    container.visible = false;
};

/** Show scene again. */
function show(list, active) {
    // create texture
    _createList(list, active);

    // if it's re-draw
    container.visible = true;
};

/** destroy container with menu main scene. */
function clear() {
    // remove elements.
    for (let elem of container.children) {
        elem.destroy();
    };

    root.removeChild(container);
};

export {
    draw,
    move,
    show,
    hide,
    clear
};

/**
 * @param { Array<{ name: string, password: string, maxUnits: number }> } elements list of waitings users.
 * @param { Number } active active element.
 */
function _createList(elements, active) {
    // create list with waiting battle users.
    for (const [index, elem] of elements.entries()) {
        let text = new Text(
            `name - ${elem.name}, password - ${(elem.password) ? "yes" : "no"}, max - ${elem.maxUnits}`
        );
        text.position.x = 30;
        text.position.y = 50 + 30 * index;

        if (index == active)
            text.active();

        container.addChild(text);
    };

    // if no user at all.
    if (elements.length == 0) {
        let text = new PIXI.Text(
            `Sorry, no user wait a battle.\nCreate your server!`,
            { fontFamily: "Arial", fontSize: 14, fill: "red", align: "center" }
        );
        text.position.x = (WIDTH - text.width) / 2;
        text.position.y = (HEIGHT - text.height) / 2;

        container.addChild(text);
    };
};
