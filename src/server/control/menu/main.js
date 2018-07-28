// main.js
import * as db from "../../database";
import * as ws from "../../websocket";


export const main = {
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
            if (active > 0)
                --active; // update active element number
            else
                active = length - 1; // update active element number

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
            if (active < length - 1)
                ++active; // update active element number
            else
                active = 0; // update active element number

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