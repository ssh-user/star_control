import * as PIXI from "pixi.js";

export const SOUND = {
    sounds: {
        playCursorMove() {
            PIXI.loader.resources["move"].sound.play();
        },
        playEnter() {
            PIXI.loader.resources["enter"].sound.play()
        },
        playSpace() {
            PIXI.loader.resources["space"].sound.play()
        },
        playAlert() {
            PIXI.loader.resources["alert"].sound.play()
        }
    },
    menu: {
        playMusic() {
            PIXI.loader.resources["menu-music"].sound.play({
                loop: true,
                singleInstance: true,
                volume: 0.5
            });
        },
        stopMusic() {
            PIXI.loader.resources["menu-music"].sound.stop();
        }
    },
    credits: {
        playMusic() {
            PIXI.loader.resources["credits-music"].sound.play({
                loop: true,
                singleInstance: true,
                volume: 0.5
            });
        },
        stopMusic() {
            PIXI.loader.resources["credits-music"].sound.stop();
        }
    },
    settings: {
        playMusic() {
            PIXI.loader.resources["settings-music"].sound.play({
                loop: true,
                singleInstance: true,
                volume: 0.5
            });
        },
        stopMusic() {
            PIXI.loader.resources["settings-music"].sound.stop();
        }
    },
    battle: {}
};

