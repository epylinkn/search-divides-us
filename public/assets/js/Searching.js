class Searching {
  async enter() {
    this.loadingEndAt = millis() + 3000;

    let prediction = await mlModel.predict([
      selections.race,
      selections.education,
      selections.income
    ])

    console.log(prediction)
    let predY = prediction[1];

    // NB. Hacky classifier, let's just deal with predY
    neighborhood = map(predY, 0, height+1, 7, 1)
    mask = masks[floor(neighborhood - 1)]
    console.log(mask)
  }

  draw() {
    let currentMillis = millis();
    if (neighborhood && currentMillis > this.loadingEndAt) {
      mgr.showNextScene();
    }

    push()

    background(browser, 1);
    imageMode(CENTER)
    image(searchIcon, width/2, height/2, 200, 200);

    let xStart = width / 2 - 250;
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
