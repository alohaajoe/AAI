let colorTop1, colorTop2, colorTop3, colorTops;

var drawPredictionsModule = function( p ) {

    p.setup = function() {
        refresh();
        p.createCanvas(360, 620);
        p.frameRate(30);
        p.colorMode(p.HSB, 360, 1, 1, 1);
        p.background(0, 0, 1);
        p.rectMode(p.CENTER);        
        p.textAlign(p.CENTER, p.CENTER);
        p.textFont(pixelFont);
        colorTop1 = p.color(250, 1, 1, 1);
        colorTop2 = p.color(250, 1, 1, 1);
        colorTop3 = p.color(250, 1, 1, 1);
        colorTops = [colorTop1, colorTop2, colorTop3];

    }

    let predictionDone = true;
    let textSizeScaleFactor = 0.7;

    p.draw = function() {
        if (predictionDone) {
            p.background(0, 0, 1);

            if(userInputSquareIsAllBlack){
                colorTop1.setAlpha(0.5);
                colorTop2.setAlpha(0.5);
                colorTop3.setAlpha(0.5);
            }
            
            for (let i = 0; i < topThreeIndicesArray.length; i++) {
                    let matchRate = predictionsArrayOrig[topThreeIndicesArray[i]];
                    let highlightAlpha = p.map(matchRate, 0, 1, 0.3, 1);
                    
                    colorTops[i].setAlpha(highlightAlpha);
            }
            // top1 prediction

            p.fill(colorTops[0]);
            p.square(180,180,360);
            let symbol0 = symbolArray[topThreeIndicesArray[0]];
            let matchRate0 = predictionsArrayOrig[topThreeIndicesArray[0]]  ? predictionsArrayOrig[topThreeIndicesArray[0]].toFixed(4) : 0;
            p.fill(1);            
            p.textSize(20*textSizeScaleFactor);
            p.text("Top 1", 180, 20); 
            if(!userInputSquareIsAllBlack){
                p.textSize(240*textSizeScaleFactor);
                p.text(symbol0, 180, 150);
                p.textSize(20*textSizeScaleFactor);
                p.text(matchRate0, 180, 320);
            }
            
            
            // top2 prediction

            p.fill(colorTops[1]);
            p.square(90,450,180);
            let symbol1 = symbolArray[topThreeIndicesArray[1]];
            let matchRate1 = predictionsArrayOrig[topThreeIndicesArray[1]]  ? predictionsArrayOrig[topThreeIndicesArray[1]].toFixed(4) : 0;
            p.fill(1);            
            p.textSize(20*textSizeScaleFactor);
            p.text("Top 2", 90, 380);
            if(!userInputSquareIsAllBlack){
                p.textSize(120*textSizeScaleFactor);
                p.text(symbol1, 90, 450); 
                p.textSize(14*textSizeScaleFactor);
                p.text(matchRate1, 90, 520); 
            }
            

            // top3 prediction

            p.push();
            p.translate(180,0);
            p.fill(colorTops[2]);
            p.square(90,450,180);
            let symbol2 = symbolArray[topThreeIndicesArray[2]];
            let matchRate2 = predictionsArrayOrig[topThreeIndicesArray[2]] ? predictionsArrayOrig[topThreeIndicesArray[2]].toFixed(4) : 0;
            p.fill(1);            
            p.textSize(20*textSizeScaleFactor);
            p.text("Top 3", 90, 380);
            if(!userInputSquareIsAllBlack){
                p.textSize(120*textSizeScaleFactor);
                p.text(symbol2, 90, 450); 
                p.textSize(14*textSizeScaleFactor);
                p.text(matchRate2, 90, 520);
            }
            p.pop();
        }
        
        p.push();   
        p.fill(0,0,0,0.4);
        p.textSize(9);  
        p.text("Anfängliche Erkennrate des", 175, 560);
        p.text("Netzwerks auf Basis des", 175, 575);
        p.text("MNIST-Datensatzes (nur Zahlen):", 175, 590);
        p.text(predictionQuality || predictionQuality == 0? predictionQuality + "%" : "wird geladen...", 150, 610);
        p.pop();
    }
    
}

let drawPredictionsModuleElement = new p5(drawPredictionsModule, 'drawPredictionsModule');

