class Prompt {
  setup() {

  }

  draw() {
    background(0);
    button(width/2,height-100, "I'M FEELING LUCKY");

    fill(255);
    text("What did you think of your results? What if you tried something different?", width/2, height/2);
  }

  keyPressed() {
    switch(key) {
      case 'P':
        selections = {
          income: random(incomeLabels.length),
          race: random(raceLabels.length),
          education: random(educationLabels.length),
        }

        this.sceneManager.showScene( Game );
        break;
    }
  }
}
