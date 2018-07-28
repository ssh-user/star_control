// settings background.js

// cache
let container;

/**
 * Create the settings background and place it to root container.
 * @param { PIXI } PIXI framework
 * @param { PIXI.Container } root main container of game
 * @param { Number } windowHeight heigh of game canvas
 * @param { Number } windowWidth width of game canvas
 */
function draw(PIXI, root, windowHeight, windowWidth) {
    // container for scene
    container = new PIXI.Container();

    // background image
    let backgroundImage = new PIXI.Sprite(PIXI.loader.resources["settings-background"].texture);
    backgroundImage.width = windowWidth;
    backgroundImage.height = windowHeight;
    container.addChild(backgroundImage);
    // right menu
    let menu = new PIXI.Sprite(PIXI.loader.resources["settings-background-element"].texture);
    menu.width = 65;
    menu.height = 240;
    menu.x = 255; // move to right
    container.addChild(menu);

    // add scene to root container
    root.addChild(container);
};

function clear() {
    for (const elem of container.children) {
        elem.destroy();
    };
    container.parent.removeChild(container);
};

export {
    draw,
    clear
};