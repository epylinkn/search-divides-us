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
  }

  leave() {
    select(".foo").hide();

    clearTimeout(this.stopPulsingTimer);
    clearTimeout(this.sceneEndTimer);

    this.stopRandomizing = false;
    this.stopPulsing = false;
  }

  draw() {
    if (frameCount % 20 == 0) {
      this.randomizeSelections();
    }

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
    if (!this.stopRandomizing || this.stopPulsing) return 220;

    return 220 + 20 * sin(millis() / 100)
  }

  soundEndHandler() {
    this.stopRandomizing = true;

    this.stopPulsingTimer = setTimeout(function() {
      this.stopPulsing = true;
    }.bind(this), 2000);

    this.sceneEndTimer = setTimeout(function() {
      mgr.showScene( Searching )
    }, 3000);
  }

  randomizeSelections() {
    if (this.stopRandomizing) {
      return;
    }

    let newIncomeSelection;
    let newRaceSelection;
    let newEducationSelection;

    do {
      newIncomeSelection = incomeValues.indexOf(random(incomeValues))
    } while (newIncomeSelection == selections.income)

    do {
      newRaceSelection = raceValues.indexOf(random(raceValues))
    } while (newRaceSelection == selections.race)

    do {
      newEducationSelection = educationValues.indexOf(random(educationValues))
    } while (newEducationSelection == selections.education)

    selections.income = newIncomeSelection;
    selections.race = newRaceSelection;
    selections.education = newEducationSelection;

    this.incomeLabel.html(incomeLabels[selections.income]);
    this.raceLabel.html(raceLabels[selections.race]);
    this.educationLabel.html(educationLabels[selections.education]);

    changeYou();
  }
}
