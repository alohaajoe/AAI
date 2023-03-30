var drawUserInputModule = function( u ) {

    let inputSquareArray = [];
    for (let i = 0; i < 784; i++) {
        inputSquareArray[i] = 0;
    }
    let inputSquareSize = 20;

    u.setup = function() {
        u.createCanvas(560, 560);
        u.frameRate(30);
        u.colorMode(u.HSB, 360, 1, 1, 1);
        u.background(0, 0, 1);
        u.textSize(12);
    }

    u.draw = function() {
        u.background(0, 0, 1);

        let counter = 0;
        for (let y = 0; y < squareSize.y; y++) {
            for (let x = 0; x < squareSize.x; x++) {
                u.fill(0, 0, inputSquareArray[counter], 1);
                u.square(x * inputSquareSize, y * inputSquareSize, inputSquareSize);
                counter++;
            }
        }
    }

    u.mouseDragged = function() {
        u.push();
        u.translate(500,500);
        let counter = 0;
        for (let y = 0; y < squareSize.y; y++) {
            for (let x = 0; x < squareSize.x; x++) {
                if (u.mouseX >=  x * inputSquareSize && u.mouseX <  x * inputSquareSize + inputSquareSize  
                    && u.mouseY >=  y * inputSquareSize &&  u.mouseY <  y * inputSquareSize + inputSquareSize) {
                    console.log('boing ' + counter);
                    inputSquareArray[counter] = 1;
                    console.log('2nd boing ' + inputSquareArray[counter]);
                }
                counter++;
            }
        }
        console.log(inputSquareArray);
        u.pop();
    }
}

let drawUserInputModuleElement = new p5(drawUserInputModule, 'drawUserInputModule');