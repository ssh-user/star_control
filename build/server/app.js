/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
        }
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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.melee = exports.settings = exports.game = exports.menu = exports.removeSocket = exports.getSocket = exports.addSocket = undefined;

var _redisFastDriver = __webpack_require__(7);

var _redisFastDriver2 = _interopRequireDefault(_redisFastDriver);

var _databaseFill = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create connection
const client = new _redisFastDriver2.default({
    host: '127.0.0.1', //can be IP or hostname
    port: 6379,
    maxRetries: 10, //reconnect retries, default 10
    autoConnect: true //will connect after creation
});

// import data to fill database with default
// database.js


client.on("error", err => {
    console.error("Error " + err);
});

// incerting to DB some data. maybe change in future.
(0, _databaseFill._fillDataBase)(client);

// cache sockets connection.
let _sockets = {};
// cache players during battle
let _players = {};

/**@param { WebSocket } socket */
function addSocket(socket) {
    _sockets[socket.id] = socket;
};

/**@param { String } id */
function removeSocket(id) {
    delete _sockets[id];
    // remove client's data from DB
    client.rawCallAsync(["del", id]).catch(e => {
        console.error(e);
    });
    client.rawCallAsync(["del", `${id}-wait`]).catch(e => {
        console.error(e);
    });
};

/**@param { String } id */
function getSocket(id) {
    return _sockets[id];
};

let menu = {
    main: {
        async getMenuElements() {
            return JSON.parse((await client.rawCallAsync(["get", "menu"])));
        },

        /**@param { String } id socket's ID */
        async getActiveElement(id) {
            return +(await client.rawCallAsync(["hget", id, "menu"]));
        },

        /**@param { String } id sockets id
         * @param { Number } active active element*/
        setActiveElement(id, active) {
            client.rawCallAsync(["hset", id, "menu", active]).catch(e => {
                console.error(e);
            });
        }
    },

    credits: {
        async getCredits() {
            return JSON.parse((await client.rawCallAsync(["get", "credits"])));
        }
    },

    create: {
        async getMenuElements() {
            return JSON.parse((await client.rawCallAsync(["get", "create"])));
        },

        /**@param { String } id socket's ID */
        async getActiveElement(id) {
            return +(await client.rawCallAsync(["hget", id, "create"]));
        },

        /**@param { String } id socket's ID 
         * @param { Number } active active element*/
        setActiveElement(id, active) {
            client.rawCallAsync(["hset", id, "create", active]).catch(e => {
                console.error(e);
            });
        },

        /**@param { String } id socket's ID 
         * @param { {id:String, name: String, password:String, maxUnits: Number} } options server options*/
        addWaiting(id, options) {
            // add to wait line
            client.rawCallAsync(["set", `${id}-wait`, JSON.stringify(options)]).catch(e => {
                console.error(e);
            });

            // add some game settings
            game.setMaxUnits(id, options.maxUnits);
        },

        /**@param { String } id socket's ID */
        removeWaiting(id) {
            client.rawCallAsync(["del", `${id}-wait`]).catch(e => {
                console.error(e);
            });
        },

        /**@param { String } id socket's ID */
        async isAvaible(id) {
            let some = await client.rawCallAsync(["get", `${id}-wait`]);
            return some ? true : false;
        }
    },

    join: {
        async getMenuElements() {
            // get all IDs of waiting users
            let keys = await client.rawCallAsync(['SCAN', "0", "MATCH", "*-wait", "COUNT", "10000000"]);
            // if redis nothing find it returns array with null as first element
            if (keys[1][0] == null) return [];
            // get servers info by keys
            let list = await client.rawCallAsync(['MGET', ...keys[1]]);
            // parse them and return 
            let result = list.map(elem => JSON.parse(elem));

            return result;
        },

        /**@param { String } id socket's ID 
         * @param { Array } elements array of waitings users*/
        setMenuElements(id, elements) {
            client.rawCallAsync(["hset", `${id}`, "join_elements", JSON.stringify(elements)]).catch(e => {
                console.error(e);
            });
        },

        /**@param { String } id socket's ID */
        async getOwnMenuElements(id) {
            return JSON.parse((await client.rawCallAsync(["hget", `${id}`, "join_elements"])));
        },

        /**@param { String } id socket's ID 
         * @param { Number } active active element*/
        setActiveElement(id, active) {
            client.rawCallAsync(["hset", id, "join", active]).catch(e => {
                console.error(e);
            });
        },

        /**@param { String } id socket's ID */
        async getActiveElement(id) {
            return +(await client.rawCallAsync(["hget", id, "join"]));
        }
    }
};

let game = {
    /**@param { String } id socket's ID 
     * @param { Number } maxUnits max power of all ships*/
    setMaxUnits(id, maxUnits) {
        client.rawCallAsync(["hset", id, "max_units", maxUnits]).catch(e => {
            console.error(e);
        });
    },

    /**@param { String } id socket's ID */
    getMaxUnits(id) {
        return +client.rawCallAsync(["hget", id, "max_units"]);
    },

    /**@param { String } your your socket's ID 
     * @param { String } partner partner socket's ID */
    setPartnerID(your, partner) {
        client.rawCallAsync(["hset", your, "partner", partner]).catch(e => {
            console.error(e);
        });
    },

    /**@param { String } id socket's ID */
    getPartnerID(id) {
        return client.rawCallAsync(["hget", id, "partner"]);
    },

    async getDefaultArmy() {
        return JSON.parse((await client.rawCallAsync(["get", "default_army"])));
    },

    /**@param { String } id socket's ID */
    async getArmy(id) {
        return JSON.parse((await client.rawCallAsync(["hget", id, "army"])));
    },

    /**@param { String } id socket's ID 
    * @param { Array } army your army */
    setArmy(id, army) {
        client.rawCallAsync(["hset", id, "army", JSON.stringify(army)]).catch(e => {
            console.error(e);
        });
    },

    preBattle: {
        /**@param { String } id socket's ID */
        async getActiveElement(id) {
            return +(await client.rawCallAsync(["hget", id, "preBattle"]));
        },

        /**@param { String } id sockets id
         * @param { Number } active active element*/
        setActiveElement(id, active) {
            client.rawCallAsync(["hset", id, "preBattle", active]).catch(e => {
                console.error(e);
            });
        }
    },

    /**@returns { Array<Object> } return ships array*/
    async getAllships() {
        let data = await client.rawCallAsync(["hgetall", "ships"]);
        let ships = [];
        for (let i = 1; i < data.length; i += 2) {
            // if it 'empty' element pass it
            if (data[i - 1] == "empty") continue;
            ships.push(JSON.parse(data[i]));
        };
        ships.sort((a, b) => a.race > b.race);

        return ships;
    },

    /**@param { String } shipName ship name*/
    async getShip(shipName) {
        let ship = await client.rawCallAsync(["hget", "ships", shipName]);
        if (!ship) return null;else return JSON.parse(ship);
    }
};

