let allWeights;
let squareSize = {x: 28, y:28};
let numberOfSymbols = 10;
let trainingDone = false;
let microSquareSize = 3;

var drawWeightsModule = function( w ) {

    w.preload = function() {
        startPerceptron();
    }


    w.setup = function() {
        // p5.js stuff
        w.createCanvas(1100, 300);
        w.frameRate(1);
        w.colorMode(w.HSB, 360, 1, 1, 1);
        w.background(0, 0, 1);
        w.textSize(12);
        w.noStroke();
    }

    w.draw = function() {
        w.background(0, 0, 1);
        if (trainingDone) {
            w.text("Weights for numbers:",50, 20);
            for (let i = 0; i < outputSize; i++) {
                w.drawWeights(i);
                w.push();
                w.translate(100, 0);
            }
            w.pop();
        } else {
            w.text('loading', 50,50);
        }
    }

    w.drawWeights = function(number) {
        let minAndMax = w.getMinAndMaxForNumberArray(allWeights, number);
        w.text(number, 50, 40);
        let counter = number;
        for (let y = 0; y < squareSize.y; y++) {
            for (let x = 0; x < squareSize.x; x++) {
                let squareAlpha = allWeights[counter];
                let mappedSquareAlpha = w.map(squareAlpha, minAndMax.min, minAndMax.max, 1, 0);
                w.fill(0, 1, 0, mappedSquareAlpha);
                w.square(50 + x * microSquareSize, 50 + y * microSquareSize, microSquareSize);
                counter += outputSize;
            }
        }
    }

    w.getMinAndMaxForNumberArray = function(array, number) {
        let arrayForSpecificNumber = [];
        let minMaxForArray = [];
        for (let i = number; i < array.length; i = i + outputSize) {
            arrayForSpecificNumber.push(array[i]);
        }
        minMaxForArray['min'] = w.min(arrayForSpecificNumber);
        minMaxForArray['max'] = w.max(arrayForSpecificNumber);
        // console.log(minMaxForArray);

        return minMaxForArray;
    }
}

let drawWeightsModuleElement = new p5(drawWeightsModule, 'drawWeightsModule');
