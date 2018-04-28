let message;
let lastTitleAt;

class Debug {
  static debounceTitle(title) {
    lastTitleAt = millis() + 2000;
    message = title;
  }

  draw() {
    background(0);
    this.displaySelections();
    this.displayButtons();

    if (millis() < lastTitleAt) {
      this.displayTitle(message);
    }
  }

  displaySelections() {
    let i = 0;
    let spacing = windowWidth / 3;

    let labelLookup = [
      incomeValues,
      raceValues,
      educationValues
    ];

    ["income", "race", "education"].forEach(function(key) {
      let selection = selections[key];
      if (selection === undefined) {
        selection = 'n/a'
      }

      push()
      rectMode(CORNER)
      fill('#c0ffee');
      rect(i * spacing, 0, spacing, windowHeight / 3)
      fill('magenta')
      textAlign(CENTER, CENTER)
      textSize(32);
      text(key, i * spacing, 0, spacing, 100)
      textSize(48);
      text(selection, i * spacing, 50, spacing, 100)
      textSize(16);
      text(labelLookup[i][selection], i * spacing, 100, spacing, 100)
      pop()

      i++;
    });
  }

  displayButtons() {
    let spacing = windowWidth / 3;
    let buttonKeys = ["I", "O", "P"];
    let yHeight = windowHeight / 6 * 5;

    push()

    for (let i = 0; i < 3; i++) {
      rectMode(CENTER);

      fill('cyan');
      ellipse((i+.5) * spacing, yHeight, 100, 100);

      fill('magenta');
      textAlign(CENTER, CENTER);
      textSize(64);
      text(buttonKeys[i], (i+.5) * spacing, yHeight, spacing, yHeight + 100);
    }

    pop()
  }

  displayTitle(title) {
    push()
    rectMode(CORNER)
    fill('white')
    textAlign(CENTER, CENTER)
    textSize(64)
    text(title, 0, 0, windowWidth, windowHeight)
    pop()
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
        Debug.debounceTitle("RESET PRESSED");
        break;
      case 'O':
        Debug.debounceTitle("SEARCH PRESSED");
        break;
      case 'P':
        Debug.debounceTitle("RANDOM PRESSED");
        break;
    }
  }
}
