// websocket.js

const websocket = {
    /**
     * send user error message
     * @param { WebSocket } socket 
     * @param { String } errorMsg 
     */
    error(socket, errorMsg) {
        socket.send(JSON.stringify({
            scene: "error",
            value: errorMsg
        }));
    },
    // scene menu
    menu: {
        /**
         * @param { WebSocket } socket 
         * @param { Array } list
         * @param { Number } active active element
         */
        draw(socket, list, active) {
            socket.send(JSON.stringify({
                scene: "menu",
                command: "draw_menu",
                value: { list: list, active: active }
            }));
        },

        /**
         * @param { WebSocket } socket 
         * @param { Number } activeElement 
         */
        update(socket, activeElement) {
            socket.send(JSON.stringify({
                scene: "menu",
                command: "update_menu",
                value: activeElement
            }));
        }
    },
    // scene create_server
    createServer: {
        /**
         * @param { WebSocket } socket 
         * @param { Array } list
         * @param { Number } activeElement
         */
        draw(socket, list, active) {
            socket.send(JSON.stringify({
                scene: "create_server",
                command: "draw",
                value: { list: list, active: active }
            }));
        },
        /**
         * @param { WebSocket } socket 
         * @param { Number } activeElement 
         */
        update(socket, activeElement) {
            socket.send(JSON.stringify({
                scene: "create_server",
                command: "update",
                value: activeElement
            }));
        },

        /**
         * @param { WebSocket } socket
         */
        exit(socket) {
            socket.send(JSON.stringify({
                scene: "create_server",
                command: "exit"
            }));
        }
    },
    // scene join server
    joinServer: {
        /**
         * @param { WebSocket } socket 
         * @param { Array } list waitings users
         * @param { Number } active active element
         */
        draw(socket, list, active) {
            socket.send(JSON.stringify({
                scene: "join_server",
                command: "draw",
                value: { list: list, active: active }
            }));
        },
        /**
         * @param { WebSocket } socket 
         * @param { Number } active active element
         */
        update(socket, active) {
            socket.send(JSON.stringify({
                scene: "join_server",
                command: "update",
                value: active
            }));
        },

        /**
         * @param { WebSocket } socket
         */
        exit(socket) {
            socket.send(JSON.stringify({
                scene: "join_server",
                command: "exit"
            }));
        },
        /**
         * @param { WebSocket } socket 
         * @param { Array } list waitings users
         * @param { Number } active active element
         */
        refresh(socket, list, active) {
            socket.send(JSON.stringify({
                scene: "join_server",
                command: "refresh",
                value: { list: list, active: active }
            }));
        }
    },
    // scene credits
    credits: {
        /**
         * @param { WebSocket } socket 
         * @param { String[] } text 
         */
        draw(socket, text) {
            socket.send(JSON.stringify({
                scene: "credits",
                command: "draw_credits",
                value: text
            }));
        },

        /**
         * @param { WebSocket } socket
         */
        exit(socket) {
            socket.send(JSON.stringify({
                scene: "credits",
                command: "exit_credits"
            }));
        }
    },
    // scene wait
    wait: {
        /**
         * @param { WebSocket } socket
         */
        waitCreate(socket) {
            socket.send(JSON.stringify({
                scene: "wait",
                command: "join"
            }));
        },
        /**
         * @param { WebSocket } socket
         */
        waitBattle(socket) {
            socket.send(JSON.stringify({
                scene: "wait",
                command: "battle"
            }));
        },
        /**
         * @param { WebSocket } socket
         */
        exitCreate(socket) {
            socket.send(JSON.stringify({
                scene: "wait",
                command: "exit"
            }));
        }
    },

    /********* SETTINGS **********/
    settings: {
        /**
         * @param { WebSocket } socket1 
         * @param { WebSocket } socket2
         * @param { Array } list menu elements
         * @param { Number } active active element
         * @param { Array } army active element
         */
        draw(socket1, socket2, list, active, army) {
            socket1.send(JSON.stringify({
                scene: "settings",
                command: "draw",
                value: {
                    list: list,
                    active: active,
                    army: army
                }
            }));
            socket2.send(JSON.stringify({
                scene: "settings",
                command: "draw",
                value: {
                    list: list,
                    active: active,
                    army: army
                }
            }));
        },
        /**
         * @param { WebSocket } socket 
         * @param { Number } active active element
         */
        update(socket, active) {
            socket.send(JSON.stringify({
                scene: "settings",
                command: "update",
                value: active
            }));
        },
    },

    your: {
        /**
         * @param { WebSocket } socket1 
         * @param { WebSocket } socket2
         * @param { Number } active active element
         * @param { Object } info info about ship
         */
        move(socket1, socket2, active, info) {
            socket1.send(JSON.stringify({
                scene: "your",
                command: "move",
                value: { active: active, info: info }
            }));
            socket2.send(JSON.stringify({
                scene: "enemy",
                command: "move",
                value: active
            }));
        },
        /**
         * @param { WebSocket } socket1 
         * @param { WebSocket } socket2
         * @param { Number } active active element
         * @param { Object } info info about ship
         * @param { Array } list list of ships
         */
        enter(socket1, socket2, active, info, list) {
            socket1.send(JSON.stringify({
                scene: "your",
                command: "enter",
                value: { active: active, info: info, list: list }
            }));
            socket2.send(JSON.stringify({
                scene: "enemy",
                command: "move",
                value: active
            }));
        },
        /**
         * @param { WebSocket } socket1 
         * @param { WebSocket } socket2
         * @param { Number } active active element
         */
        exit(socket1, socket2, active) {
            socket1.send(JSON.stringify({
                scene: "your",
                command: "exit",
                value: active
            }));
            socket2.send(JSON.stringify({
                scene: "enemy",
                command: "move",
                value: active
            }));
        },
        /**
         * @param { WebSocket } socket 
         * @param { WebSocket } socket2 
         * @param { Number } active active element
         * @param { Object } ship ship info
         */
        rewrite(socket1, socket2, active, title) {
            socket1.send(JSON.stringify({
                scene: "your",
                command: "rewrite",
                value: { active: active, title: title }
            }));
            socket2.send(JSON.stringify({
                scene: "enemy",
                command: "rewrite",
                value: { active: active, title: title }
            }));
        }
    },

    ships: {
        /**
         * @param { WebSocket } socket
         * @param { Number } active active element
         * @param { Object } info info about ship
         */
        move(socket, active, info) {
            socket.send(JSON.stringify({
                scene: "ships",
                command: "move",
                value: { active: active, info: info }
            }));
        },

        /**
         * @param { WebSocket } socket 
         * @param { WebSocket } socket2 
         * @param { Number } active active element
         * @param { Object } ship ship name
         */
        enter(socket1, socket2, active, title) {
            socket1.send(JSON.stringify({
                scene: "ships",
                command: "enter",
                value: { active: active, title: title }
            }));
            socket2.send(JSON.stringify({
                scene: "enemy",
                command: "rewrite",
                value: { active: active, title: title }
            }));
        },

        /**
         * @param { WebSocket } socket
         * @param { Number } active active element
         */
        exit(socket, active, info) {
            socket.send(JSON.stringify({
                scene: "ships",
                command: "exit",
                value: { active: active, info: info }
            }));
        }
    },

    /********* MELEE **********/
    battle: {
        /**
         * @param { WebSocket } socket1
         * @param { WebSocket } socket2 
         * @param { Object } world all world elements
         */
        start(socket1, socket2, world) {
            socket1.send(JSON.stringify({
                scene: "battle",
                command: "start",
                value: world
            }));
            socket2.send(JSON.stringify({
                scene: "battle",
                command: "start",
                value: world
            }));
        },
        /**
         * @param { WebSocket } socket1
         * @param { WebSocket } socket2 
         * @param { Object } world all world elements
         */
        update(socket1, socket2, world) {
            socket1.send(JSON.stringify({
                scene: "battle",
                command: "update",
                value: world
            }));
            socket2.send(JSON.stringify({
                scene: "battle",
                command: "update",
                value: world
            }));
        },

        end(socket1, socket2, winner) {
            // socket1.send(JSON.stringify({
            //     scene: "ships",
            //     command: "enter",
            //     value: { active: active, title: title }
            // }));
            // socket2.send(JSON.stringify({
            //     scene: "enemy",
            //     command: "rewrite",
            //     value: { active: active, title: title }
            // }));
        }
    }
};

module.exports = websocket;
