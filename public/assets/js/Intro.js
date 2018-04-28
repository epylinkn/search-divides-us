class Intro {
  draw() {
    rectMode(CENTER)
    background(browser,1);
    image(mapImage,0,0,width, height);
    fill(255);
    // rect(width/2, height/2, 0.7 * width, 250);

    fill(0);
    textSize(20);
    // text("Welcome to PHP: Personalized Housing Provider!", width/2, height/2-60);
    //
    // textSize(16);
    // text("We're a new kind of search engine.", width/2, height/2 - 20);
    // text("And we want to help you find the perfect home.", width/2, height/2 + 10);
    image(welcome, 0,0, width,height)
    // textSize(28);
    // text("PRESS ENTER TO START", width/2, height/2+80);
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
      case 'P':
      case 'CATCH':
        this.sceneManager.showNextScene();
        break;
    }
  }
}
