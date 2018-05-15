class Profile extends GenericScene {
  setup() {
    this.incomeLabel = select("#inc-label");
    this.raceLabel = select("#race-label");
    this.educationLabel = select("#edu-label");
  }

  enter() {
    super.enter()
    select(".foo").show();

    this.drawOnce();
  }

  leave() {
    select(".foo").hide();
  }

  drawOnce() {
    push();

    background(browser,1);

    imageMode(CENTER);
    fill(255);
    textSize(18);
    textLeading(28);
    text(
      squish(`Tell us about yourself so we can give you
      the best possible search experience.`),
      width/2,
      height/4 - 55
    );

    tint(255, 255);  // Display at FULL opacity
    image(button_search, width/2,height-100,285,65)

    pop();
  }

  draw() {
    push()
    imageMode(CENTER)
    image(you, width/2,height/2-70,220,220);
    pop()
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
        this.incomeLabel.html(incomeLabels[selections.income]);
        break;
      case 'W':
        selections.income = 1;
        this.incomeLabel.html(incomeLabels[selections.income]);
        break;
      case 'E':
        selections.income = 2;
        this.incomeLabel.html(incomeLabels[selections.income]);
        break;
      case 'R':
        selections.income = 3;
        this.incomeLabel.html(incomeLabels[selections.income]);
        break;

      //== Race
      case 'A':
        selections.race = 0;
        this.raceLabel.html(raceLabels[selections.race]);
        break;
      case 'S':
        selections.race = 4;
        this.raceLabel.html(raceLabels[selections.race]);
        break;
      case 'D':
        selections.race = 3;
        this.raceLabel.html(raceLabels[selections.race]);
        break;
      case 'F':
        selections.race = 1;
        this.raceLabel.html(raceLabels[selections.race]);
        break;
      case 'G':
        selections.race = 2;
        this.raceLabel.html(raceLabels[selections.race]);
        break;

      //== Education
      case 'Z':
        selections.education = 0;
        this.educationLabel.html(educationLabels[selections.education]);
        break;
      case 'X':
        selections.education = 1;
        this.educationLabel.html(educationLabels[selections.education]);
        break;
      case 'C':
        selections.education = 2;
        this.educationLabel.html(educationLabels[selections.education]);
        break;
      case 'V':
        selections.education = 3;
        this.educationLabel.html(educationLabels[selections.education]);
        break;
      case 'B':
        selections.education = 4;
        this.educationLabel.html(educationLabels[selections.education]);
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
    changeYou();
  }
}
