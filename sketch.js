let allWeights;
let squareSize = {x: 28, y:28};
let numberOfSymbols = 10;
let trainingDone = false;
let microSquareSize = 3;

function preload() {
    startPerceptron();
}


function setup() {
    // p5.js stuff
    createCanvas(1200, 800);
    frameRate(1);
    colorMode(HSB, 360, 1, 1, 1);
    background(0, 0, 1);
    textSize(12);

}

function draw() {
    background(0, 0, 1);
    if (trainingDone) {
        text("Weights for numbers:",50, 20);
        for (let i = 0; i < outputSize; i++) {
            drawWeights(i);
            push();
        translate(100, 0);
        }
        pop();
    } else {
        text('loading', 50,50);
    }
}

function drawWeights(number) {
    let minAndMax = getMinAndMaxForNumberArray(allWeights, 2);
    text(number, 50, 40);
    let counter = number;
    for (let x = 0; x < squareSize.x; x++) {
        for (let y = 0; y < squareSize.y; y++) {
            let squareAlpha = allWeights[counter];
            let mappedSquareAlpha = map(squareAlpha, minAndMax.min, minAndMax.max,0,1);
            fill(0, 1, 0, mappedSquareAlpha);
            square(50 + x * microSquareSize, 50 + y * microSquareSize, microSquareSize);
            counter += outputSize;
        }
    }
}

function getMinAndMaxForNumberArray(array, number) {
    let arrayForSpecificNumber = [];
    let minMaxForArray = [];
    for (let i = number; i < array.length; i = i + outputSize) {
        arrayForSpecificNumber.push(array[i]);
    }
    minMaxForArray['min'] = min(arrayForSpecificNumber);
    minMaxForArray['max'] = max(arrayForSpecificNumber);
    // console.log(minMaxForArray);

    return minMaxForArray;
}


