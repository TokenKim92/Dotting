const PI2 = Math.PI * 2;
const BOUNCE = 0.82;

export class Dot {
  #x;
  #y;
  #targetRadius;
  #radius;
  #radiusV;
  #pixelSize;
  #pixelHalfSize;
  #r;
  #g;
  #b;

  constructor(x, y, radius, pixelSize, r, g, b, scale) {
    this.#x = x;
    this.#y = y;
    this.#targetRadius = radius;
    this.#radius = 0;
    this.#radiusV = 0;
    this.#pixelSize = pixelSize;
    this.#pixelHalfSize = pixelSize / 2;
    this.#r = r;
    this.#g = g;
    this.#b = b;
  }

  animate(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.fillRect(
      this.#x - this.#pixelHalfSize,
      this.#y - this.#pixelHalfSize,
      this.#pixelSize,
      this.#pixelSize
    );

    const accel = (this.#targetRadius - this.#radius) / 2;
    this.#radiusV = (this.#radiusV + accel) * BOUNCE;
    this.#radius += this.#radiusV;

    ctx.beginPath();
    ctx.fillStyle = `rgb(${this.#r}, ${this.#g}, ${this.#b})`;
    ctx.arc(this.x, this.y, this.#radius, 0, PI2, false);
    ctx.fill();
  }

  reset() {
    this.#radius = 0;
    this.#radiusV = 0;
  }

  get x() {
    return this.#x;
  }

  set x(x) {
    this.#x = x;
  }

  get y() {
    return this.#y;
  }

  set y(y) {
    this.#y = y;
  }
}
