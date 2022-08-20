import { distance } from './utils.js';

export default class Ripple {
  #speed;
  #radius;
  #maxRadius;

  constructor(speed) {
    this.#speed = speed;
  }

  initRipple(imgPos, pos) {
    this.#radius = 0;
    this.#maxRadius = this.#getMaxDistance(imgPos, pos);
  }

  animate() {
    this.#isAchieved || (this.#radius += this.#speed);
  }

  #getMaxDistance(imgPos, pos) {
    const fromLeftTop = distance(imgPos, pos);
    const fromRightTop = distance({x : imgPos.x + imgPos.width, y: imgPos.y}, pos); // prettier-ignore
    const fromLeftBottom = distance({x : imgPos.x, y : imgPos.y + imgPos.height}, pos); // prettier-ignore
    const fromRightBottom = distance({x: imgPos.x + imgPos.width, y: imgPos.y + imgPos.height}, pos); // prettier-ignore

    return Math.max(fromLeftTop, fromRightTop, fromLeftBottom, fromRightBottom);
  }

  get #isAchieved() {
    return this.#radius >= this.#maxRadius;
  }

  get radius() {
    return this.#radius;
  }
}
