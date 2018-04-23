function squish(str) {
  return str.replace(/ +(?= )/g,'');
}

function placeholder(str) {
  return (str === undefined) ? "---" : str;
}

class Profile {
  draw() {
    background(0);

    fill(255);

    text(
      squish(`Like all search engines, we collect data about our users
      to give you the best possible search experience.`),
      width/2,
      height/4 - 30
    );

    // TODO: animate profile as selections change
    // image(you, width/2-100,height/4+30,200,200);

    text("Please tell us a little bit about yourself to receive your personalized result. ", width/2, height/2 + 10);

    let yHeight = height / 2 + 60;
    textSize(14);
    text("income is " + placeholder(incomeLabels[selections.income]), width/2, yHeight);
    text("race is " + placeholder(raceLabels[selections.race]), width/2, yHeight + 24);
    text("education is " + placeholder(educationLabels[selections.education]), width/2, yHeight + 48);
    text("you are this person!", width/2, yHeight + 72);

    text("TURN KNOBS AND THEN PRESS ENTER TO FIND A HOME", width/2, height-100);
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

      case 'I':
        // TODO: ?
        break;
      case 'O':
        if (this.canSeeNextScene()) {
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
