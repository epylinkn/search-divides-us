let message;
let lastTitleAt;

class Debug {
  draw() {
    background(0);
    this.displaySelections();

    if (millis() < lastTitleAt) {
      this.displayTitle(message);
    }
  }

  displaySelections() {
    let spacing = windowWidth / 3;
    ["income", "race", "education"].forEach(function(key) {
      let selection = selections[key];

      push()
      rectMode(CORNER)
      fill('#c0ffee');
      rect(i * spacing, 0, spacing, windowHeight / 3)
      fill('magenta')
      textAlign(CENTER, CENTER)
      textSize(64)
      text(key + ": " + selection, 300, i * yHeight, windowWidth, windowHeight)
      textSize(32);
      text(key, i * spacing, 0, spacing, 100)
      textSize(48);
      text(selection, i * spacing, windowHeight / 6, spacing, 100)
      pop()

      i++;
    });
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

  static debounceTitle(title) {
    lastTitleAt = millis() + 2000;
    message = title;
  }
}
