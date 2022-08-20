import { Ripple } from './ripple.js';
import Dot from './dot.js';
import { collide, getBWValue } from './utils.js';
import BaseCanvas from './lib/baseCanvas.js';

export default class App extends BaseCanvas {
  #radius = 10;
  #pixelSize = 24;
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

  constructor() {
    super(true);

    this.#ripple = new Ripple(10);

    this.#image = new Image();
    this.#image.src = 'imgs/gogh2.jpg';
    this.#image.onload = () => {
      this.#isLoaded = true;
      this.#init();
    };

    this.addEventToCanvas('click', this.onClick);
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    super.resize();

    this.#isLoaded && this.#init();
  }

  #init() {
    this.#calculateImageRect();
    this.#drawImage();
    this.#initDotItems();
  }

  #calculateImageRect() {
    const stageRatio = this.stageWidth / this.stageHeight;
    const imgRatio = this.#image.width / this.#image.height;

    if (imgRatio > stageRatio) {
      this.#imgRect.width = this.stageWidth;
      this.#imgRect.height = Math.round(this.#image.height * (this.stageWidth / this.#image.width)); // prettier-ignore
      this.#imgRect.y = Math.round( (this.stageHeight - this.#imgRect.height) / 2); // prettier-ignore
    } else {
      this.#imgRect.width = Math.round(this.#image.width * (this.stageHeight / this.#image.height)); // prettier-ignore
      this.#imgRect.height = this.stageHeight;
      this.#imgRect.x = Math.round((this.stageWidth - this.#imgRect.width) / 2);
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

    window.requestAnimationFrame(this.animate.bind(this));
  }

  onClick = (clickEvent) => {
    this.clearCanvas();

    this.#dotItems.forEach((dotItem) => dotItem.reset());
    this.#drawImage();
    this.#clickedPos = { x: clickEvent.offsetX, y: clickEvent.offsetY };
    this.#ripple.initRipple(this.#imgRect, clickEvent.offsetX, clickEvent.offsetY); // prettier-ignore
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

window.onload = () => {
  new App();
};
