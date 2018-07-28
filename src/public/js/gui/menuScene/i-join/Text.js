export class Text extends PIXI.Text {
    constructor(title) {
        super(title, {
            fontFamily: "Arial",
            fontSize: 14,
            fill: 0xffffff
        });
    };

    active() {
        this.style.fill = 0xffff00;
    };

    inActive() {
        this.style.fill = 0xffffff;
    };
};