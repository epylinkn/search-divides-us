class Intro {
  draw() {
    background(mapImage,1);
    fill(255);
    rect(width/2,height/2,500,200);
    fill(0);
    text("Welcome to housingsearch.com!", width/2, height/2-30);
    text("We're here to help you find the perfect home. :)", width/2, height/2);
    text("TURN THE KNOBS TO START.", width/2, height/2+40);
    // button(width/2,height/2+50, "START")
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
