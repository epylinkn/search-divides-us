let mlModel;
let mlPredictions = [];

let unlabeledData = [
  // ["ethnicity", "education", "location"],
  ["native-american", "high-school", "urban"],
  ["black", "bachelor-degree", "urban"],
  ["hispanic", "less-than-high-school", "rural"],
  ["white", "some-college", "suburban"],
  // ["native-american", "bachelor-degree", "urban"],
  // ["native-american", "advanced-degree", "suburban"],
  // ["other", "high-school", "rural"],
  // ["asian", "less-than-high-school", "rural"],
  // ["hispanic", "some-college", "rural"],
  // ["asian", "high-school", "suburban"],
  // ["native-american", "some-college", "suburban"],
  // ["black", "advanced-degree", "suburban"],
  // ["black", "some-college", "rural"],
  // ["black", "less-than-high-school", "rural"],
  // ["native-american", "some-college", "rural"],
  // ["hispanic", "some-college", "suburban"],
  // ["asian", "bachelor-degree", "urban"],
  // ["native-american", "less-than-high-school", "urban"],
  // ["other", "bachelor-degree", "rural"],
  // ["black", "high-school", "rural"],
  // ["other", "less-than-high-school", "suburban"],
  // ["asian", "some-college", "rural"],
  // ["native-american", "high-school", "suburban"],
  // ["other", "some-college", "rural"],
  // ["other", "high-school", "rural"],
  // ["native-american", "some-college", "urban"],
  // ["black", "high-school", "suburban"],
  // ["black", "some-college", "suburban"],
  // ["black", "high-school", "rural"],
  // ["other", "high-school", "suburban"],
  // ["white", "high-school", "rural"],
  // ["black", "high-school", "rural"],
]

class ModelTrainer {
  setup() {
    this.trained = false;
    this.mapWidth = windowWidth * .60;
    this.mapHeight = windowHeight;

    mlModel = tf.sequential();
    mlModel.add(tf.layers.dense({units: 2, inputShape: [2]}));

    // Prepare the model for training: Specify the loss and the optimizer.
    mlModel.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

    // Generate some synthetic data for training.
    let train = async function(xx, yy) {
      const _xs = tf.tensor2d(xx);
      const _ys = tf.tensor2d(yy);

      console.log("training started...");
      await mlModel.fit(_xs, _ys);
      console.log("training finished...");

      return;
    }

    let predict = async function(xx) {
      const _xs = tf.tensor2d(xx, [1, 2]);

      console.log("prediction started...");
      let prediction = await mlModel.predict(_xs);
      prediction = prediction.dataSync();
      console.log("prediction finished...");

      mlPredictions.push(prediction)

      return prediction;
    }
  }

  draw() {
    background(colors.secondary);
    fill("black")

    if (!this.trained) {
      this.drawLabeler();
    } else {
      fill("yellow")
      rect(0, 0, mapWidth, mapHeight);

      if (mlPredictions.length === 0) return;

      for (let i = 0; i < mlPredictions.length; i++) {
        let prediction = mlPredictions[i];
        let x = prediction[0];
        let y = mapHeight - prediction[1];

        fill('magenta');
        ellipse(x, y, 30, 30);
        fill('white');
        textAlign(CENTER, CENTER);
        text(i + 1, x - 15, y - 15, 30, 30);
      }
    }
  }

  drawLabeler() {
    rect(0, 0, mapWidth, mapHeight);
    text("hello");

    textAlign(CENTER, TOP);
    let prompt = this.unlabeledData[this.dataIndex]

    if (mouseX < mapWidth) {
      let mouseXNormalized = mouseX / mapWidth;
      prompt = prompt.concat(["x: " + mouseXNormalized.toFixed(2) ])
    } else {
      prompt = prompt.concat(["x: OUT OF BOUNDS"])
    }

    if (mouseY < mapHeight) {
      let mouseYNormalized = (mapHeight - mouseY) / mapHeight;
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
  }

  mouseClicked() {
    // TODO
    if (scene != 'Labeler') return;

    let predX = p5.mouseX;
    let predY = canvasHeight - p5.mouseY;
    ys.push([predX, predY]);

    xs.push([
      ethnicityLabel.indexOf(selections[currentSelection][0]),
      educationLabel.indexOf(selections[currentSelection][1]),
    ])

    currentSelection += 1;

    if (currentSelection == selections.length) {
      $(".controls").show();
      scene = "Trainer";
    }
  }
}
