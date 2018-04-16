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
      text(selection, i * spacing, windowHeight / 6, spacing, 100)
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
}
