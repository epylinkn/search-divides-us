class Profile extends GenericScene {
  enter() {
    super.enter()
    select(".foo").show();
  }

  leave() {
    select(".foo").hide();
  }

  draw() {
    background(browser,1);

    push();
    fill(255);

    // textSize(30);
    // text(
    //   squish(`YOUR PROFILE`),
    //   width/2,
    //   height/4 - 100
    //
    // );

    textSize(16);
    textLeading(28);

    text(
      squish(`Tell us about yourself so we can give you
      the best possible search experience.`),
      width/2,
      height/4 - 50
    );

    // TODO: animate profile as selections change
    imageMode(CENTER)
    image(you, width/2,height/2-70,220,220);

    tint(255, 255);  // Display at FULL opacity
    image(button_search, width/2,height-100,285,65)
    pop();

    select("#inc-label").html(placeholder(incomeLabels[selections.income]));
    select("#race-label").html(placeholder(raceLabels[selections.race]));
    select("#edu-label").html(placeholder(educationLabels[selections.education]));

    // displayInstruction("TURN KNOBS AND THEN PRESS ENTER TO FIND A NEIGHBORHOOD");
  }

  canSeeNextScene() {
    if (selections.income == undefined ||
        selections.race == undefined ||
        selections.education == undefined) {
      return false;
    } else {
      return true;
    }
  }

  keyPressed() {
    changeYou();
    switch(key) {
      //== Income
      case 'Q':
        selections.income = 0;
        break;
      case 'W':
        selections.income = 1;
        break;
      case 'E':
        selections.income = 2;
        break;
      case 'R':
        selections.income = 3;
        break;

      //== Race
      case 'A':
        selections.race = 0;
        break;
      case 'S':
        selections.race = 1;
        break;
      case 'D':
        selections.race = 2;
        break;
      case 'F':
        selections.race = 3;
        break;
      case 'G':
        selections.race = 4;
        break;

      //== Education
      case 'Z':
        selections.education = 0;
        break;
      case 'X':
        selections.education = 1;
        break;
      case 'C':
        selections.education = 2;
        break;
      case 'V':
        selections.education = 3;
        break;
      case 'B':
        selections.education = 4;
        break;

      case 'I':
        break;
      case 'O':
        if (this.canSeeNextScene()) {
          buttonSound.play();
          this.sceneManager.showNextScene();
        } else {
          Debug.debounceTitle("Fill everything out, doofus.")
        }
        break;
      case 'P':
        break;
    }
  }
}
