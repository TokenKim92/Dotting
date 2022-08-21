import { distance } from './utils.js';

export default class Ripple {
  #speed;
  #radius = 0;
  #maxRadius = 0;
  #time;
  #FPS;

  constructor(time, FPS = 60) {
    this.#time = time;
    this.#FPS = FPS;
  }

  init(imgPos, pos) {
    this.#radius = 0;
    this.#maxRadius = this.#getMaxDistance(imgPos, pos);
    this.#speed = this.#calculateSpeed(this.#maxRadius);
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

  #calculateSpeed(maxRadius) {
    const FPS_TIME = 1000 / this.#FPS;
    return maxRadius / (FPS_TIME * this.#time);
  }

  stop() {
    this.#radius = 0;
    this.#maxRadius = 0;
  }

  get #isAchieved() {
    return this.#radius >= this.#maxRadius;
  }

  get radius() {
    return this.#radius;
  }
}
