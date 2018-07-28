export class Stars extends PIXI.Container {
    constructor(stars) {
        super();

        for (let star of stars) {
            let starCreate = new PIXI.Sprite(PIXI.loader.resources[star.name].texture);
            starCreate.anchor.x = 0.5;
            starCreate.anchor.y = 0.5;
            starCreate.position.x = star.x;
            starCreate.position.y = star.y;

            this.addChild(starCreate);
        };
    };

    update(stars) {
        // update position and texture of stars
        for (let [index, star] of this.children.entries()) {
            star.position.x = stars[index].x;
            star.position.y = stars[index].y;
        };
    };

    destroy() {
        // clear all and destroy container
        for (let index = this.children.length - 1; index >= 0; --index) {
            this.children[index].destroy();
        };
        this.destroy();
    };
};