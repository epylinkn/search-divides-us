class Searching {
  async enter() {
    this.loadingEndAt = millis() + 2000;

    let prediction = await mlModel.predict([
      selections.race,
      selections.education,
      selections.income
    ])

    let predY = constrain(prediction[1], 0, height);

    // NB. Hacky classifier, let's just deal with predY
    neighborhood = floor(map(predY, 0, height+1, 1, 7));

    if (firstPlay == true) {
      mask = masks[neighborhood - 1];
    } else {
      mask = randommasks[neighborhood - 1];
    }
  }

  draw() {
    let currentMillis = millis();
    if (neighborhood && currentMillis > this.loadingEndAt) {
      if (firstPlay == true){
        mgr.showScene(Game);
      } else {
        mgr.showScene(RandomGame)
      }
    }

    push()

    background(browser, 1);
    imageMode(CENTER)
    image(searchIcon, width/2, height/2, 200, 200);

    let xStart = width / 2 - 225;
    let xWidth = 50;
    noStroke();
    fill('white')
    for (let i = 0; i < 10; i ++) {
      let hundredths = floor(currentMillis % 1000 / 100)
      let size = (i == hundredths) ? 50 : 20;
      ellipse(xStart + i * xWidth, height/2 + 150, size, size)
    }

    pop()
  }
}
