

let mainElement = document.getElementById("buttons");
let buttonArray = [];

for(let i=0; i<symbolArray.length; i++){
    let button = document.createElement("button");
    button.innerText = symbolArray[i];
    let oneHotArray = new Array(symbolArray.length).fill(0);
    oneHotArray[i] = 1;
    //console.log(oneHotArray);
    button.addEventListener('click', ()=>trainModelOnUserInput(inputSquareArray, oneHotArray, 10));

    buttonArray.push(button);
}

mainElement.append(...buttonArray);

let buttonClear = document.getElementById('button-clear');

//let buttonCorrect = document.getElementById('button-correct');


buttonClear.addEventListener('click', refresh);

