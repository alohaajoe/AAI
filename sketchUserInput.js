let inputSquareArray = [];
let userInputSquareIsAllBlack = true;

var drawUserInputModule = function( u ) {

    
    
    let inputSquareSize = 20;

    u.setup = function() {
        refresh();
        u.createCanvas(560, 560);
        u.frameRate(60);
        u.colorMode(u.HSB, 360, 1, 1, 1);
        u.background(0, 0, 1);
        u.textSize(12);
    }

    u.draw = function() {
        if (trainingDone) {
            u.background(0, 0, 1);

            let counter = 0;
            for (let y = 0; y < squareSize.y; y++) {
                for (let x = 0; x < squareSize.x; x++) {
                    u.fill(0, 0, inputSquareArray[counter], 1);
                    u.square(x * inputSquareSize, y * inputSquareSize, inputSquareSize);
                    counter++;
                }
            }

            userInputSquareIsAllBlack = inputSquareArray.every(item => item === 0);
            //console.log("userInputSquareIsAllBlack: " + userInputSquareIsAllBlack);
        }
    }

    

    u.mouseDragged = function() {
        //u.push();
        // u.translate(560, 560);
        let counter = 0;
        for (let y = 0; y < squareSize.y; y++) {
            for (let x = 0; x < squareSize.x; x++) {
                if (u.mouseX >=  x * inputSquareSize && u.mouseX <  x * inputSquareSize + inputSquareSize  
                    && u.mouseY >=  y * inputSquareSize &&  u.mouseY <  y * inputSquareSize + inputSquareSize) {
                    inputSquareArray[counter] = 1;
                }
                counter++;
            }
        }
        console.log(inputSquareArray);
        getPredictionForUserInput(inputSquareArray);
        //u.pop();
    }

    u.mouseClicked = function() {
        getPredictionForUserInput(inputSquareArray);
    }
}

let drawUserInputModuleElement = new p5(drawUserInputModule, 'drawUserInputModule');

function refresh () {
    for (let i = 0; i < 784; i++) {
        inputSquareArray[i] = 0;
    }
}