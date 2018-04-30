class Outro extends GenericScene {
  enter() {
    super.enter()
    this.autoRestart = setTimeout(restartGame, 16 * 1000);
  }

  leave() {
    clearTimeout(this.autoRestart);
  }

  draw() {
    background(outro,0,0,width,height);
  }
}
