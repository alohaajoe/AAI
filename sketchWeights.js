let allWeights;
let squareSize = {x: 28, y:28};
let trainingDone = false;
let microSquareSize = 3;

let pixelFont;
let textSizeScaleFactor = 0.8;

var drawWeightsModule = function( w ) {

    w.preload = function() {
        pixelFont = w.loadFont('./assets/PressStart2P-Regular.ttf');
        startPerceptron();
    }

    w.setup = function() {
        // p5.js stuff
        w.createCanvas(620, 670);
        w.frameRate(1);
        w.colorMode(w.HSB, 360, 1, 1, 1);
        w.background(0, 0, 1);
        w.textSize(12*textSizeScaleFactor);
        w.noStroke();
        w.textFont(pixelFont);
    }

    w.draw = function() {
        w.background(0, 0, 1);
       // if (!trainingDone) {
            allWeights = getAllWeights();
       // }

        w.push();
        let counter = 1;
        for (let i = 0; i < outputSize; i++) {
            w.drawWeights(i);
            w.translate(100, 0);
            
            if(counter == 6){
                w.translate(-100*counter+1, 110);
                counter = 0;
            }
            counter++;
        }
        w.pop();
    }

    w.drawWeights = function(number) {
        w.highlightTopThreeWeights(number);
        
        let symbol = symbolArray[number];
        let minAndMax = w.getMinAndMaxForNumberArray(allWeights, number);
        w.fill(0);
        w.text(symbol, 15, 13);
        let counter = number;
        for (let y = 0; y < squareSize.y; y++) {
            for (let x = 0; x < squareSize.x; x++) {
                let squareAlpha = allWeights[counter];
                let mappedSquareBrightness = w.map(squareAlpha, minAndMax.min, minAndMax.max, 0,1);
                w.fill(0, 0, mappedSquareBrightness, 1);
                w.square(15 + x * microSquareSize, 15 + y * microSquareSize, microSquareSize);
                counter += outputSize;
            }
        }
    }

    w.highlightTopThreeWeights = function(number){
        colorTop = w.color(250, 1, 1, 1);

        if (!userInputSquareIsAllBlack) {
            for (let i = 0; i < topThreeIndicesArray.length; i++) {
                if (number == topThreeIndicesArray[i]) {
                    let matchRate = predictionsArrayOrig[topThreeIndicesArray[i]];
                    let highlightAlpha = w.map(matchRate, 0, 1, 0.3, 1);
                    
                    colorTop.setAlpha(highlightAlpha);
                    w.fill(colorTop);
                    w.rect(7, -2, 100, 110);

                }
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

        return minMaxForArray;
    }
}

let drawWeightsModuleElement = new p5(drawWeightsModule, 'drawWeightsModule');
