export class Text extends PIXI.Text {
    constructor(text, fontFamily, fontSize, fontFill) {
        super(text,
            {
                fontFamily: fontFamily,
                fontSize: fontSize,
                fill: fontFill
            });
    };
    update(text) {
        this.text = text;
    };
};