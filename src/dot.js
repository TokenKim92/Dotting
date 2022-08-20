import { PI2 } from './utils.js';
export default class Dot {
  static BOUNCE = 0.82;

  #pos = {
    x: 0,
    y: 0,
  };
  #targetRadius;
  #currentRadius;
  #radiusVelocity;
  #pixelSize;
  #pixelHalfSize;
  #color;

  constructor(pos, radius, pixelSize, color) {
    this.#pos = pos;

    this.#targetRadius = radius;
    this.#currentRadius = 0;
    this.#radiusVelocity = 0;
    this.#pixelSize = pixelSize;
    this.#pixelHalfSize = pixelSize / 2;
    this.#color = color;
  }

  animate(ctx) {
    this.#clear(ctx);
    this.#calculateRadius();
    this.#draw(ctx);
  }

  #clear(ctx) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(
      this.#pos.x - this.#pixelHalfSize,
      this.#pos.y - this.#pixelHalfSize,
      this.#pixelSize,
      this.#pixelSize
    );
  }

  #calculateRadius() {
    const accel = (this.#targetRadius - this.#currentRadius) / 2;
    this.#radiusVelocity = (this.#radiusVelocity + accel) * Dot.BOUNCE;
    this.#currentRadius += this.#radiusVelocity;
  }

  #draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.#color;
    ctx.arc(this.#pos.x, this.#pos.y, this.#currentRadius, 0, PI2);
    ctx.fill();
  }

  reset() {
    this.#currentRadius = 0;
    this.#radiusVelocity = 0;
  }

  get pos() {
    return this.#pos;
  }
}
