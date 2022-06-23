// const targetDiv = document.getElementById("training_area");
// const infoDiv = document.getElementById("info");
// targetDiv.style.display = "none";
// const btn = document.getElementById("start");
//
// btn.onclick = function () {
//     infoDiv.style.display = "none";
//     targetDiv.style.display = "block";
// };


const NOTE_NUMBER_TO_STANDARD_NAME = [
    "C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"
]

let fretLine = document.getElementById("fret_line");

let numSolved = 0;
let generatedNoteName;
let generatedNoteNumber;


function posMod(n, d) {
   return ((n % d) + d ) % d;
}

function isCorrect() {
    const solution = parseInt(document.getElementById("solution").innerHTML.slice(0, -1));
    return solution === generatedNoteNumber;
}

function generateSituation() {
    generatedNoteNumber = Math.floor(Math.random() * 12);
    generatedNoteName = NOTE_NUMBER_TO_STANDARD_NAME[generatedNoteNumber];

    if (generatedNoteName.includes("/")) {
        generatedNoteName = generatedNoteName.split("/")[Math.floor(Math.random() * 2)];
    }

    fretLine.rows[0].cells[0].innerHTML = generatedNoteName

    selectText(fretLine.rows[0].cells[1]);

    fretLine.rows[0].cells[1].innerHTML =  "*";

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