let settings = {
    main: {
        async getMenuElements() {
            return JSON.parse((await client.rawCallAsync(["get", "settings"])));
        },

        /**@param { String } id socket's ID */
        async getActiveElement(id) {
            return +(await client.rawCallAsync(["hget", id, "settings"]));
        },

        /**@param { String } id sockets id
         * @param { Number } active active element*/
        setActiveElement(id, active) {
            client.rawCallAsync(["hset", id, "settings", active]).catch(e => {
                console.error(e);
            });
        }
    },

    your: {
        /**@param { String } id socket's ID */
        async getActiveElement(id) {
            return +(await client.rawCallAsync(["hget", id, "edit"]));
        },

        /**@param { String } id sockets id
         * @param { Number } active active element*/
        setActiveElement(id, active) {
            client.rawCallAsync(["hset", id, "edit", active]).catch(e => {
                console.error(e);
            });
        },

        /**@param { String } id socket's ID 
        * @param { Array } army your army */
        setArmy(id, army) {
            client.rawCallAsync(["hset", id, "army", JSON.stringify(army)]).catch(e => {
                console.error(e);
            });
        },

        /**@param { String } id socket's ID */
        async getArmy(id) {
            return JSON.parse((await client.rawCallAsync(["hget", id, "army"])));
        }
    },

    ships: {
        /**@param { String } id socket's ID */
        async getActiveElement(id) {
            return +(await client.rawCallAsync(["hget", id, "menu_ships"]));
        },

        /**@param { String } id sockets id
         * @param { Number } active active element*/
        setActiveElement(id, active) {
            client.rawCallAsync(["hset", id, "menu_ships", active]).catch(e => {
                console.error(e);
            });
        }
    }
};

let melee = {
    players: {
        addPlayer(player) {
            _players[player.id] = player;
        },

        removePlayer(id) {
            delete _players[id];
        },

        getPlayer(id) {
            return _players[id];
        }
    }
};

exports.addSocket = addSocket;
exports.getSocket = getSocket;
exports.removeSocket = removeSocket;
exports.menu = menu;
exports.game = game;
exports.settings = settings;
exports.melee = melee;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// compass.js

const compass = exports.compass = {
    "N": { x: 0, y: 1 },
    "NNE": { x: 0.25, y: 0.75 },
    "NE": { x: 0.5, y: 0.5 },
    "ENE": { x: 0.75, y: 0.25 },
    "E": { x: 1, y: 0 },
    "ESE": { x: 0.75, y: -0.25 },
    "SE": { x: 0.5, y: -0.5 },
    "SSE": { x: 0.25, y: -0.75 },
    "S": { x: 0, y: -1 },
    "SSW": { x: -0.25, y: -0.75 },
    "SW": { x: -0.5, y: -0.5 },
    "WSW": { x: -0.75, y: -0.25 },
    "W": { x: -1, y: 0 },
    "WNW": { x: -0.75, y: 0.25 },
    "NW": { x: -0.5, y: 0.5 },
    "NNW": { x: -0.25, y: 0.75 }
};

const DIRECTION = exports.DIRECTION = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const WIDHT = exports.WIDHT = 320;
const HEIGHT = exports.HEIGHT = 240;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// index.js.  Enter point to app. (server side)
// import game engine
const ENGINE = __webpack_require__(5);
const WebSocket = __webpack_require__(26);

// conf and start server
const ws = new WebSocket.Server({
    port: 3000,
    perMessageDeflate: false
});

ws.on('connection', socket => {
    ENGINE.connect(socket);

    socket.on('close', () => {
        ENGINE.disconnect(socket);
    });

    socket.on('message', msgHandler);
});

// handler for all income message
function msgHandler(data) {
    // validate incoming msg if invalid - nothing to do
    data = validateData(data);
    if (!data) return;

    switch (data.scene) {
        case "menu":
            {
                if (data.command == "draw_menu") ENGINE.menu.getElements(this);else ENGINE.menu.keyEvent(this, data.value);
            }break;

        case "credits":
            {
                ENGINE.credits.keyEvent(this, data.value);
            }break;

        case "create_server":
            {
                ENGINE.create_server.keyEvent(this, data.value);
            }break;

        case "join_server":
            {
                ENGINE.join_server.keyEvent(this, data.value);
            }break;

        case "wait":
            {
                ENGINE.wait.keyEvent(this, data.value);
            }break;

        case "settings":
            {
                ENGINE.settings.keyEvent(this, data.value);
            }break;

        case "your":
            {
                ENGINE.your.keyEvent(this, data.value);
            }break;

        case "ships":
            {
                ENGINE.ships.keyEvent(this, data.value);
            }break;

        case "battle":
            {
                ENGINE.battle.keyEvent(this, data.value);
            }break;

        default:
            break;
    };
};

