const BASE_QUALITIES = {
    "maj": [0, 4, 7],
    "min": [0, 3, 7],
    "dim": [0, 3, 6],
    "aug": [0, 4, 8]
};

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


const QUALITY_ALTERATIONS = {
    "b9": [1,],
    "9": [2,],
    "#9": [3,],
    "#5": [8,],
    "#11": [6,],
    "sus4": [5,],
}

const NOTE_NUMBER_TO_STANDARD_NAME = [
    "C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"
]

let fretLine = document.getElementById("fret_line");

var numSolved = 0;
var numAiPerAc = 10;
var anchorNote;
var otherNote;


function posMod(n, d) {
    return ((n % d) + d) % d;
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

    // Randomly chooses to use a sharp or flat
    let standardAnchorNote = NOTE_NUMBER_TO_STANDARD_NAME[anchorNote];
    let standardOtherNote = NOTE_NUMBER_TO_STANDARD_NAME[otherNote];

    if (standardAnchorNote.includes("/")) {
        standardAnchorNote = NOTE_NUMBER_TO_STANDARD_NAME[anchorNote].split("/")[Math.round(Math.random())];
    }

    if (standardOtherNote.includes("/")) {
        standardOtherNote = NOTE_NUMBER_TO_STANDARD_NAME[otherNote].split("/")[Math.round(Math.random())];
    }

    let randomChordName = Object.keys(FOUR_NOTE_QUALITIES)[Math.floor(Math.random() * Object.keys(FOUR_NOTE_QUALITIES).length)];

    let alteration = "";
    // if (Math.random() < 0.1) {
    if (false) {
       alteration = Object.keys(QUALITY_ALTERATIONS)[Math.floor(Math.random() * Object.keys(QUALITY_ALTERATIONS).length)];
    }

    fretLine.rows[0].cells[0].innerHTML = standardAnchorNote;
    fretLine.rows[0].cells[1].innerHTML = standardOtherNote + randomChordName + alteration;
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

document.body.onkeydown = function (e) {
    // Number 13 is the "Enter" key on the keyboard
    if (e.keyCode === 13 || e.key === " ") {
        e.preventDefault();
        if (isCorrect()) {
            numSolved += 1;
            generateSituation();
        }
    }
}
