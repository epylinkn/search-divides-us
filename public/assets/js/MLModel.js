class MLModel {

  constructor() {
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({units: 2, inputShape: [3]}));

    // Prepare the model for training: Specify the loss and the optimizer.
    this.model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
  }

  async train(selections, labels) {
    const _xs = tf.tensor2d(selections);
    const _ys = tf.tensor2d(labels);

    console.log("training started...");
    await this.model.fit(_xs, _ys);
    console.log("training finished...");

    return;
  }

  async predict(selections) {
    const _xs = tf.tensor2d(selections, [1, 3]);

    console.log("prediction started...");
    let prediction = await this.model.predict(_xs);
    prediction = prediction.dataSync();
    console.log("prediction finished...");

    return prediction;
  }

}
