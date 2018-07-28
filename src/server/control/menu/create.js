// create.js
import * as db from "../../database";
import * as ws from "../../websocket";


export const create = {
    async moveUp(socket) {
        try {
            // get active element
            let active = await db.menu.create.getActiveElement(socket.id);
            // get max length of elements array
            let length = (await db.menu.create.getMenuElements()).length;
            // move on the menu
            if (active > 0)
                --active; // update active element number
            else
                active = length - 1; // update active element number

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
            if (active < length - 1)
                ++active; // update active element number
            else
                active = 0; // update active element number

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