// settings shipsIcon.js

// cache
let container, sprite, text;

/**
 * Create the settings scene and place it to root container.
 * @param { PIXI } PIXI framework
 * @param { PIXI.Container } root main container of game
 * @param { Number } wHeight heigh of game canvas
 * @param { Number } wWidth width of game canvas
 * @param { { race: String, name: String, crew: Number, battery: Number, power: Number} } info info about melee ship
 */
function draw(PIXI, root, wHeight, wWidth, info) {
    // container for scene
    container = new PIXI.Container();

    // container position
    container.y = 5;
    container.x = 260;


    // create text element
    text = new PIXI.Text(
        info.race,
        { fontFamily: "Arial", fontSize: 10, fill: "black" }
    );
    // create icon image
    sprite = new PIXI.Sprite(PIXI.loader.resources[`${info.name}-icons`].texture);

    // if empty doesn't show
    if (info.name != "empty")
        text.visible = false;

    // add to container
    container.addChild(sprite);
    container.addChild(text);

    sprite.position.x = (55 - sprite.width) / 2;
    sprite.position.y = (55 - sprite.height) / 2;
    text.position.x = (55 - text.width) / 2;

    // add scene to root container
    root.addChild(container);
};

/**
 * Update data
 * @param { { race: String, name: String, crew: Number, battery: Number, power: Number} } info info about melee ship
 */
function update(info) {
    if (info.name == "empty") {
        sprite.texture = PIXI.loader.resources[`${info.name}-icons`].texture;
        text.visible = false;

        sprite.position.x = (55 - sprite.width) / 2;
        sprite.position.y = (55 - sprite.height) / 2;
        text.position.x = (55 - text.width) / 2;
    } else {
        sprite.texture = PIXI.loader.resources[`${info.name}-icons`].texture;
        text.text = info.race;
        text.visible = true;

        sprite.position.x = (55 - sprite.width) / 2;
        sprite.position.y = (55 - sprite.height) / 2;
        text.position.x = (55 - text.width) / 2;
    };
};

/**
 * full destroy 
 */
function clear() {
    // remove menu elements
    for (let elem of container.children) {
        if (elem.destroy)
            elem.destroy();
    };

    container.parent.removeChild(container);
};

function pause() {
    container.visible = false;
};

function resume() {
    container.visible = true;
};

export {
    draw,
    clear,
    update,
    pause,
    resume
};
