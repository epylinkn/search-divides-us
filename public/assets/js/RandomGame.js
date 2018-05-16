class RandomGame extends GenericScene {
  enter() {
    super.enter()
    this.autoRestart = setTimeout(restartGame, 10 * 1000);

    this.drawOnce()
  }

  drawOnce() {
    background(browser, 1);
    image(mapImage, 0,0,width,height);

    push();
    imageMode(CENTER)
    image(mask, width/2, height/2, width, height);
    image(you, 185, 290, 140,140);
    pop();
  }

  leave() {
    clearTimeout(this.autoRestart);
  }

  keyPressed() {
    switch(key) {
      case 'O':
        buttonSound.play();
        this.sceneManager.showScene(Outro);
        break;
      case 'P':
        this.sceneManager.showScene(RandomProfile);
        break;
    }
  }
}
