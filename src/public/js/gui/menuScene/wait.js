// wait.js

// cache
let container;

/**
 * Create the wait scene and place it to root container.
 * @param { PIXI } PIXI framework
 * @param { PIXI.Container } root main container of game
 * @param { Number } wHeight heigh of game canvas
 * @param { Number } wWidth width of game canvas
 */
function draw(PIXI, root, wHeight, wWidth) {
    // container for menu scene
    container = new PIXI.Container();

    let backgroundImage = new PIXI.Sprite(PIXI.loader.resources["credits-img"].texture);
    backgroundImage.width = wWidth;
    backgroundImage.height = wHeight;
    container.addChild(backgroundImage);

    let rect = new PIXI.Graphics();
    rect.beginFill(0xFF0000);
    rect.drawRect(0, 0, 100, 20);
    rect.endFill();
    rect.x = (wWidth - rect.width) / 2;
    rect.y = (wHeight - rect.height) / 2;

    let text = new PIXI.Text(
        'Please, wait!',
        { fontFamily: "Arial", fontSize: 16, fill: "yellow" }
    );
    text.x = (wWidth - rect.width) / 2;
    text.y = (wHeight - rect.height) / 2;

    container.addChild(rect);
    container.addChild(text);

    // add scene to root container
    root.addChild(container);
};

function pause() {
    container.visible = false;
};

function resume() {
    container.visible = true;
};

function clear() {
    // remove menu elements
    for (const elem of container.children) {
        elem.destroy();
    };

    container.parent.removeChild(container);
};

export {
    draw,
    pause,
    resume,
    clear
};