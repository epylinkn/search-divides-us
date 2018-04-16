class Profile {
  draw() {
    background(0);

    button(width/2,height-100, "SEARCH");

    fill(255);
    text("First, tell us a little bit about who you are.", width/2, height/4);
    image(you, width/2-100,height/4+30,200,200);

    let yHeight = height / 2;
    textSize(14);
    text("income is " + incomeLabels[selections.income], width/2, yHeight);
    text("race is " + raceLabels[selections.race], width/2, yHeight + 24);
    text("education is " + educationLabels[selections.education], width/2, yHeight + 48);
    text("you are this person!", width/2, yHeight + 72);

    // TODO: replace this with sprite layers??
    // if (race >= 0 && race< 250) {
    //   if (edu >= inc){
    //     you = blackf;
    //   }
    //
    //   else if (edu < inc){
    //     you = blackm;
    //   }
    // }
    //
    // if (race >= 250 && race< 500) {
    //   if (edu >= inc){
    //     you = whitef;
    //   }
    //
    //   if (edu < inc){
    //     you = whitem;
    //   }
    // }
    //
    // if (race >= 500 && race<750) {
    //   if (edu >= inc){
    //     you = asianf;
    //   }
    //
    //   if (edu < inc){
    //     you = asianm;
    //   }
    // }
    //
    // if (race >= 750 && race<1000) {
    //   if (edu >= inc){
    //     you = hispf;
    //   }
    //
    //   if (edu < inc){
    //     you = hispm;
    //   }
    // }
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
