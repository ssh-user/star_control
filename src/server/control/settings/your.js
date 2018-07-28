// your.js
import * as db from "../../database";
import * as ws from "../../websocket";


export const your = {
    async moveUp(socket) {
        try {
            // get active element
            let active = await db.settings.your.getActiveElement(socket.id);

            // get partner socket
            let partnerID = await db.game.getPartnerID(socket.id);
            let socket2 = db.getSocket(partnerID);

            // move on the menu
            if (active < 6)
                active += 6;
            else
                active -= 6;

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
            if (active < 6)
                active += 6;
            else
                active -= 6;

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
            if (active == 5)
                active = 0;
            else if (active == 11)
                active = 6;
            else
                ++active;

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
            if (active == 0)
                active = 5;
            else if (active == 6)
                active = 11;
            else
                --active;

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
