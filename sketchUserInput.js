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
        u.textFont(pixelFont);
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
        } else {
            u.background(0, 0, 1);
            u.textAlign(u.CENTER);
            u.textSize(20);
            u.text("Lade Modell...", 280, 320);
            u.push();
            u.translate(220, 170);
            drawLoadingSquare(u);
            u.pop();  
        }
    }

    u.drawAndPredictUserInput = function () {
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
    

    u.mouseDragged = function() {
        u.drawAndPredictUserInput();
    }

    u.mouseClicked = function() {
        u.drawAndPredictUserInput();
    }
}

let drawUserInputModuleElement = new p5(drawUserInputModule, 'drawUserInputModule');

function refresh () {
    for (let i = 0; i < 784; i++) {
        inputSquareArray[i] = 0;
    }
}


function drawLoadingSquare(u) {
  
    let countMod = 5;
    
    fcount = u.frameCount % countMod;
    
    u.rectMode(u.CORNER);
    u.noStroke();

    u.fill(0,0,0.2, 0.1);
    u.rect(0, 0, 100, 100);
    
    if(fcount >= 0 && fcount < countMod * 0.25) {  
      u.rectMode(u.CORNERS);
      u.fill("blue");
      u.rect(0, 0, 50, 50);
    } 
    
    else if(fcount >= countMod * 0.25 && fcount < countMod * 0.5) {
        u.rectMode(u.CORNERS);
        u.fill("red");
        u.rect(50, 0, 100, 50);    
    }
    
    else if(fcount >= countMod * 0.5 && fcount < countMod * 0.75) {    
        u.rectMode(u.CORNERS);
        u.fill("cyan");
        u.rect(50, 50, 100, 100);     
    } 
    
    else if(fcount >= countMod * 0.75 && fcount <= countMod ) {  
        u.rectMode(u.CORNERS);
        u.fill("yellow");
        u.rect(0, 50, 50, 100);
    }
    
  }