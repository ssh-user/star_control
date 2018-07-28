// database.js
import Redis from "redis-fast-driver";
// create connection
const client = new Redis({
    host: '127.0.0.1', //can be IP or hostname
    port: 6379,
    maxRetries: 10, //reconnect retries, default 10
    autoConnect: true //will connect after creation
});

// import data to fill database with default
import { _fillDataBase } from "./data/database-fill";

client.on("error", (err) => {
    console.error("Error " + err);
});


// incerting to DB some data. maybe change in future.
_fillDataBase(client);


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
    client.rawCallAsync(["del", id]).catch((e) => { console.error(e); });
    client.rawCallAsync(["del", `${id}-wait`]).catch((e) => { console.error(e); });
};

/**@param { String } id */
function getSocket(id) {
    return _sockets[id];
};



let menu = {
    main: {
        async getMenuElements() {
            return JSON.parse(await client.rawCallAsync(["get", "menu"]));
        },

        /**@param { String } id socket's ID */
        async getActiveElement(id) {
            return +(await client.rawCallAsync(["hget", id, "menu"]));
        },

        /**@param { String } id sockets id
         * @param { Number } active active element*/
        setActiveElement(id, active) {
            client.rawCallAsync(["hset", id, "menu", active]).catch((e) => { console.error(e); });
        }
    },

    credits: {
        async getCredits() {
            return JSON.parse(await client.rawCallAsync(["get", "credits"]));
        }
    },

    create: {
        async getMenuElements() {
            return JSON.parse(await client.rawCallAsync(["get", "create"]));
        },

        /**@param { String } id socket's ID */
        async getActiveElement(id) {
            return +(await client.rawCallAsync(["hget", id, "create"]));
        },

        /**@param { String } id socket's ID 
         * @param { Number } active active element*/
        setActiveElement(id, active) {
            client.rawCallAsync(["hset", id, "create", active]).catch((e) => { console.error(e); });
        },

        /**@param { String } id socket's ID 
         * @param { {id:String, name: String, password:String, maxUnits: Number} } options server options*/
        addWaiting(id, options) {
            // add to wait line
            client.rawCallAsync(["set", `${id}-wait`, JSON.stringify(options)])
                .catch((e) => { console.error(e); });

            // add some game settings
            game.setMaxUnits(id, options.maxUnits);
        },

        /**@param { String } id socket's ID */
        removeWaiting(id) {
            client.rawCallAsync(["del", `${id}-wait`]).catch((e) => { console.error(e); });
        },

        /**@param { String } id socket's ID */
        async isAvaible(id) {
            let some = await client.rawCallAsync(["get", `${id}-wait`]);
            return (some) ? true : false;
        }
    },

    join: {
        async getMenuElements() {
            // get all IDs of waiting users
            let keys = await client.rawCallAsync(['SCAN', "0", "MATCH", "*-wait", "COUNT", "10000000"]);
            // if redis nothing find it returns array with null as first element
            if (keys[1][0] == null)
                return [];
            // get servers info by keys
            let list = await client.rawCallAsync(['MGET', ...keys[1]]);
            // parse them and return 
            let result = list.map((elem) => JSON.parse(elem));

            return result;
        },

        /**@param { String } id socket's ID 
         * @param { Array } elements array of waitings users*/
        setMenuElements(id, elements) {
            client.rawCallAsync(["hset", `${id}`, "join_elements", JSON.stringify(elements)])
                .catch((e) => {
                    console.error(e);
                });
        },

        /**@param { String } id socket's ID */
        async getOwnMenuElements(id) {
            return JSON.parse(await client.rawCallAsync(["hget", `${id}`, "join_elements"]));
        },

        /**@param { String } id socket's ID 
         * @param { Number } active active element*/
        setActiveElement(id, active) {
            client.rawCallAsync(["hset", id, "join", active]).catch((e) => { console.error(e); });
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
        client.rawCallAsync(["hset", id, "max_units", maxUnits]).catch((e) => { console.error(e); });
    },

    /**@param { String } id socket's ID */
    getMaxUnits(id) {
        return +(client.rawCallAsync(["hget", id, "max_units"]));
    },

    /**@param { String } your your socket's ID 
     * @param { String } partner partner socket's ID */
    setPartnerID(your, partner) {
        client.rawCallAsync(["hset", your, "partner", partner]).catch((e) => { console.error(e); });
    },

    /**@param { String } id socket's ID */
    getPartnerID(id) {
        return client.rawCallAsync(["hget", id, "partner"]);
    },

    async getDefaultArmy() {
        return JSON.parse(await client.rawCallAsync(["get", "default_army"]));
    },

    /**@param { String } id socket's ID */
    async getArmy(id) {
        return JSON.parse(await client.rawCallAsync(["hget", id, "army"]));
    },

    /**@param { String } id socket's ID 
    * @param { Array } army your army */
    setArmy(id, army) {
        client.rawCallAsync(["hset", id, "army", JSON.stringify(army)]).catch((e) => { console.error(e); });
    },

    preBattle: {
        /**@param { String } id socket's ID */
        async getActiveElement(id) {
            return +(await client.rawCallAsync(["hget", id, "preBattle"]));
        },

        /**@param { String } id sockets id
         * @param { Number } active active element*/
        setActiveElement(id, active) {
            client.rawCallAsync(["hset", id, "preBattle", active]).catch((e) => { console.error(e); });
        },
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
        if (!ship) return null;
        else
            return JSON.parse(ship);
    }
};

let settings = {
    main: {
        async getMenuElements() {
            return JSON.parse(await client.rawCallAsync(["get", "settings"]));
        },

        /**@param { String } id socket's ID */
        async getActiveElement(id) {
            return +(await client.rawCallAsync(["hget", id, "settings"]));
        },

        /**@param { String } id sockets id
         * @param { Number } active active element*/
        setActiveElement(id, active) {
            client.rawCallAsync(["hset", id, "settings", active]).catch((e) => { console.error(e); });
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
            client.rawCallAsync(["hset", id, "edit", active]).catch((e) => { console.error(e); });
        },

        /**@param { String } id socket's ID 
        * @param { Array } army your army */
        setArmy(id, army) {
            client.rawCallAsync(["hset", id, "army", JSON.stringify(army)]).catch((e) => { console.error(e); });
        },

        /**@param { String } id socket's ID */
        async getArmy(id) {
            return JSON.parse(await client.rawCallAsync(["hget", id, "army"]));
        },
    },

    ships: {
        /**@param { String } id socket's ID */
        async getActiveElement(id) {
            return +(await client.rawCallAsync(["hget", id, "menu_ships"]));
        },

        /**@param { String } id sockets id
         * @param { Number } active active element*/
        setActiveElement(id, active) {
            client.rawCallAsync(["hset", id, "menu_ships", active]).catch((e) => { console.error(e); });
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

export {
    addSocket,
    getSocket,
    removeSocket,
    menu,
    game,
    settings,
    melee
};