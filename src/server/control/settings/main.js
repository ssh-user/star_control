// main.js
import * as db from "../../database";
import * as ws from "../../websocket";
import { Player } from "../../data/player";
import { Battle } from "../../battle";
import { HEIGHT, WIDHT } from "../../data/world";

export const main = {
    async moveUp(socket) {
        try {
            // get active element
            let active = await db.settings.main.getActiveElement(socket.id);
            // get max length of elements array
            let length = (await db.settings.main.getMenuElements()).length;

            // move on the menu
            if (active > 0)
                --active; // update active element number
            else
                active = length - 1; // update active element number

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
            if (active < length - 1)
                ++active; // update active element number
            else
                active = 0; // update active element number

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
            let player1 = new Player(socket.id, ship, WIDHT, HEIGHT);
            let player2 = new Player(partnerID, ship, WIDHT, HEIGHT);

            // add players to db
            db.melee.players.addPlayer(player1);
            db.melee.players.addPlayer(player2);

            // create battle emulation and start battle
            let battle = new Battle([player1, player2]);
            battle.battle_start();
        },
        async load(socket) { },
        async save(socket) { },
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

                ws.your.enter(
                    socket,
                    socket2,
                    active,
                    currentShip,
                    ships
                );
            } catch (error) {
                // send error
                ws.error(socket, err.message);
            };
        },
        async settings(socket) { },
        async quit_game(socket) { }
    }
};
