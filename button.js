let symbolArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

let mainElement = document.getElementById("buttons");
let buttonArray = [];

for(let i=0; i<symbolArray.length; i++){
    let button = document.createElement("button");
    button.innerText = symbolArray[i];
    let oneHotArray = new Array(symbolArray.length).fill(0);
    oneHotArray[i] = 1;
    //console.log(oneHotArray);
    button.addEventListener('click', trainModelOnUserInput(inputSquareArray, oneHotArray, 10));
    buttonArray.push(button);
}

mainElement.append(...buttonArray);

let buttonRefresh = document.getElementById('button-refresh');

let buttonCorrect = document.getElementById('button-correct');


buttonRefresh.addEventListener('click', refresh);

