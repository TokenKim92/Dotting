import { distance } from './utils.js';

export class Ripple {
  #speed;
  #radius;
  #maxRadius;

  constructor(speed) {
    this.#speed = speed;
  }

  initRipple(imgPos, x, y) {
    this.radius = 0;
    this.#maxRadius = this.getMaxDistance(imgPos, x, y);
  }

  animate() {
    this.#radius += this.#speed * (this.#radius < this.#maxRadius);
  }

  getMaxDistance(imgPos, x, y) {
    const fromLeftTop = distance(imgPos.x, imgPos.y, x, y);
    const fromRightTop = distance(imgPos.x + imgPos.width, imgPos.y, x, y);
    const fromLeftBottom = distance(imgPos.x, imgPos.y + imgPos.height, x, y);
    const fromRightBottom = distance(imgPos.x + imgPos.width, imgPos.y + imgPos.height, x, y); // prettier-ignore

    return Math.max(fromLeftTop, fromRightTop, fromLeftBottom, fromRightBottom);
  }

  get radius() {
    return this.#radius;
  }

  set radius(radius) {
    this.#radius = radius;
  }
}
