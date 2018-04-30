class Prompt extends GenericScene {
  enter() {
    super.enter()

    this.drawOnce()
  }

  drawOnce() {
    background(lever, 0,0,width,height);
  }

  keyPressed() {
    switch(key) {
      case 'P':
        this.sceneManager.showScene( RandomProfile );
        break;
    }
  }
}
