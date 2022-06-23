// const targetDiv = document.getElementById("training_area");
// const infoDiv = document.getElementById("info");
// targetDiv.style.display = "none";
// const btn = document.getElementById("start");
//
// btn.onclick = function () {
//     infoDiv.style.display = "none";
//     targetDiv.style.display = "block";
// };


const INTERVAL_TO_NUM_SEMITONES = [
    "P1", "m2", "M2", "m3", "M3", "P4", "Tt", "P5", "m6", "M6", "m7", "M7"
]

let fretLine = document.getElementById("fret_line");

let numSolved = 0;
let generatedIntervalName;
let generatedInterval;

function isCorrect() {
    const solution = parseInt(document.getElementById("solution").innerHTML);
    return solution === generatedInterval;
}

function generateSituation() {
    generatedInterval = Math.floor(Math.random() * 12);
    generatedIntervalName = INTERVAL_TO_NUM_SEMITONES[generatedInterval];

    fretLine.rows[0].cells[0].innerHTML = generatedIntervalName

    fretLine.rows[0].cells[1].innerHTML = "X";

    selectText(fretLine.rows[0].cells[1]);


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
