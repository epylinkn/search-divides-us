class RandomProfile {
  enter() {
    randomSound.onended(this.soundEndHandler.bind(this));
    randomSound.play();
    select(".foo").show();
  }

  leave() {
    this.stopRandomizing = false;
    select(".foo").hide();
  }

  draw() {
    if (frameCount % 20 == 0) {
      this.randomizeSelections();
    }

    background(browser,1);
    fill(255);

    if (you) {
      let size = this.stopRandomizing ? this.pulsingSize() : 200;
      push()
      imageMode(CENTER)
      image(you, width/2,height/2,size,size);
      pop()
    }

    select("#inc-label").html(placeholder(incomeLabels[selections.income]));
    select("#race-label").html(placeholder(raceLabels[selections.race]));
    select("#edu-label").html(placeholder(educationLabels[selections.education]));
  }

  pulsingSize() {
    return 200 + 20 * sin(millis() / 100)
  }

  soundEndHandler() {
    this.stopRandomizing = true;

    setTimeout(function() {
      mgr.showScene( Game )
    }, 2000);
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

    you = youLookup[raceValues[selections.race]] || you;
  }
}
