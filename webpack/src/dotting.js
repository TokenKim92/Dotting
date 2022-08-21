import Ripple from './ripple.js';
import Dot from './dot.js';
import { collide } from './utils.js';
import BaseCanvas from '../lib/baseCanvas.js';
import Watermark from '../lib/watermark.js';

export default class Dotting extends BaseCanvas {
  static RADIUS = 10;
  static PIXEL_SIZE = 24;
  static SMALL_MODE_RADIUS = 4;
  static SMALL_MODE_PIXEL_SIZE = 10;

  #watermark;
  #radius;
  #pixelSize;
  #dotItems = [];
  #isLoaded = false;
  #image;
  #ripple;
  #imgRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  #clickedPos = {
    x: 0,
    y: 0,
  };

  constructor(url, rippleTime = 5, FPS = 60) {
    super(true);

    this.#watermark = new Watermark(
      "Basic code by 'Interactive Developer'",
      'Arial'
    );

    this.#ripple = new Ripple(rippleTime, FPS);

    this.#image = new Image();
    this.#image.src = url;
    this.#image.onload = () => {
      this.#isLoaded = true;
      this.resize();
    };

    this.#initRadiusAndPixelSize();
    this.#watermark.addEventToCanvas('click', this.onClick);
  }

  bringToStage() {
    super.bringToStage();
    this.#watermark.bringToStage();
    this.#watermark.addEventToCanvas('click', this.onClick);

    this.clearCanvas();
    this.#dotItems.forEach((dotItem) => dotItem.reset());
    this.#ripple.stop();
    this.#drawImage();
  }

  removeFromStage() {
    super.removeFromStage();
    this.#watermark.removeFromStage();
    this.#watermark.removeEventFromCanvas('click', this.onClick);
  }

  resize() {
    super.resize();
    this.#watermark.resize();
    this.#watermark.draw();

    this.#ripple.stop();
    this.#isLoaded && this.#init();
    this.#initRadiusAndPixelSize();
  }

  #init() {
    this.#calculateImageRect();
    this.#drawImage();
    this.#initDotItems();
  }

  #initRadiusAndPixelSize() {
    if (!this.isMatchMedia) {
      this.#radius = Dotting.RADIUS;
      this.#pixelSize = Dotting.PIXEL_SIZE;
    } else {
      this.#radius = Dotting.SMALL_MODE_RADIUS;
      this.#pixelSize = Dotting.SMALL_MODE_PIXEL_SIZE;
    }
  }

  #calculateImageRect() {
    const stageRatio = this.stageWidth / this.stageHeight;
    const imgRatio = this.#image.width / this.#image.height;

    if (imgRatio > stageRatio) {
      this.#imgRect.width = this.stageWidth;
      this.#imgRect.height = Math.round(this.#image.height * (this.stageWidth / this.#image.width)); // prettier-ignore
      this.#imgRect.x = 0;
      this.#imgRect.y = Math.round( (this.stageHeight - this.#imgRect.height) / 2); // prettier-ignore
    } else {
      this.#imgRect.width = Math.round(this.#image.width * (this.stageHeight / this.#image.height)); // prettier-ignore
      this.#imgRect.height = this.stageHeight;
      this.#imgRect.x = Math.round((this.stageWidth - this.#imgRect.width) / 2);
      this.#imgRect.y = 0;
    }
  }

  #initDotItems() {
    const columnCount = Math.ceil(this.stageWidth / this.#pixelSize);
    const rowCount = Math.ceil(this.stageHeight / this.#pixelSize);
    const imgData = this.ctx.getImageData(0, 0, this.stageWidth, this.stageHeight); // prettier-ignore
    let x, y, r, g, b, pixelIndex;

    this.#dotItems = [];

    for (let i = 0; i < rowCount; i++) {
      y = (i + 0.5) * this.#pixelSize;
      y = Math.max(Math.min(y, this.stageHeight), 0);

      for (let j = 0; j < columnCount; j++) {
        x = (j + 0.5) * this.#pixelSize;
        x = Math.max(Math.min(x, this.stageWidth), 0);

        pixelIndex = (x + y * this.stageWidth) * 4;
        r = imgData.data[pixelIndex + 0];
        g = imgData.data[pixelIndex + 1];
        b = imgData.data[pixelIndex + 2];

        this.#dotItems.push(
          new Dot({x, y}, this.#radius, this.#pixelSize, `rgb(${r}, ${g}, ${b})`)
        ); // prettier-ignore
      }
    }
  }

  animate() {
    this.#ripple.animate(this.ctx);

    this.#dotItems.forEach(
      (dotItem) => collide(dotItem.pos, this.#clickedPos, this.#ripple.radius) && dotItem.animate(this.ctx)
    ); // prettier-ignore
  }

  onClick = (clickEvent) => {
    this.clearCanvas();

    this.#dotItems.forEach((dotItem) => dotItem.reset());
    this.#drawImage();
    this.#clickedPos = { x: clickEvent.offsetX, y: clickEvent.offsetY };
    this.#ripple.initRipple(this.#imgRect, {x:clickEvent.offsetX, y:clickEvent.offsetY}); // prettier-ignore
  };

  #drawImage() {
    this.ctx.drawImage(
      this.#image,
      0, 0,
      this.#image.width, this.#image.height,
      this.#imgRect.x, this.#imgRect.y,
      this.#imgRect.width, this.#imgRect.height
    ); // prettier-ignore
  }
}
