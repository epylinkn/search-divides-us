class Intro extends GenericScene {
  setup() {
    this.fadeTime = 2*1000;
  }

  enter() {
    super.enter()
    this.loadingEndAt = millis() + this.fadeTime;
  }

  draw() {
    background(browser,1);
    image(mapTeaser,0,0,width, height);

    let currentMillis = millis();
        let diff = constrain(this.loadingEndAt - currentMillis, 0, this.fadeTime)
        let alpha = map(diff, 0, this.fadeTime, 255, 0)
        console.log(alpha)

        push();
          tint(255,alpha)
          image(welcome, 0,0, width,height)
        pop();

  }

  keyPressed() {
    switch(key) {
      //== Income
      case 'Q':
      case 'W':
      case 'E':
      case 'R':

      //== Race
      case 'A':
      case 'S':
      case 'D':
      case 'F':
      case 'G':

      //== Education
      case 'Z':
      case 'X':
      case 'C':
      case 'V':
      case 'B':

      case 'I':
      case 'O':
        buttonSound.play();
      case 'P':
      case 'CATCH':
        this.sceneManager.showNextScene();
        break;
    }
  }
}
