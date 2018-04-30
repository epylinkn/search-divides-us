class RandomProfile extends GenericScene {
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

    select("#inc-label").html(placeholder(incomeLabels[selections.income]));
    select("#race-label").html(placeholder(raceLabels[selections.race]));
    select("#edu-label").html(placeholder(educationLabels[selections.education]));
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

    changeYou();
  }
}
