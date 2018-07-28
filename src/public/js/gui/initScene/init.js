// init.js 
import * as PIXI from "pixi.js";
import * as Smoothie from "pixi-smoothie";

// init viewport
const _HEIGHT = 240; //document.documentElement.clientHeight;
const _WIDTH = 320; //document.documentElement.clientWidth;

//Create the renderer
const renderer = PIXI.autoDetectRenderer(_WIDTH, _HEIGHT);

// for export
const HEIGHT = renderer.height;
const WIDTH = renderer.width;

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

// create main container
const root = new PIXI.Container();
const loop = new Smoothie.default({
    engine: PIXI,
    renderer: renderer,
    root: root,
    fps: 24,
    update: gameLoop
});

// array to contain elements to update each frame.
let gameLoopArray = [];

// update elements every tick (every frame of FPS).
function gameLoop() {
    for (let elem of gameLoopArray) {
        elem.update();
    };
};

// control of game loop.
const loopControl = {
    setFPS(fps) {
        loop.fps = fps;
    },
    start() {
        loop.start();
    },
    pause() {
        loop.pause();
    },
    resume() {
        loop.resume();
    }
};


export {
    PIXI,
    WIDTH,
    HEIGHT,
    root,
    loopControl,

    renderer, // DEBUG - remove
};