// index.js.  Enter point to app. (client side)

// css. need for webpack.
import '../css/main.css';

// UI messages for error and other information
import * as warning from "./user_msg";
// load game resources (images, fronts, music etc).
import { loader } from "./loader";
// GUI for draw and render game scene
import { GUI } from "./gui/index";
// SOUND for game
import { SOUND } from "./sound";
// keyboard control
import { keyboard } from "./keyboard";


// connect to server
const socket = new WebSocket('ws://localhost:3000');

socket.onopen = () => {
    loader()
        .on("start", () => {
            // start view loop
            GUI.init();
            // change scene current status
            GUI.scene = "loader";
            // draw loader scene
            GUI.loader.draw();
        })
        .on("progress", (loader, resource) => {
            // update progress bar and status of loadings file
            GUI.loader.update(resource.url, loader.progress);
        })
        .on("error", (err) => {
            warning.OnLoadError();
        })
        .load(() => {
            // last update to loader. All resources loaded successfull.
            GUI.loader.update("Complete", 100);
            // send request on menu elements
            socket.send(JSON.stringify({ scene: "menu", command: "draw_menu" }));
        })
};

socket.onclose = (event) => {
    warning.OnError(event);
};

socket.onerror = (error) => {
    warning.OnError(error);
};

// in fact, main control of game
// sort incoming message
socket.onmessage = (event) => {
    // validate incoming msg if invalid - nothing to do
    let data = validateJSON(event.data);
    if (!data) return;

    switch (data.scene) {
        /****************** MENU ********************/
        case "menu": {
            if (data.command == "draw_menu") {
                // stop showing prev scene 
                GUI.loader.clear();
                // set scene status
                GUI.scene = "menu";
                // play music
                //SOUND.menu.playMusic();
                // draw menu scene
                GUI.menu.main.draw(data.value);
            } else if (data.command == "update_menu") {
                // rerender scene
                GUI.menu.main.update(data.value);
                // play music
                SOUND.sounds.playCursorMove();
            };
        } break;

        case "credits": {
            if (data.command == "draw_credits") {
                // play sound of press key
                SOUND.sounds.playEnter();
                // stop showing prev scene 
                GUI.menu.main.hide();
                // change scene status
                GUI.scene = "credits";
                // stop menu music and play credits music
                //SOUND.menu.stopMusic();
                //SOUND.credits.playMusic();
                // draw ncredits scene                
                if (GUI.menu.credits._isDraw)
                    GUI.menu.credits.resume();
                else
                    GUI.menu.credits.draw(data.value);
            } else if (data.command == "exit_credits") {
                // play sound of press key
                SOUND.sounds.playSpace();
                // change scene status
                GUI.scene = "menu";
                // stop plaing credits music and play menu music
                //SOUND.credits.stopMusic();
                //SOUND.menu.playMusic();
                // stop showing prev scene 
                GUI.menu.credits.pause();
                // show menu scene
                GUI.menu.main.show();
            };
        } break;

        case "create_server": {
            if (data.command == "draw") {
                // play sound of press key
                SOUND.sounds.playEnter();
                // stop showing prev scene 
                GUI.menu.main.hide();
                // change scene status
                GUI.scene = "create_server";
                // draw create server scene                
                if (GUI.menu.create_server._isDraw)
                    GUI.menu.create_server.resume();
                else
                    GUI.menu.create_server.draw(data.value);
            } else if (data.command == "update") {
                // play music
                SOUND.sounds.playCursorMove();
                // rerender scene
                GUI.menu.create_server.update(data.value);
            } else if (data.command == "exit") {
                // play sound of press key
                SOUND.sounds.playSpace();
                // change scene status
                GUI.scene = "menu";
                // stop showing prev scene 
                GUI.menu.create_server.pause();
                // show menu scene
                GUI.menu.main.show();
            };
        } break;

        case "join_server": {
            if (data.command == "draw") {
                // play sound of press key
                SOUND.sounds.playEnter();
                // stop showing prev scene 
                GUI.menu.main.hide();
                // change scene status
                GUI.scene = "join_server";
                // draw create server scene                
                if (GUI.menu.join_server._isDraw)
                    GUI.menu.join_server.resume(data.value);
                else
                    GUI.menu.join_server.draw(data.value);
            } else if (data.command == "update") {
                // play music
                SOUND.sounds.playCursorMove();
                // rerender scene
                GUI.menu.join_server.update(data.value);
            } else if (data.command == "exit") {
                // play sound of press key
                SOUND.sounds.playSpace();
                // change scene status
                GUI.scene = "menu";
                // stop showing prev scene 
                GUI.menu.join_server.pause();
                // show menu scene
                GUI.menu.main.show();
            } else if (data.command == "refresh") {
                // stop showing prev scene 
                GUI.menu.join_server.pause();
                // draw create server scene                
                GUI.menu.join_server.resume(data.value);
            };
        } break;

        case "wait": {
            if (data.command == "join") {
                // play sound of press key
                // SOUND.sounds.playAlert();
                // stop showing prev scene 
                GUI.menu.create_server.pause();
                // change scene status
                GUI.scene = "wait";
                // draw waiting scene                
                if (GUI.menu.wait._isDraw)
                    GUI.menu.wait.resume();
                else
                    GUI.menu.wait.draw();
            } else if (data.command == "exit") {
                // play sound of press key
                SOUND.sounds.playSpace();
                // change scene status
                GUI.scene = "menu";
                // stop showing prev scene 
                GUI.menu.wait.pause();
                // show menu scene
                GUI.menu.main.show();
            };
        } break;


        /****************** SETTINGS ********************/
        case "settings": {
            if (data.command == "draw") {
                // full clear prev scene                
                GUI.menu.wait.clear();
                GUI.menu.join_server.clear();
                GUI.menu.main.clear();
                GUI.menu.create_server.clear();
                GUI.menu.credits.clear();

                GUI.scene = "settings";

                // SOUND.menu.stopMusic();
                // SOUND.settings.playMusic();

                // draw SETTINGS scene with different elements
                GUI.settings.background.draw();
                GUI.settings.main.draw(data.value.list, data.value.active);
                GUI.settings.yourArmy.draw(data.value.army);
                GUI.settings.enemyArmy.draw(data.value.army);
            } else if (data.command == "update") {
                // play music
                SOUND.sounds.playCursorMove();
                // re-render scene
                GUI.settings.main.update(data.value);
            };
        } break;

        case "your": {
            if (data.command == "move") { // moving cursor by your army
                SOUND.sounds.playCursorMove();
                GUI.settings.yourArmy.update(data.value.active);
                GUI.settings.shipsIcon.update(data.value.info);
                GUI.settings.shipsList.update(data.value.info.name);
            } else if (data.command == "rewrite") { // rewrite element in your army
                SOUND.sounds.playEnter();
                GUI.settings.yourArmy.rewrite(data.value.active, data.value.title);
                GUI.settings.shipsList.update(data.value.title);
                // change scene to ships control
                GUI.scene = "ships";
            } else if (data.command == "enter") { // enter to control your army (button EDIT in main menu)
                SOUND.sounds.playEnter();
                GUI.scene = "your";
                GUI.settings.yourArmy.update(data.value.active);
                GUI.settings.main.pause();

                if (GUI.settings.shipsIcon._isDraw) {
                    GUI.settings.shipsIcon.resume();
                    GUI.settings.shipsIcon.update(data.value.info);
                    GUI.settings.shipsList.resume();
                    GUI.settings.shipsList.update(data.value.info.name);
                } else {
                    GUI.settings.shipsIcon.draw(data.value.info);
                    GUI.settings.shipsList.draw(data.value.list, data.value.info.name);
                };

            } else if (data.command == "exit") { // exit from your army
                SOUND.sounds.playSpace();
                GUI.settings.yourArmy.update(data.value);
                GUI.settings.shipsIcon.pause();
                GUI.settings.shipsList.pause();
                GUI.scene = "settings";
                GUI.settings.main.resume();
            };
        } break;

        case "enemy": {
            if (data.command == "move") {
                GUI.settings.enemyArmy.update(data.value);
            } else if (data.command == "rewrite") {
                GUI.settings.enemyArmy.rewrite(data.value.active, data.value.title);
            };
        } break;

        case "ships": {
            if (data.command == "move") {
                SOUND.sounds.playEnter();
                GUI.settings.shipsIcon.update(data.value.info);
                GUI.settings.shipsList.update(data.value.info.name);
            } else if (data.command == "enter") {
                SOUND.sounds.playEnter();
                GUI.scene = "your";
                GUI.settings.yourArmy.rewrite(data.value.active, data.value.title);
            } else if (data.command == "exit") {
                SOUND.sounds.playSpace();
                GUI.scene = "your";
                GUI.settings.yourArmy.update(data.value.active);
                GUI.settings.shipsIcon.update(data.value.info);
            };
        } break;


        /****************** MELEE ********************/
        case "battle": {
            if (data.command == "start") {
                GUI.scene = "battle";
                GUI.settings.main.clear(); // DEBUG удалить вообще все сцены SETTINGS
                GUI.settings.background.clear();
                GUI.settings.enemyArmy.clear();
                GUI.settings.shipsIcon.clear();
                GUI.settings.shipsList.clear();
                GUI.settings.yourArmy.clear();

                GUI.melee.battle.draw(data.value);

            } else if (data.command == "update") {
                GUI.melee.battle.update(data.value);
            } else if (data.command == "end") {
                GUI.melee.battle.clear();
            };
        } break;


        /****************** ERROR *******************/
        case "error": {
            warning.OnServerError(data.value);
        } break;
    };
};


// all keyboard press (registered) send to server
document.onkeydown = (event) => {
    // check if key is registred
    if (keyboard[event.keyCode]) {
        socket.send(JSON.stringify({ scene: GUI.scene, value: keyboard[event.keyCode] }));
        event.preventDefault();
    };
};


// helper func
function validateJSON(str) {
    let json = null;
    try {
        json = JSON.parse(str);
    } catch (error) {
        console.log("ERROR, parse json", error);
    };
    return json;
};