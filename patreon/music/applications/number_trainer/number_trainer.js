// const targetDiv = document.getElementById("training_area");
// const infoDiv = document.getElementById("info");
// targetDiv.style.display = "none";
// const btn = document.getElementById("start");
//
// btn.onclick = function () {
//     infoDiv.style.display = "none";
//     targetDiv.style.display = "block";
// };

let fretLine = document.getElementById("fret_line");

var numSolved = 0;
var firstNumber;
var secondNumber;
var operation;


function posMod(n, d) {
   return ((n % d) + d ) % d;
}

function isCorrect() {
    const solution = parseInt(document.getElementById("solution").innerHTML);
    if (operation === "+") {
       return posMod(firstNumber + secondNumber, 12) === solution
    }
    return posMod(firstNumber - secondNumber, 12) === solution
}

function generateSituation() {
    firstNumber = Math.floor(Math.random() * 12);
    secondNumber = Math.floor(Math.random() * 12);

    operation = ["+", "-"][Math.floor(Math.random() * 2)]

    document.getElementById("first-number").innerHTML = firstNumber.toString()
    document.getElementById("operator").innerHTML = operation
    document.getElementById("second-number").innerHTML = secondNumber.toString()
    document.getElementById("solution").innerHTML = "X";

    selectText(document.getElementById("solution"));

}
generateSituation();

function selectText(element) {
    if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        console.warn("Could not select text in element: Unsupported browser.");
    }
}

document.body.onkeydown = function(e){
    // Number 13 is the "Enter" key on the keyboard
    if (e.keyCode === 13 || e.key === " ") {
        e.preventDefault();
        if (isCorrect()) {
            numSolved += 1;
            generateSituation();
        }
    }
}
