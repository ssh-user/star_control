export class FrontRectangle extends PIXI.Graphics {
    constructor(color, width, height) {
        super();
        this.beginFill(color);
        this.drawRect(0, 0, width, height);
        this.endFill();
    };
    update(progress) {
        this.width = progress.toFixed();
    };
};