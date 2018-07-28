// compass.js

export const compass = {
    "N": { x: 0, y: 1 },
    "NNE": { x: 0.25, y: 0.75 },
    "NE": { x: 0.5, y: 0.5 },
    "ENE": { x: 0.75, y: 0.25 },
    "E": { x: 1, y: 0 },
    "ESE": { x: 0.75, y: -0.25 },
    "SE": { x: 0.5, y: -0.5 },
    "SSE": { x: 0.25, y: -0.75 },
    "S": { x: 0, y: -1 },
    "SSW": { x: -0.25, y: -0.75 },
    "SW": { x: -0.5, y: -0.5 },
    "WSW": { x: -0.75, y: -0.25 },
    "W": { x: -1, y: 0 },
    "WNW": { x: -0.75, y: 0.25 },
    "NW": { x: -0.5, y: 0.5 },
    "NNW": { x: -0.25, y: 0.75 }
};

export const DIRECTION = [
    "N", "NNE", "NE", "ENE",
    "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW",
    "W", "WNW", "NW", "NNW"
];