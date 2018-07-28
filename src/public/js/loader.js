export function loader() {
    return PIXI.loader
        /********************* MENU *********************/
        .add([
            // img
            { name: "menu-img", url: "assets/ui/menu/background.jpg" },
            { name: "menu-elem", url: "assets/ui/menu/element.jpg" },
            { name: 'menu-music', url: 'assets/ui/menu/menu-music.ogg' },

            // sounds
            { name: 'enter', url: 'assets/ui/sounds/enter.ogg' },
            { name: 'move', url: 'assets/ui/sounds/move.ogg' },
            { name: "space", url: "assets/ui/sounds/space.ogg" },
            { name: "alert", url: "assets/ui/sounds/redalert.ogg" },

            // Credits
            { name: "credits-img", url: "assets/ui/credits/background.png" },
            { name: "credits-music", url: "assets/ui/credits/credits-music.ogg" }
        ])

        /******************* SETTINGS *******************/
        .add([
            // img
            { name: "settings-background", url: "assets/ui/settings/background.png" },
            { name: "settings-background-element", url: "assets/ui/settings/back-element.png" },
            // sounds
            { name: 'settings-music', url: 'assets/ui/settings/settings-music.ogg' },
        ])

        /******************** SHIPS ICONS ********************/
        .add([
            { name: "empty-icons", url: "assets/ships/empty-icons.png" },
            { name: "background-melee-icons", url: "assets/ships/background-melee-icons.png" },
            { name: "background-active-melee-icons", url: "assets/ships/background-active-melee-icons.png" },
            { name: "empty-melee-icons", url: "assets/ships/empty-melee-icons.png" },
            { name: "empty-active-melee-icons", url: "assets/ships/empty-active-melee-icons.png" },

            { name: "skiff-icons", url: "assets/ships/skiff/skiff-icons.png" },
            { name: "skiff-melee-icons", url: "assets/ships/skiff/skiff-melee-icons.png" },
            { name: "broodhome-icons", url: "assets/ships/broodhome/broodhome-icons.png" },
            { name: "broodhome-melee-icons", url: "assets/ships/broodhome/broodhome-melee-icons.png" },
            { name: "dreadnought-icons", url: "assets/ships/dreadnought/dreadnought-icons.png" },
            { name: "dreadnought-melee-icons", url: "assets/ships/dreadnought/dreadnought-melee-icons.png" },
            { name: "guardian-icons", url: "assets/ships/guardian/guardian-icons.png" },
            { name: "guardian-melee-icons", url: "assets/ships/guardian/guardian-melee-icons.png" }
        ])

        /******************** MELEE ********************/
        .add([
            { name: "star-blue", url: "assets/ui/melee/star-blue.png" },
            { name: "star-white", url: "assets/ui/melee/star-white.png" },
            { name: "star-blue-bright", url: "assets/ui/melee/star-blue-bright.png" }
        ])

        /******************** SHIPS SPRITESHEETS ********************/
        .add("dreadnought-sml", "assets/ships/dreadnought/dreadnought-sml.json")
};