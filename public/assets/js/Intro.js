class Intro extends GenericScene {
  enter() {
    super.enter()
    this.enteredAt = millis();
    this.teaserFrame = 0;

    frameRate(10)
    this.drawOnce();
  }

  drawOnce() {
    background(browser, 1);
  }

  leave() {
    frameRate(60)
  }

  draw() {
    let currentMillis = millis();

    let teaserFrame = floor((currentMillis - this.enteredAt) / 500 % mapTeaser.length);
    image(mapTeaser[teaserFrame], 0, 0, width, height);

    image(welcome, 0, 0, width, height)
  
  }

  keyPressed() {
    switch(key) {
      case 'O':
        buttonSound.play();
        this.sceneManager.showNextScene();
        break;
    }
  }
}
