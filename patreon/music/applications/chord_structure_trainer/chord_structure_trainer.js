// const targetDiv = document.getElementById("training_area");
// const infoDiv = document.getElementById("info");
// targetDiv.style.display = "none";
// const btn = document.getElementById("start");
//
// btn.onclick = function () {
//     infoDiv.style.display = "none";
//     targetDiv.style.display = "block";
// };

const FOUR_NOTE_QUALITIES = {
    "maj7": [0, 4, 7, 11],
    "min7": [0, 3, 7, 10],
    "dom7": [0, 4, 7, 10],
    "half-dim7": [0, 3, 6, 10],
    "dim7": [0, 3, 6, 9],
    "min-maj7": [0, 3, 7, 11],
    "maj6": [0, 4, 7, 9],
    "min6": [0, 3, 7, 9],
    // "aug7": [0, 4, 8, 10],
}


let fretLine = document.getElementById("fret_line");

let numSolved = 0;
let qualityName;

function eqSet(as, bs) {
    if (as.size !== bs.size) return false;
    for (var a of as) if (!bs.has(a)) return false;
    return true;
}


function isCorrect() {

    // slice to remove <br>
    let userSolution = new Set(document.getElementById("solution").innerHTML.slice(0, -4).split(' ').map(Number));

    let solution = new Set(FOUR_NOTE_QUALITIES[qualityName])

    return eqSet(solution, userSolution);
}

function generateSituation() {

    const keys = Object.keys(FOUR_NOTE_QUALITIES)
    qualityName = keys[Math.floor(Math.random() * keys.length)]

    fretLine.rows[0].cells[0].innerHTML = qualityName;

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
    if (e.keyCode === 13) {
        e.preventDefault();
        if (isCorrect()) {
            numSolved += 1;
            generateSituation();
        }
    }
}
