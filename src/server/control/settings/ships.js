// ships.js
import * as db from "../../database";
import * as ws from "../../websocket";


export const ships = {
    async moveUp(socket) {
        try {
            // get active element then get currentShip
            let active = await db.settings.ships.getActiveElement(socket.id);
            let ships = await db.game.getAllships();

            // move on the menu
            if (active > 0)
                --active;
            else
                active = ships.length - 1;

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
            if (active < ships.length - 1)
                ++active;
            else
                active = 0;

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
