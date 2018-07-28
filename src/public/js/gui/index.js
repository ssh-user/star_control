// import variables after init app.
import { PIXI, renderer, root, loopControl } from "./initScene/init";

import * as loader from "./initScene/loader";
import { menu } from "./menuScene/index";

import * as settingsMain from "./settings/main";
import * as settingsBackground from "./settings/backgraund";
import * as settingsYour from "./settings/your";
import * as settingsEnemy from "./settings/enemy";
import * as shipsIcon from "./settings/shipsIcon";
import * as shipsList from "./settings/shipsList";

import { melee } from "./melee/index";



export const GUI = {
    // very important field. control on which scene bind users keypress.
    scene: "",

    // initialization canvas and start game loop.
    init() {
        loopControl.start();
    },

    // global loader scene.
    loader: loader,

    // global menu scene.
    menu: {
        main: {
            _isDraw: false,
            /**
             * Create the menu scene and draw it.
             * @param { {list: Array, active: Number} } data 
             */
            draw(data) {
                this._isDraw = true;
                menu.main.draw(data.list, data.active);
            },
            /**
            * Update data in menu scene
            * @param { Number } active menu element
            */
            update(active) {
                menu.main.move(active);
            },
            show() {
                menu.main.show();
            },
            // pause
            hide() {
                menu.main.hide();
            },
            // Stop show menu scene.
            clear() {
                if (this._isDraw) {
                    this._isDraw = false;
                    menu.main.clear();
                };
            }
        },
        join_server: {
            _isDraw: false,
            draw(data) {
                this._isDraw = true;
                menu.join.draw(data.list, data.active);
            },
            update(active) {
                menu.join.move(active);
            },
            pause() {
                menu.join.hide();
            },
            resume(data) {
                menu.join.show(data.list, data.active);
            },
            clear() {
                if (this._isDraw) {
                    this._isDraw = false;
                    menu.join.clear();
                };
            }
        },
        create_server: {
            _isDraw: false,
            // Draw cr_server scene
            draw(data) {
                this._isDraw = true;
                menu.create.draw(PIXI, root, renderer.height, renderer.width, data.list, data.active);
            },
            // update scene
            update(activ) {
                menu.create.update(activ);
            },
            resume() {
                menu.create.resume();
            },
            pause() {
                menu.create.pause();
            },
            // Stop show cr_server scene
            clear() {
                if (this._isDraw) {
                    this._isDraw = false;
                    menu.create.clear();
                };
            }
        },
        credits: {
            _isDraw: false,
            /**
             * Draw Credits scene
             * @param { String[] } text 
             */
            draw(text) {
                this._isDraw = true;
                menu.credits.draw(PIXI, root, renderer.height, renderer.width, text);
            },
            pause() {
                menu.credits.pause();
            },
            resume() {
                menu.credits.resume();
            },
            // Stop show credits scene
            clear() {
                if (this._isDraw) {
                    this._isDraw = false;
                    menu.credits.clear();
                };
            }
        },
        wait: {
            _isDraw: false,
            draw() {
                this._isDraw = true;
                menu.wait.draw(PIXI, root, renderer.height, renderer.width);
            },
            pause() {
                menu.wait.pause();
            },
            resume() {
                menu.wait.resume();
            },
            clear() {
                if (this._isDraw) {
                    this._isDraw = false;
                    menu.wait.clear();
                };
            }
        }
    },


    // *********** SETTINGS ***********
    settings: {
        background: {
            _isDraw: false,
            // Draw scene
            draw() {
                this._isDraw = true;
                settingsBackground.draw(PIXI, root, renderer.height, renderer.width);
            },
            // clear scene
            clear() {
                if (this._isDraw) {
                    this._isDraw = false;
                    settingsBackground.clear();
                };
            }
        },
        main: {
            _isDraw: false,
            // Draw scene
            draw(elements, active) {
                this._isDraw = true;
                settingsMain.draw(PIXI, root, renderer.height, renderer.width, elements, active);
            },
            // update scene
            update(active) {
                settingsMain.update(active);
            },
            resume() {
                settingsMain.resume();
            },
            pause() {
                settingsMain.pause();
            },
            // Stop scene
            clear() {
                if (this._isDraw) {
                    this._isDraw = false;
                    settingsMain.clear();
                };
            }
        },
        yourArmy: {
            _isDraw: false,
            // Draw scene
            draw(army) {
                this._isDraw = true;
                settingsYour.draw(PIXI, root, renderer.height, renderer.width, army);
            },
            // update scene
            update(active) {
                settingsYour.update(active);
            },
            // Stop scene
            clear() {
                if (this._isDraw) {
                    this._isDraw = false;
                    settingsYour.clear();
                };
            },
            // change ship in your army
            rewrite(active, title) {
                settingsYour.changeShip(active, title);
            }
        },
        enemyArmy: {
            _isDraw: false,
            // Draw scene
            draw(army) {
                this._isDraw = true;
                settingsEnemy.draw(PIXI, root, renderer.height, renderer.width, army);
            },
            // update scene
            update(active) {
                settingsEnemy.update(active);
            },
            // Stop scene
            clear() {
                if (this._isDraw) {
                    this._isDraw = false;
                    settingsEnemy.clear();
                };
            },
            // change ship in enemy army
            rewrite(active, title) {
                settingsEnemy.changeShip(active, title);
            }
        },
        shipsIcon: {
            _isDraw: false,
            // Draw scene
            draw(info) {
                this._isDraw = true;
                shipsIcon.draw(PIXI, root, renderer.height, renderer.width, info);
            },
            // update scene
            update(info) {
                shipsIcon.update(info);
            },
            // Stop scene
            clear() {
                if (this._isDraw) {
                    this._isDraw = false;
                    shipsIcon.clear();
                };
            },
            resume() {
                shipsIcon.resume();
            },
            pause() {
                shipsIcon.pause();
            }
        },
        shipsList: {
            _isDraw: false,
            // Draw scene
            draw(list, name) {
                this._isDraw = true;
                shipsList.draw(PIXI, root, renderer.height, renderer.width, list, name);
            },
            // update scene
            update(title) {
                shipsList.update(title);
            },
            // Stop scene
            clear() {
                if (this._isDraw) {
                    this._isDraw = false;
                    shipsList.clear();
                };
            },
            resume() {
                shipsList.resume();
            },
            pause() {
                shipsList.pause();
            }
        }
    },


    // *********** BATTLE ***********
    melee: {
        battle: {
            /**Create the battle scene and draw it.
             * @param { Object } data */
            draw(data) {
                melee.battle.draw(data.players, data.stars, data.size);
            },
            /** Update data in battle scene
            * @param { Object } data */
            update(data) {
                melee.battle.update(data.players, data.stars, data.size);
            },
            // Remove battle scene.
            clear() {
                melee.battle.clear();
            }
        }
    }
};
