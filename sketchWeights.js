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
        w.createCanvas(700, 700);
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

        w.text("Weights for symbols:",50, 20);
        w.push();
        let counter = 1;
        for (let i = 0; i < outputSize; i++) {
            w.drawWeights(i);
            w.translate(100, 0);
            
            if(counter == 6){
                w.translate(-100*counter+1, 100);
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
        w.text(symbol, 50, 48);
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

    w.highlightTopThreeWeights = function(number){
        if (!userInputSquareIsAllBlack) {
            for (let i = 0; i < topThreeIndicesArray.length; i++) {
                if (number == topThreeIndicesArray[i]) {
                    let highlightColor;
                    let matchRate = predictionsArrayOrig[topThreeIndicesArray[i]];
                    let highlightAlpha = w.map(matchRate, 0, 1, 0.1, 1);
                    
                    switch (i) {
                        case 0: i = 0;
                                highlightColor = colorTop1;
                                break;
                        case 1: i = 1;
                                highlightColor = colorTop2;
                                break;
                        case 2: i = 2;
                                highlightColor = colorTop3;
                                break;
                        default: break;
                    }
                    //w.fill(150, 360, 100);
                    highlightColor.setAlpha(highlightAlpha);
                    w.fill(highlightColor);
                    w.square(42, 35, 100);
                    // delte if prediction on the right should have the same color.
                    //highlightColor.setAlpha(1);
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
        // console.log(minMaxForArray);

        return minMaxForArray;
    }
}

let drawWeightsModuleElement = new p5(drawWeightsModule, 'drawWeightsModule');
