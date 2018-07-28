// there are some messages for user like "Can't connect to server" and other
// in future will change to more beaty

export function OnError(error) {
    console.log("Error! Can't connect to server :(");
    console.log(error);
};

export function OnClose(event) {
    if (event.wasClean) {
        console.log('Соединение закрыто чисто. Спасибо за игру.');
    } else {
        console.log("Обрыв соеденения :(");
    };
};

export function OnLoadError() {
    console.log("Error on loading files :(. Try press F5")
};

export function OnServerError(error) {
    console.log("Server error. ", error);
};