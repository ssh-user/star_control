// settings main.js

// cache
let container, menuElementsArray = [];

/**
 * Create the settings scene and place it to root container.
 * @param { PIXI } PIXI framework
 * @param { PIXI.Container } root main container of game
 * @param { Number } windowHeight heigh of game canvas
 * @param { Number } windowWidth width of game canvas
 * @param { Array<String> } menu elements menu
 * @param { Number } active active element
 */
function draw(PIXI, root, windowHeight, windowWidth, menu, active) {
    // container for scene
    container = new PIXI.Container();
    container.width = 55;
    container.x = 260;
    container.y = 175;

    let y = 0;
    for (const [index, elem] of menu.entries()) {
        let text = new PIXI.Text(elem, {
            fontSize: 8,
            fontVariant: "small-caps",
            fontWeight: "bold",
            fill: "white"
        });
        text.y = 10 * y;
        text.x = 5;
        if (index == active)
            text.style.fill = 0xffff00;
        ++y;
        menuElementsArray.push(text);
        container.addChild(text);
    };

    // add scene to root container
    root.addChild(container);
};

/**
 * Update data in menu scene.
 * @param { Number } active menu element
 */
function update(active) {
    for (let index = 0; index < menuElementsArray.length; index++) {
        if (index == active) {
            menuElementsArray[index].style.fill = "yellow";
        } else {
            menuElementsArray[index].style.fill = "white";
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
    for (const elem of menuElementsArray) {
        elem.destroy();
    };

    for (const elem of container.children) {
        elem.destroy();
    };

    container.parent.removeChild(container);
};


export {
    draw,
    clear,
    pause,
    resume,
    update
};