let model;
let first_layer;
let second_layer;
let mnist_data;

// optimizable values
let outputSize = 10;
let sampleSizeTraining = 200;
let sampleSizeTesting = 1;
let modelBatchSize = 1;
let modelEpochSize = 10;
let userInputEpochSize = 1;

let [mnistX, mnistY] = [];
let [testX, testY] = [];


// prepare layers and model
first_layer = tf.layers.dense({
    units: outputSize,
    inputShape: [784,],
    activation: 'sigmoid',
    useBias: false
});
// second_layer = tf.layers.dense({
//     units: 3,
//     activation: 'sigmoid',
//     useBias: false
// });



function startPerceptron() {
    model = tf.sequential({ layers: [first_layer] });
    // model.summary();
    model.compile({ optimizer: tf.train.sgd(2), loss: 'meanSquaredError' });

    mnist_data = new MnistData();

    mnist_data.load(sampleSizeTraining, sampleSizeTesting).then(res => {
        prepareTrainingData();
        trainModel(mnistX, mnistY, modelEpochSize);
    });
}

function prepareTrainingData() {
    [mnistX, mnistY] = mnist_data.getTrainData();
    mnistX = mnistX.reshape([sampleSizeTraining, 784]);
}

function trainModel(x, y, epochSize) {
    console.log(x, y);
    if (Array.isArray(x) || Array.isArray(y)) {
        x = tf.tensor(x);
        y = tf.tensor(y);
    } 

    model.fit(x, y, { batchSize: modelBatchSize, epochs: epochSize }
    ).then(
        response => testModel());
}

function trainModelOnUserInput(x, y, epochSize) {
    console.log(x, y);

}

function testModel() {
    let numberOfFalsePredictions = 0;
    let predictionQuality;
    [testX, testY] = mnist_data.getTestData(sampleSizeTesting);
    testX = testX.reshape([sampleSizeTesting, 784]);
    predictedOutput = model.predict(testX);
    // console.log('predictedOutput:');
    predictedOutput.print(true);
    // console.log('predictedOutput(einzeln):');
    let predictedOutputMaxIndex = [];
    let testYMaxIndex = [];
    // console.log("prediction for... ");
    for (let j=0; j< sampleSizeTesting; j++) {
        // console.log("sample " + j);
        // console.log("predictedOutputMaxIndex[" + j +"]:");
        predictedOutputMaxIndex[j] = tf.argMax(predictedOutput.slice(j,1),1);
        // predictedOutputMaxIndex[j].print(true);
        testYMaxIndex[j] = tf.argMax(testY.slice(j,1),1);
        // testYMaxIndex[j].print(true);

        numberOfFalsePredictions += predictedOutputMaxIndex[j].equal(testYMaxIndex[j]).dataSync() != 0 ? 0 : 1;
        // console.log("numberOfFalsePredictions: " + numberOfFalsePredictions);
    }

    predictionQuality = (1.0 - (numberOfFalsePredictions / sampleSizeTesting)) * 100;
    console.log("Prediction quality: " + predictionQuality + " %");

    // allWeights = getAllWeights();
    trainingDone = true;
}

function getPredictionForUserInput(inputArray){
    let inputTensor = tf.tensor(inputArray);
    inputTensor = inputTensor.reshape([1, 784]);
    //inputTensor.print(true);
    predictedOutput = model.predict(inputTensor);
    console.log('predictedOutput:');
    predictedOutput.print(true);
}


function getAllWeights() {
    for (let i = 0; i < model.getWeights().length; i++) {
        return model.getWeights()[i].dataSync();
    }
}