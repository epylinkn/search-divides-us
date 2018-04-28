class Profile {
  enter() {
    select(".foo").show();
  }

  leave() {
    select(".foo").hide();
  }

  draw() {
    background(0);
    fill(255);

    text(
      squish(`Like all search engines, we collect data about our users
      to give you the best possible search experience.
      Please tell us a little bit about yourself to receive your personalized result.`),
      width/2,
      height/4 - 30
    );

    // TODO: animate profile as selections change
    image(you, width/2-100,height/3,200,200);


    let yHeight = height / 2 + 60;
    textSize(20);
    text("TURN KNOBS AND THEN PRESS ENTER TO FIND A HOME", width/2, height-100);

    select("#race-label").html(placeholder(raceLabels[selections.race]));
    select("#inc-label").html(placeholder(incomeLabels[selections.income]));
    select("#edu-label").html(placeholder(educationLabels[selections.education]));
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
        you = blackf;
        break;
      case 'S':
        selections.race = 1;
        you = hispf;
        break;
      case 'D':
        selections.race = 2;
        you = hispf;
        break;
      case 'F':
        selections.race = 3;
        you = asianf;

        break;
      case 'G':
        selections.race = 4;
        you = whitef;

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

      case 'I':
        // TODO: ?
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
