// create.js

// cache
let container, cacheTextelem = [];

/**
 * Create the server scene and place it to root container.
 * @param { Array<String> } elements elements menu
 * @param { Number } active active element
 */
function draw(PIXI, root, wHeight, wWidth, elements, active) {
    // container for progress bar scene
    container = new PIXI.Container();

    // add background to scene
    let background = new PIXI.Sprite(PIXI.loader.resources["credits-img"].texture);
    background.width = wWidth;
    background.height = wHeight;
    container.addChild(background);

    // iterate income data and create element on each
    for (let i = 0, x = 0; i < elements.length; ++i, ++x) {
        if (i == active)
            _createMenuElement(elements[i], true, 20, 50 + 30 * x);
        else
            _createMenuElement(elements[i], false, 20, 50 + 30 * x);
    };

    // add to global
    root.addChild(container);
};

/**
 * Update data in server scene.
 * @param { Number } active menu element
 */
function update(active) {
    for (let index = 0; index < cacheTextelem.length; index++) {
        if (index == active) {
            cacheTextelem[index].style.fill = "yellow";
        } else {
            cacheTextelem[index].style.fill = "black";
        };
    };
};

function pause() {
    container.visible = false;
};

function resume() {
    container.visible = true;
};

function clear() {
    // remove menu elements
    for (const elem of cacheTextelem) {
        if (elem.destroy)
            elem.destroy();
    };

    for (const elem of container.children) {
        if (elem.destroy)
            elem.destroy();
    };

    container.parent.removeChild(container);
};

export {
    draw,
    update,
    pause,
    resume,
    clear
};


function _createMenuElement(title, active, x = 0, y = 0) {
    let sprite = new PIXI.Sprite(PIXI.loader.resources["menu-elem"].texture);
    let text = new PIXI.Text(title, {
        fontSize: 12,
        fontStyle: "italic",
        fontVariant: "small-caps",
        fontWeight: "bold"
    });

    let cont = new PIXI.Container();

    if (active)
        text.style.fill = "yellow";
    else
        text.style.fill = "black";

    sprite.width = 150;
    sprite.height = 25;
    text.x = (sprite.width - text.width) / 2;
    text.y = (sprite.height - text.height) / 3;
    cont.x = x;
    cont.y = y;

    cont.addChild(sprite);
    cont.addChild(text);

    // to comfort change in future
    cacheTextelem.push(text);

    container.addChild(cont);
};