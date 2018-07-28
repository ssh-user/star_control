// settings shipsList.js

// cache
let container, shipsArray, textsArray = [];

/**
 * Create the settings scene and place it to root container.
 * @param { PIXI } PIXI framework
 * @param { PIXI.Container } root main container of game
 * @param { Number } wHeight heigh of game canvas
 * @param { Number } wWidth width of game canvas
 * @param { Array<{ race: String, name: String, crew: Number, battery: Number, power: Number}> } list array of ships
 * @param { String } name name of active ship
 */
function draw(PIXI, root, wHeight, wWidth, list, name) {
    // container for scene
    container = new PIXI.Container();

    // cache array
    shipsArray = list;

    // create 7 text elements which will be shown users
    for (let index = 0, y = 0; index < 8; ++index, y += 25) {
        let text = new PIXI.Text(
            "",
            { fontFamily: "Arial", fontSize: 9, fill: "black" }
        );

        text.position.y = y;

        textsArray.push(text);
        container.addChild(text);
    };

    let index = indexOf(shipsArray, name);
    let arrRange = getRange(index);

    renameTextElements(arrRange, name);

    // coordinates
    container.position.x = 260;
    container.position.y = 60;

    // add scene to root container
    root.addChild(container);
};

/**
 * Update data
 * @param { String } name name of active ship
 */
function update(name) {
    if (name == "empty")
        name = shipsArray[0].name;

    let index = indexOf(shipsArray, name);
    let arrRange = getRange(index);

    renameTextElements(arrRange, name);
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


// helper func

/**
 * get index of element name field
 * @param { Array<{ race: String, name: String, crew: Number, battery: Number, power: Number}> } arr 
 * @param { String } name 
 * @returns number
 */
function indexOf(arr, name) {
    let value = null;
    for (let index = 0; index < arr.length; index++) {
        if (arr[index].name == name) {
            value = index;
            break;
        };
    };

    return value;
};


function getRange(index) {
    index = Math.floor(index / 7);

    let arr = [];
    let ind = index * 7; // start
    let end = (index + 1) * 7; // end
    // get range
    for (ind; ind < end; ind++) {
        arr.push(ind);
    };

    return arr;
};


function renameTextElements(arrRange, name) {
    for (const [i, index] of arrRange.entries()) {
        let elem = shipsArray[index];
        if (elem) {
            if (elem.name == name) {
                textsArray[i].text = `${elem.race}   ${elem.power}\n${elem.name}`;
                textsArray[i].style.fill = 0xffff00;
            } else {
                textsArray[i].text = `${elem.race}   ${elem.power}\n${elem.name}`;
                textsArray[i].style.fill = 0x000000;
            };
        };
    };
};