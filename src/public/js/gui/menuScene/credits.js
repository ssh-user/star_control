// menu credits.js

// cache
let container, interval, timer, defaultHeight;
let cacheArray = [];

/**
 * Create the credits scene and place it to root container.
 * @param { PIXI } PIXI framework
 * @param { PIXI.Container } root main container of game
 * @param { Number } wHeight heigh of game canvas
 * @param { Number } wWidth width of game canvas
 * @param { String[] } textArr array of strings with text
 */
function draw(PIXI, root, wHeight, wWidth, textArr) {
    // cache
    defaultHeight = wHeight;
    // container for progress bar scene
    container = new PIXI.Container();

    // add background to scene
    let background = new PIXI.Sprite(PIXI.loader.resources["credits-img"].texture);
    background.width = wWidth;
    background.height = wHeight;
    container.addChild(background);

    // create text
    for (const text of textArr) {
        let elem = new PIXI.Text(
            text,
            {
                fontFamily: "Arial",
                fontSize: 12,
                fill: "white",
                fontVariant: "small-caps",
                fontWeight: "bold"
            }
        );
        // set position
        elem.y = wHeight;
        elem.x = (wWidth - elem.width) / 2;
        // add to cache
        cacheArray.push(elem);
        // add to container
        container.addChild(elem);

        wHeight += 20;
    };

    _intervalStart();

    // add to root container. On next tick it will be draw
    root.addChild(container);
};

// destroy container with loader scene
function pause() {
    clearInterval(interval);
    container.visible = false;

    // set default value
    let y = defaultHeight;
    for (let elem of cacheArray) {
        elem.y = y;
        y += 20;
    };
};

function resume() {
    container.visible = true;
    _intervalStart();
};

function clear(params) {
    // remove menu elements
    for (const elem of container.children) {
        if (elem.destroy)
            elem.destroy();
    };

    container.parent.removeChild(container);
};

export {
    draw,
    resume,
    pause,
    clear
};



function _intervalStart() {
    interval = setInterval(() => {
        for (let elem of cacheArray) {
            elem.y -= 1;
        };

        ++timer;
    }, 40);
};