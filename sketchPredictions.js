
var drawPredictionsModule = function( p ) {

    let inputSquareSize = 20;

    p.setup = function() {
        refresh();
        p.createCanvas(360, 560);
        p.frameRate(30);
        p.colorMode(p.HSB, 360, 1, 1, 1);
        p.background(0, 0, 1);
        p.textSize(24);
        p.rectMode(p.CENTER);        
        p.textAlign(p.CENTER, p.CENTER);
    }

    let predictionDone = true;

    p.draw = function() {
        if (predictionDone) {
            p.background(0, 0, 1);
            
            // top1 prediction

            p.fill(120,1,1,1);
            p.square(180,180,360);
            let symbol0 = symbolArray[topThreeIndicesArray[0]];

            p.fill(0);            
            p.textSize(20);
            p.text("top1 pred", 180, 20); 
            p.textSize(240);
            p.text(symbol0, 180, 150); 
            
            let matchRate0 = predictionsArrayOrig[topThreeIndicesArray[0]];
            p.textSize(20);
            p.text(matchRate0, 180, 320);
            
            // top2 prediction

            p.fill(180,0,0.7,1);
            p.square(90,450,180);
            let symbol1 = symbolArray[topThreeIndicesArray[1]];
            p.fill(0);            
            p.textSize(20);
            p.text("top2 pred", 90, 380);
            p.textSize(120);
            p.text(symbol1, 90, 450); 
            
            let matchRate1 = predictionsArrayOrig[topThreeIndicesArray[1]];
            p.textSize(14);
            p.text(matchRate1, 90, 500);

            // top3 prediction

            p.push();
            p.translate(180,0);
            p.fill(180,0,0.5,1);
            p.square(90,450,180);
            let symbol2 = symbolArray[topThreeIndicesArray[2]];
            p.fill(0);            
            p.textSize(20);
            p.text("top3 pred", 90, 380);
            p.textSize(120);
            p.text(symbol2, 90, 450); 
            
            let matchRate2 = predictionsArrayOrig[topThreeIndicesArray[2]];
            p.textSize(14);
            p.text(matchRate2, 90, 500);
            p.pop();
        }
    }
    
}

let drawPredictionsModuleElement = new p5(drawPredictionsModule, 'drawPredictionsModule');