// validating income data
function validateData(data) {
    let json = null;
    try {
        json = JSON.parse(data);
    } catch (error) {
        console.error("error on parse: ", error);
    };

    return json;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uuid = __webpack_require__(6);

var _uuid2 = _interopRequireDefault(_uuid);

var _websocket = __webpack_require__(0);

var _websocket2 = _interopRequireDefault(_websocket);

var _database = __webpack_require__(1);

var db = _interopRequireWildcard(_database);

var _index = __webpack_require__(10);

var control = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// engine.js
module.exports = {
    connect(socket) {
        socket.id = (0, _uuid2.default)();
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
                case "up":
                    {
                        control.menu.main.moveUp(socket);
                    }break;
                case "down":
                    {
                        control.menu.main.moveDown(socket);
                    }break;
                case "enter":
                    {
                        // get active element
                        try {
                            let active = await db.menu.main.getActiveElement(socket.id);

                            switch (+active) {
                                case 0:
                                    {
                                        // join
                                        control.menu.main.enter.join(socket);
                                    }break;
                                case 1:
                                    {
                                        // create
                                        control.menu.main.enter.create(socket);
                                    }break;
                                case 2:
                                    {
                                        // credits
                                        control.menu.main.enter.credits(socket);
                                    }break;
                            }
                        } catch (error) {
                            // breake func and send Error
                            _websocket2.default.error(error, error.message);
                        };
                    }break;
            }
        }
    },

    credits: {
        /**@param { WebSocket } socket 
         * @param { String } key */
        keyEvent(socket, key) {
            if (key == "space") _websocket2.default.credits.exit(socket);
        }
    },

    create_server: {
        async keyEvent(socket, key) {
            switch (key) {
                case "up":
                    {
                        control.menu.create.moveUp(socket);
                    }break;
                case "down":
                    {
                        control.menu.create.moveDown(socket);
                    }break;
                case "enter":
                    {
                        // get active element
                        try {
                            let active = await db.menu.create.getActiveElement(socket.id);

                            switch (+active) {
                                case 0:
                                    {
                                        // set max power
                                        control.menu.create.enter.setMaxPower(socket);
                                    }break;
                                case 1:
                                    {
                                        // set password    
                                        control.menu.create.enter.setPassword(socket);
                                    }break;
                                case 2:
                                    {
                                        // cancel
                                        _websocket2.default.createServer.exit(socket);
                                    }break;
                                case 3:
                                    {
                                        // create server
                                        control.menu.create.enter.createServer(socket);
                                    }break;
                            }
                        } catch (error) {
                            // breake func and send Error
                            _websocket2.default.error(error, error.message);
                        };
                    }break;
                case "space":
                    {
                        _websocket2.default.createServer.exit(socket);
                    }break;
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
                case "up":
                    {
                        control.menu.join.moveUp(socket);
                    }break;
                case "down":
                    {
                        control.menu.join.moveDown(socket);
                    }break;
                case "space":
                    {
                        _websocket2.default.joinServer.exit(socket);
                    }break;
                case "enter":
                    {
                        control.menu.join.enter(socket);
                    }break;
            };
        }
    },

    wait: {
        /** @param { WebSocket } socket 
         * @param { String } key */
        keyEvent(socket, key) {
            if (key == "space") {
                db.menu.create.removeWaiting(socket.id);
                _websocket2.default.wait.exitCreate(socket);
            };
        }
    },

    settings: {
        /**@param { WebSocket } socket 
         * @param { String } key */
        async keyEvent(socket, key) {
            switch (key) {
                case "up":
                    {
                        control.settings.main.moveUp(socket);
                    }break;
                case "down":
                    {
                        control.settings.main.moveDown(socket);
                    }break;
                case "enter":
                    {
                        try {
                            let active = await db.settings.main.getActiveElement(socket.id);
                            switch (+active) {
                                case 0:
                                    {
                                        // melee
                                        control.settings.main.enter.melee(socket);
                                    }break;
                                case 1:
                                    {
                                        // load
                                        control.settings.main.enter.load(socket);
                                    }break;
                                case 2:
                                    {
                                        // save
                                        control.settings.main.enter.save(socket);
                                    }break;
                                case 3:
                                    {
                                        // edit
                                        control.settings.main.enter.edit(socket);
                                    }break;
                                case 4:
                                    {
                                        // settings
                                        control.settings.main.enter.settings(socket);
                                    }break;
                                case 5:
                                    {
                                        // quit game
                                        control.settings.main.enter.quit_game(socket);
                                    }break;
                            }
                        } catch (error) {
                            // breake func and send Error
                            _websocket2.default.error(error, error.message);
                        };
                    }break;
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
                case "up":
                    {
                        control.settings.your.moveUp(socket);
                    }break;
                case "down":
                    {
                        control.settings.your.moveDown(socket);
                    }break;
                case "left":
                    {
                        control.settings.your.moveLeft(socket);
                    }break;
                case "right":
                    {
                        control.settings.your.moveRight(socket);
                    }break;
                case "space":
                    {
                        control.settings.your.space(socket);
                    }break;
                case "enter":
                    {
                        control.settings.your.enter(socket);
                    }break;
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
                case "up":
                    {
                        control.settings.ships.moveUp(socket);
                    }break;
                case "down":
                    {
                        control.settings.ships.moveDown(socket);
                    }break;
                case "space":
                    {
                        control.settings.ships.space(socket);
                    }break;
                case "enter":
                    {
                        control.settings.ships.enter(socket);
                    }break;
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
                case "left":
                    {
                        control.melee.battle.left(socket);
                    }break;
                case "right":
                    {
                        control.melee.battle.right(socket);
                    }break;
                case "up":
                    {
                        control.melee.battle.accelerate(socket);
                    }break;
                case "space":
                    {
                        control.melee.battle.fire(socket);
                    }break;
                case "ctrl":
                    {
                        control.melee.battle.special(socket);
                    }break;
            }
        }
    }
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("redis-fast-driver");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._fillDataBase = _fillDataBase;

var _ships = __webpack_require__(9);

// Fill database with some data.
const MENU_ELEMENTS = ["join server", "create server", "credits"];

const CREDITS = [`Powered by SSH`, `Special thanks to the creator of PIXI.js`, `for the awersome framework`, `As well as the authors of the`, "star control 2 ur-quan master", `for the resources of the original game`];

const CREATE = ["set max power", "set password", "cancel", "create"];

const SETTINGS = ["melee", "load", "save", "edit", "settings", "quit game"];

const DEFAULT_ARMY = ["guardian", "skiff", "dreadnought", "broodhome", "broodhome", "guardian", "empty", "empty", "dreadnought", "empty", "empty", "empty"];

