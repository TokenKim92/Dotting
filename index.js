//import './webpack/dist/dotting.min.js';
import Dotting from './webpack/src/dotting.js';

window.onload = () => {
  new AppBuilder().url('./imgs/gogh1.jpg').build();
};

class AppBuilder {
  #app;
  #url;

  url(url) {
    this.#url = url;
    return this;
  }

  build() {
    this.#app = new Dotting(this.#url);
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
