import './webpack/dist/dotting.min.js';

window.onload = () => {
  new AppBuilder().url('./imgs/gogh1.jpg').rippleSpeed(10).build();
};

class AppBuilder {
  #app;
  #speed;
  #url;

  url(url) {
    this.#url = url;
    return this;
  }

  rippleSpeed(speed) {
    this.#speed = speed;
    return this;
  }

  build() {
    this.#app = new Dotting(this.#url, this.#speed);
    window.addEventListener('resize', this.resize.bind(this), false);
    window.requestAnimationFrame(this.animate);

    return this.#app;
  }

  animate = () => {
    this.#app.animate();
    window.requestAnimationFrame(this.animate);
  };

  resize = () => {
    this.#app.resize();
  };
}
