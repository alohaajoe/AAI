let allWeights;
let squareSize = {x: 28, y:28};
let numberOfSymbols = 10;
let trainingDone = false;

function preload() {
    startPerceptron();
}


function setup() {
    // p5.js stuff
    createCanvas(1000, 500);
    frameRate(1);
    colorMode(HSB, 360, 1, 1, 1);
    background(0, 0, 1);

}

function draw() {
    if (trainingDone) {
        drawWeights(2);
    } else {
        text('loading', 50,50);
    }
}

function drawWeights(number) {
    background(0, 0, 1);
    let minAndMax = getMinAndMaxForNumberArray(allWeights, 2);


    text('Weights for number 5:', 50, 30);
    let counter = number;
    for (let x = 0; x < squareSize.x; x++) {
        for (let y = 0; y < squareSize.y; y++) {
            let squareAlpha = allWeights[counter];
            let mappedSquareAlpha = map(squareAlpha, minAndMax.min, minAndMax.max,0,1);
            fill(0, 1, 0, mappedSquareAlpha);
            square(50 + x * 10, 50 + y * 10, 10);
            counter += outputSize;
        }
    }
}

function getMinAndMaxForNumberArray(array, number) {
    let arrayForSpecificNumber = [];
    let minMaxForArray = [];
    for (let i = number; i < array.length; i + outputSize) {
        arrayForSpecificNumber.push(array[i]);
    }
    minMaxForArray['min'] = arrayForSpecificNumber.min();
    minMaxForArray['max'] = arrayForSpecificNumber.max();
    console.log(minMaxForArray);

    return minMaxForArray;
}


