class Outro extends GenericScene {
  enter() {
    super.enter()
    this.autoRestart = setTimeout(restartGame, 16 * 1000);

    this.drawOnce();
  }

  leave() {
    clearTimeout(this.autoRestart);
  }

  drawOnce() {
    background(outro,0,0,width,height);
  }
}
