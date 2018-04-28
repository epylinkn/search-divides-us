class Game {
  async enter() {
    let prediction = await mlModel.predict([
      selections.race,
      selections.education,
      selections.income
    ])

    console.log(prediction)
    let predY = prediction[1];

    // NB. Hacky classifier, let's just deal with predY
    this.neighborhood = map(predY, 0, height+1, 7, 1)
    this.mask = masks[floor(this.neighborhood - 1)]
    console.log(this.mask)
  }

  draw() {
    background(browser, 1);
    image(mapImage, 0,0,width,height);
    if (!this.neighborhood) {
      // TODO: loading bar
      return;
    }
push();
imageMode(CENTER)
    image(this.mask, width/2, height/2, width,height);
pop();
    image(you, 1350, 80, 100,100);
  }
}
