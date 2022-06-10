let fretBoard = document.getElementById("fret_line");

// let nut = [4, 9, 2, 7, 11, 4];
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

function posMod(n, d) {
   return ((n % d) + d ) % d;
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

function isCorrect() {
    let numFound = 0;
    for (let row = 0; row < fretBoard.rows.length; row++) {
        for (let i = 0; i < fretBoard.rows[row].cells.length; i ++) {
            let cell = fretBoard.rows[row].cells[i];
            if (cell.innerHTML !== "X") {
                let interval = parseInt(cell.innerHTML, 10);
                if (interval !== shiftedFretboard[row][i]) {
                    return false;
                }
                numFound += 1
            }
        }

    }
    return numFound >= 2;
}

function generateSituation() {
    let stringSet = generateNRandomNumbersNoReplacement(2, 6);
    let fretPosition = Math.floor(Math.random() * 7)
    let otherFretPosition = Math.floor(Math.random() * 7);
    let interval = Math.floor(Math.random() * 12);
    let intervalOffset = interval - fretBoardSection[fretPosition][stringSet[0]];
    shiftedFretboard = fretBoardSection.map(row => row.map(x => posMod(x + intervalOffset, 12)));

    for (let row = 0 ; row < fretBoard.rows.length; row++) {
        for (let i = 0; i < 6; i ++) {
            let fretPos = fretBoard.rows[row].cells[i];
            if (i === stringSet[0] && row === fretPosition)  {
                fretPos.innerHTML = interval.toString();
                fretPos.classList.add("inverted");
            } else {
                fretPos.innerHTML = "X";
                fretPos.classList.remove("inverted");
            }
        }

    }
    selectText(fretBoard.rows[otherFretPosition].cells[stringSet[1]]);
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
            generateSituation();
        }
    }
}
