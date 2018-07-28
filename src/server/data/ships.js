// ships.js

/*
    Frame rate
        In Super-Melee, the frame rate is 24 FPS (frames per second), 
        i.e. a frame is 1/24 seconds.

    World units
        Distances in Super-Melee are measured in world units, 
        which are equal to 1/4 of a pixel at full zoom with a 320x240 resolution.

    Facing
        Most projectiles and ships have a direction in which they are facing; 
        due to technical limitations and balance issues, the game only uses 16 possible facings, 
        separated from each other by 22.5 degrees. 
 */

export const ships = {
    "empty": {
        name: "empty",
        race: "",
        crew: null,
        battery: null,
        value: null
    },
    "skiff": {
        race: "Arilou",
        name: "skiff",
        crew: 6,
        battery: 20,
        value: 16
    },
    "dreadnought": {
        race: "Ur-Quan",
        name: "dreadnought",
        crew: 42,
        battery: 42,
        value: 30,          // "value" of ship. How many it 'cost' to compare with other ships
        batt_reg: 0.14,     // units/frame
        max_speed: 30,      // world units.  1\4 pixel per frame
        acceleration: 0.86, // units/frame
        mass: 10,
        turn_rate: 0.2      // facings/frame

    },
    "broodhome": {
        race: "Chenjesu",
        name: "broodhome",
        crew: 36,
        battery: 30,
        value: 28
    },
    "guardian": {
        race: "Androsynth",
        name: "guardian",
        crew: 20,
        battery: 24,
        value: 15
    }
};