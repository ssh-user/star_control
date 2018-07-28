// engine.js
import uuid from "uuid";
import ws from "./websocket";
import * as db from "./database";
import * as control from "./control/index";


module.exports = {
    connect(socket) {
        socket.id = uuid();
        db.addSocket(socket);
    },

    disconnect(socket) {
        db.removeSocket(socket.id);
    },

    menu: {
        getElements(socket) {
            control.menu.main.getMenuElements(socket);
        },

        async keyEvent(socket, key) {
            switch (key) {
                case "up": {
                    control.menu.main.moveUp(socket);
                } break;
                case "down": {
                    control.menu.main.moveDown(socket);
                } break;
                case "enter": {
                    // get active element
                    try {
                        let active = await db.menu.main.getActiveElement(socket.id);

                        switch (+active) {
                            case 0: { // join
                                control.menu.main.enter.join(socket);
                            } break;
                            case 1: { // create
                                control.menu.main.enter.create(socket);
                            } break;
                            case 2: { // credits
                                control.menu.main.enter.credits(socket);
                            } break;
                        }
                    } catch (error) {
                        // breake func and send Error
                        ws.error(error, error.message);
                    };

                } break;
            }
        }
    },

    credits: {
        /**@param { WebSocket } socket 
         * @param { String } key */
        keyEvent(socket, key) {
            if (key == "space")
                ws.credits.exit(socket);
        }
    },

    create_server: {
        async keyEvent(socket, key) {
            switch (key) {
                case "up": {
                    control.menu.create.moveUp(socket);
                } break;
                case "down": {
                    control.menu.create.moveDown(socket);
                } break;
                case "enter": {
                    // get active element
                    try {
                        let active = await db.menu.create.getActiveElement(socket.id);

                        switch (+active) {
                            case 0: { // set max power
                                control.menu.create.enter.setMaxPower(socket);
                            } break;
                            case 1: { // set password    
                                control.menu.create.enter.setPassword(socket);
                            } break;
                            case 2: { // cancel
                                ws.createServer.exit(socket);
                            } break;
                            case 3: { // create server
                                control.menu.create.enter.createServer(socket);
                            } break;
                        }
                    } catch (error) {
                        // breake func and send Error
                        ws.error(error, error.message);
                    };
                } break;
                case "space": {
                    ws.createServer.exit(socket);
                } break;
            }
        }
    },

    join_server: {
        /**
         * @param { WebSocket } socket 
         * @param { String } key 
         */
        keyEvent(socket, key) {
            switch (key) {
                case "up": {
                    control.menu.join.moveUp(socket);
                } break;
                case "down": {
                    control.menu.join.moveDown(socket);
                } break;
                case "space": {
                    ws.joinServer.exit(socket);
                } break;
                case "enter": {
                    control.menu.join.enter(socket);
                } break;
            };
        }
    },

    wait: {
        /** @param { WebSocket } socket 
         * @param { String } key */
        keyEvent(socket, key) {
            if (key == "space") {
                db.menu.create.removeWaiting(socket.id);
                ws.wait.exitCreate(socket);
            };
        }
    },

    settings: {
        /**@param { WebSocket } socket 
         * @param { String } key */
        async keyEvent(socket, key) {
            switch (key) {
                case "up": {
                    control.settings.main.moveUp(socket);
                } break;
                case "down": {
                    control.settings.main.moveDown(socket);
                } break;
                case "enter": {
                    try {
                        let active = await db.settings.main.getActiveElement(socket.id);
                        switch (+active) {
                            case 0: { // melee
                                control.settings.main.enter.melee(socket);
                            } break;
                            case 1: { // load
                                control.settings.main.enter.load(socket);
                            } break;
                            case 2: { // save
                                control.settings.main.enter.save(socket);
                            } break;
                            case 3: { // edit
                                control.settings.main.enter.edit(socket);
                            } break;
                            case 4: { // settings
                                control.settings.main.enter.settings(socket);
                            } break;
                            case 5: { // quit game
                                control.settings.main.enter.quit_game(socket);
                            } break;
                        }
                    } catch (error) {
                        // breake func and send Error
                        ws.error(error, error.message);
                    };
                } break;
            }
        }
    },

    your: {
        /**
         * @param { WebSocket } socket 
         * @param { String } key 
         */
        keyEvent(socket, key) {
            switch (key) {
                case "up": {
                    control.settings.your.moveUp(socket);
                } break;
                case "down": {
                    control.settings.your.moveDown(socket);
                } break;
                case "left": {
                    control.settings.your.moveLeft(socket);
                } break;
                case "right": {
                    control.settings.your.moveRight(socket);
                } break;
                case "space": {
                    control.settings.your.space(socket);
                } break;
                case "enter": {
                    control.settings.your.enter(socket);
                } break;
            }
        }
    },

    ships: {
        /**
         * @param { WebSocket } socket 
         * @param { String } key 
         */
        keyEvent(socket, key) {
            switch (key) {
                case "up": {
                    control.settings.ships.moveUp(socket);
                } break;
                case "down": {
                    control.settings.ships.moveDown(socket);
                } break;
                case "space": {
                    control.settings.ships.space(socket);
                } break;
                case "enter": {
                    control.settings.ships.enter(socket);
                } break;
            }
        }
    },

    battle: {
        /**
         * @param { WebSocket } socket 
         * @param { String } key 
         */
        keyEvent(socket, key) {
            switch (key) {
                case "left": {
                    control.melee.battle.left(socket);
                } break;
                case "right": {
                    control.melee.battle.right(socket);
                } break;
                case "up": {
                    control.melee.battle.accelerate(socket);
                } break;
                case "space": {
                    control.melee.battle.fire(socket);
                } break;
                case "ctrl": {
                    control.melee.battle.special(socket);
                } break;
            }
        }
    }
};
