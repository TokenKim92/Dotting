import './webpack/dist/dotting.min.js';

window.onload = () => {
  new AppBuilder().url('./imgs/yeji.png').build();
};

class AppBuilder {
  #app;
  #url;

  url(url) {
    this.#url = url;
    return this;
  }

  build() {
    WebFont.load({
      google: { families: ['Fjalla One'] },
      fontactive: () => {
        this.#app = new Dotting(this.#url, 'Fjalla One');
        window.addEventListener('resize', this.resize.bind(this), false);
        window.requestAnimationFrame(this.animate);
      },
    });
  }

  animate = (curTime) => {
    this.#app.animate(curTime);
    window.requestAnimationFrame(this.animate);
  };

  resize = () => {
    this.#app.resize();
  };
}
