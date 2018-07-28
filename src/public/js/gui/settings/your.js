// settings your.js

// cache
let container;

/**
 * Create the settings scene and place it to root container.
 * @param { PIXI } PIXI framework
 * @param { PIXI.Container } root main container of game
 * @param { Number } wHeight heigh of game canvas
 * @param { Number } wWidth width of game canvas
 * @param { Array<String> } list list of melee ships
 */
function draw(PIXI, root, wHeight, wWidth, list) {
    // container for scene
    container = new PIXI.Container();

    for (let index = 0, x = 3; index < list.length; index++ , x += 2) {
        // container for element
        let subContainer = _createElement(list[index]);

        // set position
        if (index == 6) x = 3; // reset
        if (index < 6) {
            subContainer.position.y = 20;
            subContainer.position.x = 40 * index + x;
        } else {
            subContainer.position.x = 40 * (index - 6) + x;
            subContainer.position.y = 62;
        };

        // add to root
        container.addChild(subContainer);
    };

    // add scene to root container
    root.addChild(container);
};

/**
 * Update data in menu scene.
 * @param { Number } active menu element
 */
function update(active) {
    for (const [index, subContainer] of container.children.entries()) {
        if (index == active) {
            subContainer.children[0].active();
        } else {
            subContainer.children[0].inactive();
        };
    };
};

/**
 * @param { Number } active number of element to change
 * @param { Object } ship change to this ship
 */
function changeShip(active, title) {
    for (let sprite of container.children[active].children) {
        sprite.changeShip(title);
    };
};

function clear() {
    // remove menu elements
    for (let subContainer of container.children) {
        for (let elem of subContainer.children) {
            if (elem.destroy)
                elem.destroy();
        };
    };

    container.parent.removeChild(container);
};


export {
    draw,
    clear,
    update,
    changeShip
};



function _createElement(title) {
    let subContainer = new PIXI.Container();

    let background = new BackgroundSprite(title);
    subContainer.addChild(background);

    let sprite = new IconSprite(title);
    sprite.x = (subContainer.width - sprite.width) / 2;
    sprite.y = (subContainer.height - sprite.height) / 2;
    subContainer.addChild(sprite);

    return subContainer;
};


class BackgroundSprite extends PIXI.Sprite {
    constructor(title) {
        super();
        if (title != "empty")
            this.texture = PIXI.loader.resources[`background-melee-icons`].texture;
        else
            this.texture = PIXI.loader.resources[`empty-melee-icons`].texture;

        this.__name = title;
    };

    active() {
        if (this.__name != "empty")
            this.texture = PIXI.loader.resources[`background-active-melee-icons`].texture;
        else
            this.texture = PIXI.loader.resources[`empty-active-melee-icons`].texture;

    };

    inactive() {
        if (this.__name != "empty")
            this.texture = PIXI.loader.resources[`background-melee-icons`].texture;
        else
            this.texture = PIXI.loader.resources[`empty-melee-icons`].texture;
    };

    changeShip(title) {
        this.__name = title;
        if (this.__name != "empty") {
            this.texture = PIXI.loader.resources[`background-active-melee-icons`].texture;
        } else {
            this.texture = PIXI.loader.resources[`empty-active-melee-icons`].texture;
        };
    };
};

class IconSprite extends PIXI.Sprite {
    constructor(title) {
        super();
        if (title != "empty")
            this.texture = PIXI.loader.resources[`${title}-melee-icons`].texture;
        else {
            this.texture = PIXI.loader.resources[`empty-melee-icons`].texture;
            this.visible = false;
        };

        this.__name = title;
    };

    changeShip(title) {
        this.__name = title;
        if (this.__name != "empty") {
            this.texture = PIXI.loader.resources[`${title}-melee-icons`].texture;
            this.visible = true;
        } else {
            this.texture = PIXI.loader.resources[`empty-melee-icons`].texture;
            this.visible = false;
        };

        this.__setPosition();
    };

    __setPosition() {
        this.position.x = (this.parent.width - this.width) / 2;
        this.position.y = (this.parent.height - this.height) / 2;
    };
};