function _fillDataBase(client) {

    client.rawCallAsync(["set", "menu", JSON.stringify(MENU_ELEMENTS)]).catch(e => {
        console.error(e);
    });
    client.rawCallAsync(["set", "credits", JSON.stringify(CREDITS)]).catch(e => {
        console.error(e);
    });
    client.rawCallAsync(["set", "create", JSON.stringify(CREATE)]).catch(e => {
        console.error(e);
    });
    client.rawCallAsync(["set", "settings", JSON.stringify(SETTINGS)]).catch(e => {
        console.error(e);
    });

    let keys = Object.keys(_ships.ships);
    for (const ship of keys) {
        client.rawCallAsync(["hset", "ships", _ships.ships[ship].name, JSON.stringify(_ships.ships[ship])]).catch(e => {
            console.error(e);
        });
    };

    // DEBUG. change to LOAD ans SAVE armies
    client.rawCallAsync(["set", "default_army", JSON.stringify(DEFAULT_ARMY)]).catch(e => {
        console.error(e);
    });
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// ships.js

/*
    Frame rate
        In Super-Melee, the frame rate is 24 FPS (frames per second), 
        i.e. a frame is 1/24 seconds.

    World units
        Distances in Super-Melee are measured in world units, 
        which are equal to 1/4 of a pixel at full zoom with a 320x240 resolution.

    Facing
        Most projectiles and ships have a direction in which they are facing; 
        due to technical limitations and balance issues, the game only uses 16 possible facings, 
        separated from each other by 22.5 degrees. 
 */

const ships = exports.ships = {
    "empty": {
        name: "empty",
        race: "",
        crew: null,
        battery: null,
        value: null
    },
    "skiff": {
        race: "Arilou",
        name: "skiff",
        crew: 6,
        battery: 20,
        value: 16
    },
    "dreadnought": {
        race: "Ur-Quan",
        name: "dreadnought",
        crew: 42,
        battery: 42,
        value: 30, // "value" of ship. How many it 'cost' to compare with other ships
        batt_reg: 0.14, // units/frame
        max_speed: 30, // world units.  1\4 pixel per frame
        acceleration: 0.86, // units/frame
        mass: 10,
        turn_rate: 0.2 // facings/frame

    },
    "broodhome": {
        race: "Chenjesu",
        name: "broodhome",
        crew: 36,
        battery: 30,
        value: 28
    },
    "guardian": {
        race: "Androsynth",
        name: "guardian",
        crew: 20,
        battery: 24,
        value: 15
    }
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(11);

var menu = _interopRequireWildcard(_index);

var _index2 = __webpack_require__(15);

var settings = _interopRequireWildcard(_index2);

var _index3 = __webpack_require__(23);

var melee = _interopRequireWildcard(_index3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = {
    menu: menu,
    settings: settings,
    melee: melee
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.join = exports.create = exports.main = undefined;

var _main = __webpack_require__(12);

var _create = __webpack_require__(13);

var _join = __webpack_require__(14);

exports.main = _main.main;
exports.create = _create.create;
exports.join = _join.join; //  MENU SCENE CONTROL

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.main = undefined;

var _database = __webpack_require__(1);

var db = _interopRequireWildcard(_database);

var _websocket = __webpack_require__(0);

var ws = _interopRequireWildcard(_websocket);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// main.js
const main = exports.main = {
    async getMenuElements(socket) {
        try {
            // get all menu elements
            let elements = await db.menu.main.getMenuElements();
            // first request. active element menu is zero
            let active = 0;
            // set active element
            db.menu.main.setActiveElement(active);
            // send user menu elements and active element
            ws.menu.draw(socket, elements, active);
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    },
    async moveUp(socket) {
        try {
            // get active element
            let active = await db.menu.main.getActiveElement(socket.id);
            // get max length of elements array
            let length = (await db.menu.main.getMenuElements()).length;
            // move on the menu
            if (active > 0) --active; // update active element number
            else active = length - 1; // update active element number

            // set db active
            db.menu.main.setActiveElement(socket.id, active);
            // send to user updated info                    
            ws.menu.update(socket, active);
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    },
    async moveDown(socket) {
        try {
            // get active element
            let active = await db.menu.main.getActiveElement(socket.id);
            // get max length of elements array
            let length = (await db.menu.main.getMenuElements()).length;
            // move on the menu
            if (active < length - 1) ++active; // update active element number
            else active = 0; // update active element number

            // set db active
            db.menu.main.setActiveElement(socket.id, active);
            // send to user updated info                    
            ws.menu.update(socket, active);
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    },
    enter: {
        async join(socket) {
            try {
                // in first entering active element is always zero
                let active = 0;
                // get list of waithings users
                let elements = await db.menu.join.getMenuElements();
                // set elements to own settings (need to correct move)
                db.menu.join.setMenuElements(socket.id, elements);
                // set active element
                db.menu.join.setActiveElement(socket.id, active);
                // send user join server menu elements and active element
                ws.joinServer.draw(socket, elements, active);
            } catch (error) {
                // send error
                ws.error(socket, err.message);
            };
        },
        async create(socket) {
            try {
                // get all create server elements
                let elements = await db.menu.create.getMenuElements();
                // first request. active element menu is zero
                let active = 0;
                // set active element
                db.menu.create.setActiveElement(active);
                // send user create server menu elements and active element
                ws.createServer.draw(socket, elements, active);
            } catch (error) {
                // send error
                ws.error(socket, err.message);
            };
        },
        async credits(socket) {
            try {
                let credits = await db.menu.credits.getCredits();
                ws.credits.draw(socket, credits);
            } catch (error) {
                // send error
                ws.error(socket, err.message);
            };
        }
    }
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.create = undefined;

var _database = __webpack_require__(1);

var db = _interopRequireWildcard(_database);

var _websocket = __webpack_require__(0);

var ws = _interopRequireWildcard(_websocket);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// create.js
const create = exports.create = {
    async moveUp(socket) {
        try {
            // get active element
            let active = await db.menu.create.getActiveElement(socket.id);
            // get max length of elements array
            let length = (await db.menu.create.getMenuElements()).length;
            // move on the menu
            if (active > 0) --active; // update active element number
            else active = length - 1; // update active element number

            // set db active
            db.menu.create.setActiveElement(socket.id, active);
            // send to user updated info                    
            ws.createServer.update(socket, active);
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    },
    async moveDown(socket) {
        try {
            // get active element
            let active = await db.menu.create.getActiveElement(socket.id);
            // get max length of elements array
            let length = (await db.menu.create.getMenuElements()).length;
            // move on the menu
            if (active < length - 1) ++active; // update active element number
            else active = 0; // update active element number

            // set db active
            db.menu.create.setActiveElement(socket.id, active);
            // send to user updated info                    
            ws.createServer.update(socket, active);
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    },
    enter: {
        async createServer(socket) {
            try {
                // DEBUG. Тут должно быть взять пароль, взять настройки сервера и только потом передать их
                // но пока, используем просто дефолтные, пустые. т.к. не реализован механизм выставления настроек
                let options = {
                    id: socket.id,
                    name: "free server",
                    password: null,
                    maxUnits: 420
                };
                // add waitings to DB
                db.menu.create.addWaiting(socket.id, options);
                // send view command to draw WAIT scene
                ws.wait.waitCreate(socket);
            } catch (error) {
                // send error
                ws.error(socket, err.message);
            };
        },
        async setPassword(socket) {
            // DEBUG. реализовать
        },
        async setMaxPower(socket) {
            // DEBUG. реализовать
        }
    }
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.join = undefined;

var _database = __webpack_require__(1);

var db = _interopRequireWildcard(_database);

var _websocket = __webpack_require__(0);

var ws = _interopRequireWildcard(_websocket);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// join.js
const join = exports.join = {
    async moveUp(socket) {
        try {
            // get active element
            let active = await db.menu.join.getActiveElement(socket.id);
            // get max length of elements array
            let length = (await db.menu.join.getOwnMenuElements(socket.id)).length;
            // to prevent move at empty 
            if (length == 0) return;

            // move on the menu
            if (active > 0) --active; // update active element number
            else active = length - 1; // update active element number

            // set db active
            db.menu.join.setActiveElement(socket.id, active);
            // send to user updated info                    
            ws.joinServer.update(socket, active);
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    },
    async moveDown(socket) {
        try {
            // get active element
            let active = await db.menu.join.getActiveElement(socket.id);
            // get max length of elements array
            let length = (await db.menu.join.getOwnMenuElements(socket.id)).length;
            // to prevent move at empty 
            if (length == 0) return;

            // move on the menu
            if (active < length - 1) ++active; // update active element number
            else active = 0; // update active element number

            // set db active
            db.menu.join.setActiveElement(socket.id, active);
            // send to user updated info                    
            ws.joinServer.update(socket, active);
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    },
    async enter(socket) {
        try {
            // DEBUG добавить проверку пароля

            // get active element
            let active = await db.menu.join.getActiveElement(socket.id);
            // get elements 
            let elements = await db.menu.join.getOwnMenuElements(socket.id);
            // to prevent enter at empty 
            if (elements.length == 0) return;

            // get user id
            let partnerID = elements[active].id;

            // check if this server is still available if no - user refresh view list 
            if (await db.menu.create.isAvaible(partnerID)) {

                // remove server from waitings
                db.menu.create.removeWaiting(partnerID);
                // get socket
                let socket2 = db.getSocket(partnerID);

                // exchanged IDs
                db.game.setPartnerID(socket.id, partnerID);
                db.game.setPartnerID(partnerID, socket.id);

                // copy server settings
                let maxUnits = await db.game.getMaxUnits(partnerID);
                db.game.setMaxUnits(socket.id, maxUnits);

                let settingsSceneElements = await db.settings.main.getMenuElements();
                let defaultArmy = await db.game.getDefaultArmy();

                // set default army self and partner
                db.settings.your.setArmy(socket.id, defaultArmy);
                db.settings.your.setArmy(partnerID, defaultArmy);

                // send both users signal to draw settings
                ws.settings.draw(socket, socket2, settingsSceneElements, 0, defaultArmy);
            } else {
                // refresh list
                let active = await db.menu.join.getActiveElement(socket.id);
                let elements = await db.menu.join.getMenuElements(socket.id);

                ws.joinServer.refresh(socket, elements, active);
            };
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ships = exports.your = exports.main = undefined;

var _main = __webpack_require__(16);

var _your = __webpack_require__(21);

var _ships = __webpack_require__(22);

exports.main = _main.main;
exports.your = _your.your;
exports.ships = _ships.ships; //  SETTINGS SCENE CONTROL

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.main = undefined;

var _database = __webpack_require__(1);

var db = _interopRequireWildcard(_database);

var _websocket = __webpack_require__(0);

var ws = _interopRequireWildcard(_websocket);

var _player = __webpack_require__(17);

var _battle = __webpack_require__(18);

var _world = __webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const main = exports.main = {
    async moveUp(socket) {
        try {
            // get active element
            let active = await db.settings.main.getActiveElement(socket.id);
            // get max length of elements array
            let length = (await db.settings.main.getMenuElements()).length;

            // move on the menu
            if (active > 0) --active; // update active element number
            else active = length - 1; // update active element number

            // set db active
            db.settings.main.setActiveElement(socket.id, active);
            // send to user updated info                    
            ws.settings.update(socket, active);
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    },

    async moveDown(socket) {
        try {
            // get active element
            let active = await db.settings.main.getActiveElement(socket.id);
            // get max length of elements array
            let length = (await db.settings.main.getMenuElements()).length;

            // move on the menu
            if (active < length - 1) ++active; // update active element number
            else active = 0; // update active element number

            // set db active
            db.settings.main.setActiveElement(socket.id, active);
            // send to user updated info                    
            ws.settings.update(socket, active);
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    },

    enter: {
        async melee(socket) {
            // DEBUG всё заменить на сцену ожидания соперника
            // это тестовый вариант

            // get partner id
            let partnerID = await db.game.getPartnerID(socket.id);

            let armyYour = await db.game.getArmy(socket.id);
            let armyEnemy = await db.game.getArmy(partnerID);

            let activeElement = 0;
            db.game.preBattle.setActiveElement(socket.id, activeElement);

            let ship = await db.game.getShip("dreadnought");
            let player1 = new _player.Player(socket.id, ship, _world.WIDHT, _world.HEIGHT);
            let player2 = new _player.Player(partnerID, ship, _world.WIDHT, _world.HEIGHT);

            // add players to db
            db.melee.players.addPlayer(player1);
            db.melee.players.addPlayer(player2);

            // create battle emulation and start battle
            let battle = new _battle.Battle([player1, player2]);
            battle.battle_start();
        },
        async load(socket) {},
        async save(socket) {},
        async edit(socket) {
            try {
                // get partner id
                let partnerID = await db.game.getPartnerID(socket.id);
                let socket2 = db.getSocket(partnerID);
                // set activ element to zero
                let active = 0;
                db.settings.your.setActiveElement(socket.id, active);

                let ships = await db.game.getAllships();
                let army = await db.settings.your.getArmy(socket.id);
                let currentShip = await db.game.getShip(army[active]);

                ws.your.enter(socket, socket2, active, currentShip, ships);
            } catch (error) {
                // send error
                ws.error(socket, err.message);
            };
        },
        async settings(socket) {},
        async quit_game(socket) {}
    }
}; // main.js

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Player = undefined;

var _compass = __webpack_require__(2);

class Player {
    constructor(id, ship, WIDHT, HEIGHT) {
        // constants
        this.id = id; // socket id
        this.WORLD_WIDTH = WIDHT;
        this.WORLD_HEIGHT = HEIGHT;

        this.name = ship.name;
        this.race = ship.race;
        this.value = ship.value;
        this.mass = ship.mass;
        this.max_crew = ship.max_crew || ship.crew; // some ships have not full crew
        this.max_battery = ship.max_battery || ship.battery; // the same about battery
        this.batt_reg = ship.batt_reg;
        // original game property used 24 FPS, 320x240 resolution and own parameters like WORLD UNIT == 1/4 PIXEL
        // so I have to adapt parameters with "/4"
        // "/6" is .. my attempt to level the speed. requires fine-tuning. Something wrong in my formula of speed.
        this.max_speed = ship.max_speed / 4 / 6;
        this.acceleration = ship.acceleration / 4;
        this.turn_rate = ship.turn_rate;

        // change duiring battle
        this.crew = ship.crew;
        this.battery = ship.battery;
        this.speedX = 0;
        this.speedY = 0;
        this.stepDirection = 0; // step to change direction
        this.isDirectionDelay = false;

        // default position and direction
        this.direction = "N";
        this.x = 0;
        this.y = 0;

        // update
        this.action = new Set();
    }

    /**Add action like "left", "rigth", "fire" etc.
     * Will be execute on next tick.
     * @param { String } action 
    */
    addAction(action) {
        this.action.add(action);
    }

    _left() {
        // if delay - nothing doing
        if (this.isDirectionDelay) return;
        // start delay time
        this.isDirectionDelay = true;

        // change direction
        let index = _compass.DIRECTION.indexOf(this.direction);
        --index;
        if (index >= 0) this.direction = _compass.DIRECTION[index];else this.direction = _compass.DIRECTION[_compass.DIRECTION.length - 1];
    }

    _right() {
        // if delay - nothing doing
        if (this.isDirectionDelay) return;
        // start delay time
        this.isDirectionDelay = true;

        // change direction
        let index = _compass.DIRECTION.indexOf(this.direction);
        ++index;
        if (index != _compass.DIRECTION.length - 1) this.direction = _compass.DIRECTION[index];else this.direction = _compass.DIRECTION[0];
    }

    _accelerate() {
        // calculate new speed
        this.speedX += this.acceleration * _compass.compass[this.direction].x;
        this.speedY += this.acceleration * _compass.compass[this.direction].y * -1; // -1 because start point is up-left corner

        // chack max speed
        if (this.speedX > this.max_speed) this.speedX = this.max_speed;else if (this.speedX < this.max_speed * -1) this.speedX = this.max_speed * -1;

        if (this.speedY > this.max_speed) this.speedY = this.max_speed;else if (this.speedY < this.max_speed * -1) this.speedY = this.max_speed * -1;
    }

    _fire() {}

    _special() {}

    update() {
        // execute all users actions on this frame
        for (const action of this.action) {
            switch (action) {
                case "left":
                    this._left();
                    break;
                case "right":
                    this._right();
                    break;
                case "accelerate":
                    this._accelerate();
                    break;
                case "fire":
                    this._fire();
                    break;
                case "special":
                    this._special();
                    break;
            }
        };
        // clear all and wait another actions which will be execute on next frame
        this.action.clear();

        // recalculation position
        this.x += this.speedX;
        this.y += this.speedY;

        // if a player goes abroad then we change the position to the opposite
        if (this.x < 0) this.x = this.WORLD_WIDTH;else if (this.x > this.WORLD_WIDTH) this.x = 0;

        if (this.y < 0) this.y = this.WORLD_HEIGHT;else if (this.y > this.WORLD_HEIGHT) this.y = 0;

        // calc rotate delay
        if (this.isDirectionDelay) {
            this.stepDirection += this.turn_rate;
            // check if delay time end
            if (this.stepDirection >= 1) {
                this.isDirectionDelay = false;
                this.stepDirection = 0;
            };
        };
    }
}exports.Player = Player; // player.js

;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Battle = undefined;

var _database = __webpack_require__(1);

var db = _interopRequireWildcard(_database);

var _compass = __webpack_require__(2);

var _world = __webpack_require__(3);

var _star = __webpack_require__(19);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const Game = __webpack_require__(20);
const ws = __webpack_require__(0);
class Battle extends Game {
    constructor(players) {
        super({
            framesPerSecond: 24, // DEBUG изменить на 24 фрейма в секунду
            // maxFrameSkip: 0,
            waitTime: 0
        });

        // constants. World Size
        this.WIDTH = _world.WIDHT;
        this.HEIGHT = _world.HEIGHT;

        // add players to battle scene
        this.players = players;

        // add stars
        this.stars = [];
        let blueBright = generateRandom(6, 10);
        let blue = generateRandom(8, 20);
        let white = generateRandom(10, 30);

        for (let index = 0; index < blueBright; index++) {
            this.stars.push(new _star.Star("star-blue-bright", this.WIDTH, this.HEIGHT, 0.4));
        };

        for (let index = 0; index < blue; index++) {
            this.stars.push(new _star.Star("star-blue", this.WIDTH, this.HEIGHT, 0.1));
        };

        for (let index = 0; index < white; index++) {
            this.stars.push(new _star.Star("star-white", this.WIDTH, this.HEIGHT, 0.05));
        };
    }

    battle_start() {
        this.on("start", () => {
            // init players in game. Set random position and direction
            for (let player of this.players) {
                // generate random direction
                player.direction = Object.keys(_compass.compass)[Math.floor(Math.random() * Object.keys(_compass.compass).length)];

                // generate random position
                player.x = generateRandom(0, this.WIDTH);
                player.y = generateRandom(0, this.HEIGHT);
            };

            // generate world. Set stars positions
            for (const star of this.stars) {
                // generate random position
                star.x = generateRandom(0, this.WIDTH);
                star.y = generateRandom(0, this.HEIGHT);
            };

            // send users data to write scene
            let socket1 = db.getSocket(this.players[0].id);
            let socket2 = db.getSocket(this.players[1].id);
            let scene = this._createSceneData();

            ws.battle.start(socket1, socket2, scene);
        });

        this.on("update", () => {
            // call every frame            
            // update players
            for (let player of this.players) {
                player.update();
            };

            let speedX = this.players[0].speedX + this.players[1].speedX;
            let speedY = this.players[0].speedY + this.players[1].speedY;

            // update world
            for (const star of this.stars) {
                star.updatePosition(speedX, speedY);
            };

            // check crew at players
            if (this.players[0].crew < 1 || this.players[1].crew < 1) {
                // battle end
                this.stop();
                // ws.batte.end()
            } else {
                // send updated info to users
                let socket1 = db.getSocket(this.players[0].id);
                let socket2 = db.getSocket(this.players[1].id);
                let scene = this._createSceneData();

                ws.battle.update(socket1, socket2, scene);
            };
        });

        this.on("stop", () => {
            // player1,2.battle = false
        });

        this.start();
    }

    _createSceneData() {
        // create short information about players to show users scene
        let player1 = {
            name: this.players[0].name,
            race: this.players[0].race,
            crew: this.players[0].crew,
            battery: this.players[0].battery,
            direction: _compass.DIRECTION.indexOf(this.players[0].direction), // get index of direction
            x: this.players[0].x,
            y: this.players[0].y
        };

        let player2 = {
            name: this.players[1].name,
            race: this.players[1].race,
            crew: this.players[1].crew,
            battery: this.players[1].battery,
            direction: _compass.DIRECTION.indexOf(this.players[1].direction), // get index of direction
            x: this.players[1].x,
            y: this.players[1].y
        };

        // DEBUG тут должен быть расчет расстояния друг до друга и указания размеров кораблей, звезд и т.д.
        let size = "sml";

        return {
            players: [player1, player2],
            stars: this.stars,
            size: size
        };
    }
}exports.Battle = Battle;
;

function generateRandom(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// star.js

class Star {
    constructor(name, WIDHT, HEIGHT, speedScale) {
        // constants
        this.name = name;
        this.WORLD_WIDTH = WIDHT;
        this.WORLD_HEIGHT = HEIGHT;
        this.speedScale = speedScale * -1; // change direction to opposide

        // variable
        this.x = null;
        this.y = null;
    }

    updatePosition(speedX, speedY) {
        this.x += speedX * this.speedScale;
        this.y += speedY * this.speedScale;

        if (this.x < 0) this.x = this.WORLD_WIDTH;else if (this.x > this.WORLD_WIDTH) this.x = 0;

        if (this.y < 0) this.y = this.WORLD_HEIGHT;else if (this.y > this.WORLD_HEIGHT) this.y = 0;
    }
}exports.Star = Star;
;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("game");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.your = undefined;

var _database = __webpack_require__(1);

var db = _interopRequireWildcard(_database);

var _websocket = __webpack_require__(0);

var ws = _interopRequireWildcard(_websocket);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// your.js
const your = exports.your = {
    async moveUp(socket) {
        try {
            // get active element
            let active = await db.settings.your.getActiveElement(socket.id);

            // get partner socket
            let partnerID = await db.game.getPartnerID(socket.id);
            let socket2 = db.getSocket(partnerID);

            // move on the menu
            if (active < 6) active += 6;else active -= 6;

            // set db active
            db.settings.your.setActiveElement(socket.id, active);
            // get current ship
            let army = await db.settings.your.getArmy(socket.id);
            let currentShip = await db.game.getShip(army[active]);

            // send to user updated info                    
            ws.your.move(socket, socket2, active, currentShip);
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    },

    async moveDown(socket) {
        try {
            // get active element then get currentShip
            let active = await db.settings.your.getActiveElement(socket.id);

            // get partner socket
            let partnerID = await db.game.getPartnerID(socket.id);
            let socket2 = db.getSocket(partnerID);

            // move on the menu
            if (active < 6) active += 6;else active -= 6;

            // set db active
            db.settings.your.setActiveElement(socket.id, active);
            // get current ship
            let army = await db.settings.your.getArmy(socket.id);
            let currentShip = await db.game.getShip(army[active]);

            // send to user updated info                    
            ws.your.move(socket, socket2, active, currentShip);
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    },

    async moveRight(socket) {
        try {
            // get active element then get currentShip
            let active = await db.settings.your.getActiveElement(socket.id);

            // get partner socket
            let partnerID = await db.game.getPartnerID(socket.id);
            let socket2 = db.getSocket(partnerID);

            // move on the menu
            if (active == 5) active = 0;else if (active == 11) active = 6;else ++active;

            // set db active
            db.settings.your.setActiveElement(socket.id, active);
            // get current ship
            let army = await db.settings.your.getArmy(socket.id);
            let currentShip = await db.game.getShip(army[active]);

            // send to user updated info                    
            ws.your.move(socket, socket2, active, currentShip);
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    },

    async moveLeft(socket) {
        try {
            // get active element then get currentShip
            let active = await db.settings.your.getActiveElement(socket.id);

            // get partner socket
            let partnerID = await db.game.getPartnerID(socket.id);
            let socket2 = db.getSocket(partnerID);

            // move on the menu
            if (active == 0) active = 5;else if (active == 6) active = 11;else --active;

            // set db active
            db.settings.your.setActiveElement(socket.id, active);
            // get current ship
            let army = await db.settings.your.getArmy(socket.id);
            let currentShip = await db.game.getShip(army[active]);

            // send to user updated info                    
            ws.your.move(socket, socket2, active, currentShip);
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    },

    async enter(socket) {
        try {
            // set default value to ships menu
            db.settings.ships.setActiveElement(socket.id, 0);

            // get active element then get currentShip
            let active = await db.settings.your.getActiveElement(socket.id);
            let army = await db.settings.your.getArmy(socket.id);
            // set ship in your army to "empty"
            army[active] = "empty";
            // save to db new army
            db.settings.your.setArmy(socket.id, army);

            // get partner socket
            let partnerID = await db.game.getPartnerID(socket.id);
            let socket2 = db.getSocket(partnerID);

            // send to user updated info                    
            ws.your.rewrite(socket, socket2, active, "empty");
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    },

    async space(socket) {
        let active = null;
        let partnerID = await db.game.getPartnerID(socket.id);
        let socket2 = db.getSocket(partnerID);

        // set db active
        db.settings.your.setActiveElement(socket.id, active);

        // send to user updated info   
        ws.your.exit(socket, socket2, active);
    }
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ships = undefined;

var _database = __webpack_require__(1);

var db = _interopRequireWildcard(_database);

var _websocket = __webpack_require__(0);

var ws = _interopRequireWildcard(_websocket);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// ships.js
const ships = exports.ships = {
    async moveUp(socket) {
        try {
            // get active element then get currentShip
            let active = await db.settings.ships.getActiveElement(socket.id);
            let ships = await db.game.getAllships();

            // move on the menu
            if (active > 0) --active;else active = ships.length - 1;

            // update active element
            db.settings.ships.setActiveElement(socket.id, active);

            // send to user updated info                    
            ws.ships.move(socket, active, ships[active]);
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    },

    async moveDown(socket) {
        try {
            // get active element then get currentShip
            let active = await db.settings.ships.getActiveElement(socket.id);
            let ships = await db.game.getAllships();

            // move on the menu
            if (active < ships.length - 1) ++active;else active = 0;

            // update active element
            db.settings.ships.setActiveElement(socket.id, active);

            // send to user updated info                    
            ws.ships.move(socket, active, ships[active]);
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    },

    async enter(socket) {
        try {
            // get active element then get currentShip
            let activeShip = await db.settings.ships.getActiveElement(socket.id);
            let ships = await db.game.getAllships();
            let currentShip = ships[activeShip];

            // insert to your army
            let activeArmy = await db.settings.your.getActiveElement(socket.id);
            let army = await db.settings.your.getArmy(socket.id);
            // insert ship name to your army list
            army[activeArmy] = currentShip.name;
            // save to db
            db.settings.your.setArmy(socket.id, army);

            // get partner socket
            let partnerID = await db.game.getPartnerID(socket.id);
            let socket2 = db.getSocket(partnerID);

            ws.ships.enter(socket, socket2, activeArmy, currentShip.name);
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    },

    async space(socket) {
        // get active element then get currentShip
        let active = await db.settings.your.getActiveElement(socket.id);
        let ship = await db.game.getShip("empty");

        // send to user updated info   
        ws.ships.exit(socket, active, ship);
    }
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ships = exports.battle = undefined;

var _battle = __webpack_require__(24);

var _ships = __webpack_require__(25);

// MELEE CONTROL
exports.battle = _battle.battle;
exports.ships = _ships.ships;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.battle = undefined;

var _database = __webpack_require__(1);

var db = _interopRequireWildcard(_database);

var _websocket = __webpack_require__(0);

var ws = _interopRequireWildcard(_websocket);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// battle.js
const battle = exports.battle = {
    left(socket) {
        let player = db.melee.players.getPlayer(socket.id);
        player.addAction("left");
    },

    right(socket) {
        let player = db.melee.players.getPlayer(socket.id);
        player.addAction("right");
    },

    accelerate(socket) {
        let player = db.melee.players.getPlayer(socket.id);
        player.addAction("accelerate");
    },

    fire(socket) {
        let player = db.melee.players.getPlayer(socket.id);
        player.addAction("fire");
    },

    special(socket) {
        let player = db.melee.players.getPlayer(socket.id);
        player.addAction("special");
    }
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ships = undefined;

var _database = __webpack_require__(1);

var db = _interopRequireWildcard(_database);

var _websocket = __webpack_require__(0);

var ws = _interopRequireWildcard(_websocket);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// ships.js
const ships = exports.ships = {
    async moveUp(socket) {
        try {
            // get active element
            let active = await db.settings.your.getActiveElement(socket.id);

            // get partner socket
            let partnerID = await db.game.getPartnerID(socket.id);
            let socket2 = db.getSocket(partnerID);

            // move on the menu
            if (active < 6) active += 6;else active -= 6;

            // set db active
            db.settings.your.setActiveElement(socket.id, active);
            // get current ship
            let army = await db.settings.your.getArmy(socket.id);
            let currentShip = await db.game.getShip(army[active]);

            // send to user updated info                    
            ws.your.move(socket, socket2, active, currentShip);
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    },

    async moveDown(socket) {
        try {
            // get active element then get currentShip
            let active = await db.settings.your.getActiveElement(socket.id);

            // get partner socket
            let partnerID = await db.game.getPartnerID(socket.id);
            let socket2 = db.getSocket(partnerID);

            // move on the menu
            if (active < 6) active += 6;else active -= 6;

            // set db active
            db.settings.your.setActiveElement(socket.id, active);
            // get current ship
            let army = await db.settings.your.getArmy(socket.id);
            let currentShip = await db.game.getShip(army[active]);

            // send to user updated info                    
            ws.your.move(socket, socket2, active, currentShip);
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    },

    async moveRight(socket) {
        try {
            // get active element then get currentShip
            let active = await db.settings.your.getActiveElement(socket.id);

            // get partner socket
            let partnerID = await db.game.getPartnerID(socket.id);
            let socket2 = db.getSocket(partnerID);

            // move on the menu
            if (active == 5) active = 0;else if (active == 11) active = 6;else ++active;

            // set db active
            db.settings.your.setActiveElement(socket.id, active);
            // get current ship
            let army = await db.settings.your.getArmy(socket.id);
            let currentShip = await db.game.getShip(army[active]);

            // send to user updated info                    
            ws.your.move(socket, socket2, active, currentShip);
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    },

    async moveLeft(socket) {
        try {
            // get active element then get currentShip
            let active = await db.settings.your.getActiveElement(socket.id);

            // get partner socket
            let partnerID = await db.game.getPartnerID(socket.id);
            let socket2 = db.getSocket(partnerID);

            // move on the menu
            if (active == 0) active = 5;else if (active == 6) active = 11;else --active;

            // set db active
            db.settings.your.setActiveElement(socket.id, active);
            // get current ship
            let army = await db.settings.your.getArmy(socket.id);
            let currentShip = await db.game.getShip(army[active]);

            // send to user updated info                    
            ws.your.move(socket, socket2, active, currentShip);
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    },

    async enter(socket) {
        try {
            // set default value to ships menu
            db.settings.ships.setActiveElement(socket.id, 0);

            // get active element then get currentShip
            let active = await db.settings.your.getActiveElement(socket.id);
            let army = await db.settings.your.getArmy(socket.id);
            // set ship in your army to "empty"
            army[active] = "empty";
            // save to db new army
            db.settings.your.setArmy(socket.id, army);

            // get partner socket
            let partnerID = await db.game.getPartnerID(socket.id);
            let socket2 = db.getSocket(partnerID);

            // send to user updated info                    
            ws.your.rewrite(socket, socket2, active, "empty");
        } catch (error) {
            // send error
            ws.error(socket, err.message);
        };
    }
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("ws");

/***/ })
/******/ ]);