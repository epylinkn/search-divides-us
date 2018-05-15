class RandomProfile extends GenericScene {
  setup() {
    this.incomeLabel = select("#inc-label")
    this.raceLabel = select("#race-label")
    this.educationLabel = select("#edu-label")
  }

  enter() {
    super.enter()
    randomSound.onended(this.soundEndHandler.bind(this));
    randomSound.play();
    select(".foo").show();

    this.randomizing = true;
  }

  leave() {
    select(".foo").hide();

    clearTimeout(this.stopPulsingTimer);
    clearTimeout(this.sceneEndTimer);

    this.stopPulsing = false;
  }

  draw() {
    background(browser,1);
    fill(255);

    if (you) {
      let size = this.getProfileSize()
      push()
      imageMode(CENTER)
      image(you, width/2,height/2-70,size,size);
      pop()
    }
  }

  getProfileSize() {
    if (this.randomizing || this.stopPulsing) return 220;

    return 220 + 20 * sin(millis() / 100)
  }

  soundEndHandler() {
    this.randomizing = false;

    this.stopPulsingTimer = setTimeout(function() {
      this.stopPulsing = true;
    }.bind(this), 2000);

    this.sceneEndTimer = setTimeout(function() {
      mgr.showScene( Searching )
    }, 3000);
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
    }

    changeYou();
  }}
