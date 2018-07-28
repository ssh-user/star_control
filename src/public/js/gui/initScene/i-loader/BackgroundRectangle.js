export class BackgroundRectangle extends PIXI.Graphics {
    constructor(color, width, height) {
        super();
        this.beginFill(color);
        this.drawRect(0, 0, width, height);
        this.endFill();
    };
};