let model;
let first_layer;
let second_layer;
let mnist_data;

let [x, y] = [];
let [testX, testY] = [];

function setup() {
    // p5.js stuff
    createCanvas(1000, 500);
    frameRate(5);
    colorMode(HSB, 360, 1, 1, 1);
    background(0, 0, 1);

    // prepare layers and model
    first_layer = tf.layers.dense({
        units: 10,
        inputShape: [784,],
        activation: 'sigmoid',
        useBias: false
    });
    // second_layer = tf.layers.dense({
    //     units: 3,
    //     activation: 'sigmoid',
    //     useBias: false
    // });

    model = tf.sequential({ layers: [first_layer] });
    model.summary();
    model.compile({ optimizer: tf.train.sgd(2), loss: 'meanSquaredError' });

    mnist_data = new MnistData();
    mnist_data.load(200, 40).then(res => {
        prepareTrainingData();
        trainModel();
    });
}

function prepareTrainingData() {
    [x, y] = mnist_data.getTrainData();
    x = x.reshape([200, 784]);
}

function trainModel() {
    model.fit(x, y, { batchSize: 1, epochs: 400 }
    ).then(
        response => testModel());
}

function testModel() {
    let testSamples = 40;
    let errorSum = 0;
    let predictionQuality;
    [testX, testY] = mnist_data.getTestData(testSamples);
    testX = testX.reshape([testSamples, 784]);

    predictedOutput = model.predict(testX);
    predictedOutputArray = predictedOutput.arraySync();
    console.log("prediction for... ");
    for (let s = 0; s < testSamples; s++) {
        console.log("sample " + s);
        for (let i = 0; i < predictedOutputArray[s].length; i++) {
            console.log(i + ": " + predictedOutputArray[s][i].toFixed(2) + " vs. real: " + testY.arraySync()[s][i]);
        }
        let samplePredictionOneHotEncoded = tf.argMax(predictedOutputArray[s]);
        let samplePredictionOneHotIndex = samplePredictionOneHotEncoded.arraySync();
        let sampleExpectedOneHotIndex = testY.arraySync()[s].indexOf(Math.max(...testY.arraySync()[s]));

        console.log(samplePredictionOneHotIndex + " vs. " + sampleExpectedOneHotIndex);

        errorSum += samplePredictionOneHotIndex - sampleExpectedOneHotIndex != 0 ? 1 : 0;
        console.log("zwischenstand errorsum " + errorSum);
    }
    predictionQuality = (1.0 - (errorSum / testSamples)) * 100;
    console.log("Prediction quality: " + predictionQuality + " %");
}