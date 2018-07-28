// loader.js
import { PIXI, WIDTH, HEIGHT, root } from "./init";

import { BackgroundRectangle } from "./i-loader/BackgroundRectangle";
import { FrontRectangle } from "./i-loader/FrontRectangle";
import { Text } from "./i-loader/Text";
import { Percent } from "./i-loader/Percent";


let container = new PIXI.Container();
let backRect = new BackgroundRectangle(0x66CCFF, 100, 20);
let frontRect = new FrontRectangle(0xFFFF00, 1, 20);
let text = new Text('Loading ...', "Arial", 12, "white");
let percent = new Percent("0 %", "Arial", 12, "white");


/** Create the loader scene */
function draw() {
    // add to container
    container.addChild(backRect);
    container.addChild(frontRect);
    container.addChild(text);
    container.addChild(percent);

    // set position of elements
    text.y = backRect.height + 5;   // 5px after background height end
    percent.x = backRect.width + 5; // 5px after background width end
    percent.y = 5;                  // just 5px 

    // center the container
    container.x = (WIDTH - container.width) / 2;
    container.y = (HEIGHT - container.height) / 2;

    // add scene to root container
    root.addChild(container);
};

/**
 * Update data in loader scene.
 * @param { String } str url of file which is loading
 * @param { Number } progress how many loaded
 */
function update(str, progress) {
    text.text = str;
    percent.text = progress.toFixed() + " %";
    frontRect.width = progress.toFixed();
};

/** Hide scene. */
function hide() {
    container.visible = false;
};
/** Show scene again. */
function show() {
    container.visible = true;
};

/** destroy container with loader scene*/
function clear() {
    for (const elem of container.children) {
        elem.destroy();
    };

    root.removeChild(container);
};

export {
    draw,
    update,
    hide,
    show,
    clear
};

