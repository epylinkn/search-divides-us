class Prompt {
  draw() {
    let yHeight;

    background(0);
    fill(255);

    yHeight = height / 2 - 300;
    textSize(24);
    text(
      'Based on your demographic data...',
      width/2,
      yHeight,
    );

    yHeight = height / 2 - 250;
    textSize(18);
    text("income is " + incomeLabels[selections.income], width/2, yHeight);
    text("race is " + raceLabels[selections.race], width/2, yHeight + 30);
    text("education is " + educationLabels[selections.education], width/2, yHeight + 60);

    yHeight = height / 2;
    textSize(16);
    text("We have included (and excluded you) from search results in different neighborhoods.", width/2, yHeight - 20)
    text("What do you think? Does this neighborhood match the ideal place you would like to live?", width/2, yHeight + 10)

    yHeight = height - 200;
    textSize(24);
    text("PRESS RANDOM BUTTON TO TRY AS SOMEONE DIFFERENT", width/2, yHeight + 20);
  }

  keyPressed() {
    switch(key) {
      case 'P':
        randomSound.play();

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
