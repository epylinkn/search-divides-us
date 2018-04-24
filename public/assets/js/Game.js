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
    background(mapImage, 1);

    if (!this.neighborhood) {
      // TODO: loading bar
      return;
    }

    image(this.mask, 0, 0, width, height);
    image(you, width-100, 0, 100, 100);
  }
}
