let model;
let first_layer;
let second_layer;
let mnist_data;

// optimizable values
let outputSize = 36;
let sampleSizeTraining = 100;
let sampleSizeTesting = 20;
let modelBatchSize = 2;
let modelEpochSize = 20;
let userInputEpochSize = 1;

let [mnistX, mnistY] = [];
let [testX, testY] = [];

let topThreeIndicesArray = [];
let predictionsArrayOrig = [];
let predictionQuality;

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

    let emptyVector = tf.zeros([sampleSizeTraining, outputSize-10]);
    y = tf.concat([y,emptyVector],1);
    model.fit(x, y, { batchSize: modelBatchSize, epochs: epochSize }
    ).then(
        response => testModel());
}

function trainModelOnUserInput(x, y, epochSize) {
    console.log("click!");
    console.log(x, y);

    if (Array.isArray(x) || Array.isArray(y)) {
        x = tf.tensor(x);
        y = tf.tensor(y);
    } 

    x = x.reshape([1,784]);
    y = y.reshape([1,outputSize]);
    model.fit(x, y, { batchSize: modelBatchSize, epochs: epochSize });
    drawWeightsModule;

}

function testModel() {
    let numberOfFalsePredictions = 0;
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
    
    console.log(predictedOutput.dataSync());

    topThreeIndicesArray = [];
    predictionsArrayOrig = predictedOutput.dataSync();
    let predictionsArray = [...predictionsArrayOrig];    
    

    console.log("predictionsArray");
    console.log(predictionsArray);

    for(let i = 0; i < 3; i++) {
        let highestIndex = predictionsArray.indexOf(Math.max(...predictionsArray));
        predictionsArray[highestIndex] = 0;
        topThreeIndicesArray.push(highestIndex);
    }

    // todo: map index to symbol

    console.log("topThreeArray");
    console.log(topThreeIndicesArray);
}


function getAllWeights() {
    for (let i = 0; i < model.getWeights().length; i++) {
        return model.getWeights()[i].dataSync();
    }
}