class Intro extends GenericScene {
  setup() {
    this.fadeTime = 2*1000;
  }

  enter() {
    super.enter()
    this.enteredAt = millis();
    this.fadeInAt = this.enteredAt + 3*1000;
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

    if (currentMillis > this.fadeInAt) {
      let diff = constrain(currentMillis - this.fadeInAt, 0, this.fadeTime)
      let alpha = map(diff, 0, this.fadeTime, 0, 255)

      push()
      tint(255, alpha)
      image(welcome, 0, 0, width, height)
      pop()
    }
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
