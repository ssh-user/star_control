// index.js.  Enter point to app. (server side)
// import game engine
const ENGINE = require("./engine");
const WebSocket = require('ws');

// conf and start server
const ws = new WebSocket.Server({
    port: 3000,
    perMessageDeflate: false
});


ws.on('connection', (socket) => {
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
        case "menu": {
            if (data.command == "draw_menu")
                ENGINE.menu.getElements(this);
            else
                ENGINE.menu.keyEvent(this, data.value);
        } break;

        case "credits": {
            ENGINE.credits.keyEvent(this, data.value);
        } break;

        case "create_server": {
            ENGINE.create_server.keyEvent(this, data.value);
        } break;

        case "join_server": {
            ENGINE.join_server.keyEvent(this, data.value);
        } break;

        case "wait": {
            ENGINE.wait.keyEvent(this, data.value);
        } break;

        case "settings": {
            ENGINE.settings.keyEvent(this, data.value);
        } break;

        case "your": {
            ENGINE.your.keyEvent(this, data.value);
        } break;

        case "ships": {
            ENGINE.ships.keyEvent(this, data.value);
        } break;

        case "battle": {
            ENGINE.battle.keyEvent(this, data.value);
        } break;

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
