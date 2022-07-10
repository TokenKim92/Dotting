import { Ripple } from './ripple.js';
import { Dot } from './dot.js';
import { collide, getBWValue } from './utils.js';

class App {
  #canvas;
  #ctx;
  #pixelRatio;
  #radius;
  #pixelSize;
  #dots = [];
  #isLoaded;
  #imgPos;
  #image;
  #ripple;
  #stageWidth;
  #stageHeight;
  #clickedPos;
  #pluckCount;
  #maxPluckCount;

  constructor() {
    this.#pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    this.#radius = 10;
    this.#pixelSize = 24;

    this.#isLoaded = false;
    this.#imgPos = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
    this.#clickedPos = {
      x: 0,
      y: 0,
    };

    this.#canvas = document.createElement('canvas');
    this.#ctx = this.#canvas.getContext('2d');
    document.body.append(this.#canvas);

    this.#ripple = new Ripple(10);

    this.#image = new Image();
    this.#image.src = 'imgs/gogh2.jpg';
    this.#image.onload = () => {
      this.#isLoaded = true;
      this.drawImage();
    };

    this.#canvas.addEventListener('click', this.onClick.bind(this), false);
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();
  }

  resize() {
    this.#stageWidth = document.body.clientWidth;
    this.#stageHeight = document.body.clientHeight;

    this.#canvas.width = this.#stageWidth * this.#pixelRatio;
    this.#canvas.height = this.#stageHeight * this.#pixelRatio;
    this.#ctx.scale(this.#pixelRatio, this.#pixelRatio);

    if (this.#isLoaded) {
      this.drawImage();
    }
  }

  drawImage() {
    const stageRatio = this.#stageWidth / this.#stageHeight;
    const imgRatio = this.#image.width / this.#image.height;

    if (imgRatio > stageRatio) {
      this.#imgPos.width = this.#stageWidth;
      this.#imgPos.height = Math.round(this.#image.height * (this.#stageWidth / this.#image.width)); // prettier-ignore
      this.#imgPos.y = Math.round( (this.#stageHeight - this.#imgPos.height) / 2); // prettier-ignore
    } else {
      this.#imgPos.width = Math.round(this.#image.width * (this.#stageHeight / this.#image.height)); // prettier-ignore
      this.#imgPos.height = this.#stageHeight;
      this.#imgPos.x = Math.round((this.#stageWidth - this.#imgPos.width) / 2);
    }

    this.#ctx.drawImage(
      this.#image,
      0, 0,
      this.#image.width, this.#image.height,
      this.#imgPos.x, this.#imgPos.y,
      this.#imgPos.width, this.#imgPos.height
    ); // prettier-ignore

    this.drawDots();
  }

  drawDots() {
    const columns = Math.ceil(this.#stageWidth / this.#pixelSize);
    const rows = Math.ceil(this.#stageHeight / this.#pixelSize);
    const imgData = this.#ctx.getImageData(0, 0, this.#stageWidth, this.#stageHeight); // prettier-ignore
    let x, y, r, g, b, pixelIndex;

    this.#dots = [];

    for (let i = 0; i < rows; i++) {
      y = (i + 0.5) * this.#pixelSize;
      y = Math.max(Math.min(y, this.#stageHeight), 0);

      for (let j = 0; j < columns; j++) {
        x = (j + 0.5) * this.#pixelSize;
        x = Math.max(Math.min(x, this.#stageWidth), 0);

        pixelIndex = (x + y * this.#stageWidth) * 4;
        r = imgData.data[pixelIndex + 0];
        g = imgData.data[pixelIndex + 1];
        b = imgData.data[pixelIndex + 2];

        this.#dots.push(
          new Dot(x, y, this.#radius, this.#pixelSize, r, g, b, getBWValue(r, g, b, false))
        ); // prettier-ignore
      }
    }
  }

  animate() {
    this.#ripple.animate(this.#ctx);
    for (let i = 0; i < this.#dots.length; i++) {
      const dot = this.#dots[i];
      if (
        collide(
          dot.x,
          dot.y,
          this.#clickedPos.x,
          this.#clickedPos.y,
          this.#ripple.radius
        )
      ) {
        dot.animate(this.#ctx);
      }
    }

    if (this.#pluckCount < this.#maxPluckCount) {
      window.requestAnimationFrame(this.animate.bind(this));
      this.#pluckCount++;
    }
  }

  onClick(e) {
    this.#ctx.clearRect(0, 0, this.#stageWidth, this.#stageHeight);

    for (let i = 0; i < this.#dots.length; i++) {
      this.#dots[i].reset();
    }

    this.#ctx.drawImage(
      this.#image,
      0, 0,
      this.#image.width, this.#image.height,
      this.#imgPos.x, this.#imgPos.y,
      this.#imgPos.width, this.#imgPos.height
    ); // prettier-ignore

    this.#pluckCount = 0;
    this.#clickedPos = { x: e.offsetX, y: e.offsetY };
    this.#maxPluckCount = this.#ripple.initRipple(
      this.#imgPos,
      e.offsetX,
      e.offsetY
    );

    window.requestAnimationFrame(this.animate.bind(this));
  }
}

window.onload = () => {
  new App();
};
