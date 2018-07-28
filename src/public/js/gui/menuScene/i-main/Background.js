export class Background extends PIXI.Sprite {
    constructor(width, height) {
        super();
        this.texture = PIXI.loader.resources["menu-img"].texture;
        this.width = width;
        this.height = height;
    };
};