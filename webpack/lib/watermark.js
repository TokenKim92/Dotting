import BaseCanvas from './baseCanvas.js';
import FontFormat from './fontFormat.js';

export default class Watermark extends BaseCanvas {
  static FONT_WIDTH = 600;
  static POS_Y = 50;

  #text = 0;
  #fontName;
  #color;

  constructor(text, fontName, color = 'rgb(255,255,255)') {
    super();

    this.#text = text;
    this.#fontName = fontName;
    this.#color = color;

    this.#init();
  }

  resize() {
    super.resize();

    this.#init();
  }

  #init() {
    const fontFormat = new FontFormat(
      Watermark.FONT_WIDTH,
      this.#fontSize,
      this.#fontName
    );

    this.ctx.font = fontFormat.font;
    this.ctx.fillStyle = this.#color;
    this.ctx.textBaseline = 'middle';
  }

  get #fontSize() {
    switch (this.sizeMode) {
      case BaseCanvas.SMALL_MODE:
        return 20;
      case BaseCanvas.REGULAR_MODE:
        return 30;
      case BaseCanvas.MEDIUM_MODE:
        return 40;
      case BaseCanvas.LARGE_MODE:
        return 50;
      default:
        throw new Error('This canvas size is not possible!');
    }
  }

  draw() {
    const fontPos = this.ctx.measureText(this.#text);
    this.ctx.fillText(
      this.#text,
      (this.stageWidth - fontPos.width) / 2,
      Watermark.POS_Y
    );
  }
}
