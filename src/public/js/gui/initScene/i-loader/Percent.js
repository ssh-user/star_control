export class Percent extends PIXI.Text {
    constructor(text, fontFamily, fontSize, fontFill) {
        super(text,
            {
                fontFamily: fontFamily,
                fontSize: fontSize,
                fill: fontFill
            });
    };
    update(progress) {
        this.text = progress.toFixed() + " %";
    };
};