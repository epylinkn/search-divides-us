let mlModel = new MLModel();
let mlPredictions = [];

let unlabeledData = [
  // ["race", "education", "income"],
  ["other", "high-school", "middle"],
  ["black", "bachelors", "upper"],
  ["hispanic", "less-than-high-school", "upper-middle"],
  ["white", "some-college", "middle"],
]

let xs = [];
let ys = [];

class ModelTrainer {
  enter() {
    this.$form = select('.model-trainer-form');
    if (this.trained) {
      this.$form.show();
    } else {
      this.$form.hide();
    }
  }

  leave() {
    this.$form.hide();
  }

  setup() {
    this.trained = false;
    this.dataIndex = 0;
    this.mapWidth = windowWidth * .60;
    this.mapHeight = windowHeight;

    this.trainButton = select('#train')
    this.trainButton.mousePressed(this.handleTrain.bind(this))
    this.predictionButton = select('#predict')
    this.predictionButton.mousePressed(this.handlePrediction.bind(this))
  }

  draw() {
    background('#16161D');
    fill("c0ffee")

    if (!this.trained) {
      this.drawLabeler();
    } else {
      this.drawPredictor();
    }
  }

  drawPredictor() {
    push()

    rectMode(CORNER)

    fill("yellow")
    rect(0, 0, this.mapWidth, this.mapHeight);

    if (mlPredictions.length === 0) return;

    for (let i = 0; i < mlPredictions.length; i++) {
      let prediction = mlPredictions[i];
      let x = prediction[0];
      let y = this.mapHeight - prediction[1];

      fill('magenta');
      ellipse(x, y, 30, 30);
      fill('white');
      textAlign(CENTER, CENTER);
      text(i + 1, x - 15, y - 15, 30, 30);
    }

    pop()
  }

  drawLabeler() {
    push()

    rectMode(CORNER)
    rect(0, 0, this.mapWidth, this.mapHeight);

    textAlign(CENTER, TOP);
    let prompt = unlabeledData[this.dataIndex]

    if (mouseX < this.mapWidth) {
      let mouseXNormalized = mouseX / this.mapWidth;
      prompt = prompt.concat(["x: " + mouseXNormalized.toFixed(2) ])
    } else {
      prompt = prompt.concat(["x: OUT OF BOUNDS"])
    }

    if (mouseY < this.mapHeight) {
      let mouseYNormalized = (this.mapHeight - mouseY) / this.mapHeight;
      prompt = prompt.concat(["y: " + mouseYNormalized.toFixed(2) ])
    } else {
      prompt = prompt.concat(["y: OUT OF BOUNDS"])
    }

    prompt = prompt.join("\n\n")

    textSize(24)
    text(
      prompt,
      height * .60,
      0,
      width - (height * .60),
      height
    )

    fill('magenta')
    ellipse(mouseX, mouseY, 20, 20)

    pop();
  }

  mousePressed() {
    if (this.trained) return;

    let predX = mouseX;
    let predY = height - mouseY;
    ys.push([predX, predY]);

    xs.push([
      raceValues.indexOf(unlabeledData[this.dataIndex][0]),
      educationValues.indexOf(unlabeledData[this.dataIndex][1]),
      incomeValues.indexOf(unlabeledData[this.dataIndex][2]),
    ])

    this.dataIndex += 1;

    if (this.dataIndex == unlabeledData.length) {
      this.trained = true;
      this.$form.show();
    }
  }

  async handleTrain() {
    await mlModel.train(xs, ys);
  }

  async handlePrediction() {
    let race = select('.predict-race').value()
    let education = select('.predict-education').value()
    let income = select('.predict-income').value()

    let xx = [
      parseInt(race),
      parseInt(education),
      parseInt(income),
    ];

    let prediction = await mlModel.predict(xx);

    mlPredictions.push(prediction)
  }
}
