import { ships } from "./ships";

// Fill database with some data.
const MENU_ELEMENTS = [
    "join server",
    "create server",
    "credits"
];

const CREDITS = [
    `Powered by SSH`,
    `Special thanks to the creator of PIXI.js`,
    `for the awersome framework`,
    `As well as the authors of the`,
    "star control 2 ur-quan master",
    `for the resources of the original game`
];

const CREATE = [
    "set max power",
    "set password",
    "cancel",
    "create"
];

const SETTINGS = [
    "melee",
    "load",
    "save",
    "edit",
    "settings",
    "quit game"
];

const DEFAULT_ARMY = [
    "guardian",
    "skiff",
    "dreadnought",
    "broodhome",
    "broodhome",
    "guardian",
    "empty",
    "empty",
    "dreadnought",
    "empty",
    "empty",
    "empty"
];

export function _fillDataBase(client) {

    client.rawCallAsync(["set", "menu", JSON.stringify(MENU_ELEMENTS)]).catch((e) => { console.error(e); });
    client.rawCallAsync(["set", "credits", JSON.stringify(CREDITS)]).catch((e) => { console.error(e); });
    client.rawCallAsync(["set", "create", JSON.stringify(CREATE)]).catch((e) => { console.error(e); });
    client.rawCallAsync(["set", "settings", JSON.stringify(SETTINGS)]).catch((e) => { console.error(e); });

    let keys = Object.keys(ships);
    for (const ship of keys) {
        client.rawCallAsync(["hset", "ships", ships[ship].name, JSON.stringify(ships[ship])]).catch((e) => { console.error(e); });
    };

    // DEBUG. change to LOAD ans SAVE armies
    client.rawCallAsync(["set", "default_army", JSON.stringify(DEFAULT_ARMY)]).catch((e) => { console.error(e); });
};