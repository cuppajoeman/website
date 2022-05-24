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

var shiftedNut;
var numSolved = 0;
var numAiPerAc = 10;
var anchorNote;
var otherNote;


function posMod(n, d) {
   return ((n % d) + d ) % d;
}

function isCorrect() {
    const solution = parseInt(document.getElementById("solution").innerHTML);
    return posMod(otherNote - anchorNote, 12) === solution
}

function generateSituation() {
    if (numSolved % numAiPerAc === 0) {
        anchorNote = Math.floor(Math.random() * 12);
    }
    otherNote = Math.floor(Math.random() * 12);

    fretLine.rows[0].cells[0].innerHTML = anchorNote.toString() + "*";
    fretLine.rows[0].cells[1].innerHTML = otherNote.toString() + "*";
    fretLine.rows[0].cells[2].innerHTML = "X";

    selectText(fretLine.rows[0].cells[2]);

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
