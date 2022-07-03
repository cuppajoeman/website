const BLANK_CHAR = "🞨";

let fretBoardSection = [
    [4, 9, 2, 7, 0, 5],
    [5, 10, 3, 8, 1, 6],
    [6, 11, 4, 9, 2, 7],
    [7, 0, 5, 10, 3, 8],
    [8, 1, 6, 11, 4, 9],
    [9, 2, 7, 0, 5, 10],
    [10, 3, 8, 1, 6, 11],
];

var shiftedFretboard;

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

function select(element) {
    var range = document.createRange();
    range.selectNodeContents(element);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}


let fretBoard = document.getElementById("fret_board");
let anchorIntervalText = document.getElementById("anchor_interval_text");

var numSolved = 0;
let anchorIntervals;


function posMod(n, d) {
    return ((n % d) + d) % d;
}

function eqSet(as, bs) {
    if (as.size !== bs.size) return false;
    for (var a of as) if (!bs.has(a)) return false;
    return true;
}

function isCorrect() {

    let selectedAnchorIntervals = [];
    for (let row = 0; row < fretBoard.rows.length; row++) {
        for (let i = 0; i < fretBoard.rows[row].cells.length; i ++) {
            let cell = fretBoard.rows[row].cells[i];
            if (cell.innerHTML !== BLANK_CHAR) {
                let interval = parseInt(cell.innerHTML, 10);
                if (interval !== shiftedFretboard[row][i]) {
                    return false;
                }
                selectedAnchorIntervals.push(interval)
            }
        }

    }

    return eqSet( new Set(selectedAnchorIntervals), new Set(anchorIntervals));
}

function generateSituation() {

    let anchorIntervalOffset = Math.floor(Math.random() * 12);

    let chordQualityName = Object.keys(FOUR_NOTE_QUALITIES)[Math.floor(Math.random() * Object.keys(FOUR_NOTE_QUALITIES).length)];

    anchorIntervals = FOUR_NOTE_QUALITIES[chordQualityName].map(x => posMod(x + anchorIntervalOffset, 12));

    let requiredAI = anchorIntervals[Math.floor(anchorIntervals.length * Math.random())];

    anchorIntervalText.innerHTML = anchorIntervals.map(x => x.toString()).join(' ');

    let stringNum = Math.floor(Math.random() * 6);
    let fretPosition = Math.floor(Math.random() * 7); // Our fretboard has 7 frets
    let aIOffset = requiredAI - fretBoardSection[fretPosition][stringNum];

    shiftedFretboard = fretBoardSection.map(row => row.map(x => posMod(x + aIOffset, 12)));

    for (let row = 0 ; row < fretBoard.rows.length; row++) {
        for (let i = 0; i < 6; i ++) {
            let fretPos = fretBoard.rows[row].cells[i];
            if (i === stringNum && row === fretPosition)  {
                fretPos.innerHTML = requiredAI.toString();
                fretPos.classList.add("inverted");
            } else {
                fretPos.innerHTML = BLANK_CHAR;
                fretPos.classList.remove("inverted");
            }
        }

    }
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


    for (let row = 0; row < fretBoard.rows.length; row++) {
        for (let i = 0; i < fretBoard.rows[row].cells.length; i ++) {
            let cell = fretBoard.rows[row].cells[i];
            if (cell.innerHTML === "<br>") {
                cell.innerHTML = BLANK_CHAR;
            }
        }

    }

    if (e.keyCode === 13) {
        e.preventDefault();
        if (isCorrect()) {
            numSolved += 1;
            generateSituation();
        }
    }
}
