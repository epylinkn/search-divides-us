class Prompt {
  draw() {
    let yHeight;

    background(lever, 0,0,width,height);
    fill(255);
    push();
      imageMode(CENTER);
      image(you, width-240, 200, 150,150);
      textSize(20);
      fill(255);
      text('YOU',width-240, 320);
    pop();
    // yHeight = height / 2 - 300;
    // textSize(24);
    // text(
    //   'Based on your demographic data...',
    //   width/2,
    //   yHeight,
    // );

    // yHeight = height / 2 - 250;
    // textSize(18);
    // text("income is " + incomeValues[selections.income], width/2, yHeight);
    // text("race is " + raceValues[selections.race], width/2, yHeight + 30);
    // text("education is " + educationValues[selections.education], width/2, yHeight + 60);
    //
    // yHeight = height / 2;
    // textSize(16);
    // text("We have included (and excluded you) from search results in different neighborhoods.", width/2, yHeight - 20)
    // text("What do you think? Does this neighborhood match the ideal place you would like to live?", width/2, yHeight + 10)
    //
    // displayInstruction("PULL THE LEVER TO TRY AS SOMEONE DIFFERENT");
  }

  keyPressed() {
    switch(key) {
      case 'P':
        randomSound.play();

        selections = {
          income: floor(random(incomeValues.length)),
          race: floor(random(raceValues.length)),
          education: floor(random(educationValues.length)),
        }

        changeYou();
        this.sceneManager.showScene( Game );
        break;
    }
  }
}
