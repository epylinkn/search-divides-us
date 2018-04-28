class Game {
  draw() {
    background(browser, 1);
    image(mapImage, 0,0,width,height);

    push();

    imageMode(CENTER)
    image(mask, width/2, height/2, width, height);
    image(you, width-240, 200, 150,150);
    textSize(20);
    fill(255);
    text('YOU',width-240, 320)

    pop();
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
