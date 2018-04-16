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
    if (!selections || Object.keys(selections).length == 0) return;

    let i = 0;
    let yHeight = windowHeight / Object.keys(selections).length;
    for (let key in selections) {
      let selection = selections[key];
      push()
      fill('magenta')
      textAlign(CENTER, CENTER)
      textSize(64)
      text(key + ": " + selection, 300, i * yHeight, windowWidth, windowHeight)
      pop()

      i++;
    }
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
