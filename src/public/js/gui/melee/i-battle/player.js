// player.js

export class Player extends PIXI.Sprite {
    constructor(player, size) {
        super();

        // cache 
        this.size = size;
        this.direction = player.direction;

        let textureName = `${player.name}-${size}-${player.direction}.png`;
        this.texture = PIXI.loader.resources[`${player.name}-${size}`].textures[textureName];
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.position.x = player.x;
        this.position.y = player.y;
    };


    update(player, size) {
        // update texture of ship if changed direction or size
        if (this.size != size || this.direction != player.direction) {
            let textureName = `${player.name}-${size}-${player.direction}.png`;
            this.texture = PIXI.loader.resources[`${player.name}-${size}`].textures[textureName];

            // cache new values
            this.size = size;
            this.direction = player.direction;
        };

        // update position
        this.position.x = player.x;
        this.position.y = player.y;
    };

    destroy() {
        this.destroy();
    };
};