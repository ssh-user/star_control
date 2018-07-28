// battle.js
import * as db from "../../database";
import * as ws from "../../websocket";

export const battle = {
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
    },
};