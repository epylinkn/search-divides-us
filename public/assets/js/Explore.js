class Explore extends GenericScene {
  enter() {
    super.enter()

    this.drawOnce()
  }

  drawOnce() {
    background(explore, 0,0,width,height);
  }

  keyPressed() {
    switch(key) {
      case 'O':
        buttonSound.play();
        this.sceneManager.showScene(Prompt);
        break;
    }
  }
}
