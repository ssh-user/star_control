// join.js
import * as db from "../../database";
import * as ws from "../../websocket";


export const join = {
    async moveUp(socket) {
        try {
            // get active element
            let active = await db.menu.join.getActiveElement(socket.id);
            // get max length of elements array
            let length = (await db.menu.join.getOwnMenuElements(socket.id)).length;
            // to prevent move at empty 
            if (length == 0)
                return;

            // move on the menu
            if (active > 0)
                --active; // update active element number
            else
                active = length - 1; // update active element number

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
            if (length == 0)
                return;

            // move on the menu
            if (active < length - 1)
                ++active; // update active element number
            else
                active = 0; // update active element number

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
            if (elements.length == 0)
                return;

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
