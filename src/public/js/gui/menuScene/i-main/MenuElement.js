export class MenuElement extends PIXI.Container {
    constructor(title) {
        super();

        this.sprite = new PIXI.Sprite(PIXI.loader.resources["menu-elem"].texture);
        this.sprite.width = 150;
        this.sprite.height = 25;

        this.text = new PIXI.Text(title, {
            fontSize: 12,
            fontStyle: "italic",
            fontVariant: "small-caps",
            fontWeight: "bold",
            fill: "black"
        });

        this.addChild(this.sprite);
        this.addChild(this.text);

        this.text.position.x = (this.sprite.width - this.text.width) / 2;
        this.text.position.y = (this.sprite.height - this.text.height) / 3;
    };
    /**Set text to active status */
    active() {
        this.text.style.fill = "yellow";
    };
    /**Set text to inactive status */
    inActive() {
        this.text.style.fill = "black";
    };

    destroy() {
        this.sprite.destroy();
        this.text.destroy();
        this.parent.removeChild(this);
    };
};