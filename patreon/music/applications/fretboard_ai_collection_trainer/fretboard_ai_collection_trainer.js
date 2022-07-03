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

function select(element) {
    var range = document.createRange();
    range.selectNodeContents(element);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

function generateNRandomNumbersNoReplacement(N, max) {
    // 0 <= x < max
    let arr = [];
    while (arr.length < N){
        let r = Math.floor(Math.random() * max);
        if (arr.indexOf(r) === -1) {
            arr.push(r);
        }
    }
    return arr;
}

const NUM_AI_IN_COLLECTION = 4;
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

    anchorIntervals = generateNRandomNumbersNoReplacement(NUM_AI_IN_COLLECTION, 12);

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

    if (e.keyCode === 13 || e.key === " ") {
        e.preventDefault();
        if (isCorrect()) {
            numSolved += 1;
            generateSituation();
        }
    }
}
