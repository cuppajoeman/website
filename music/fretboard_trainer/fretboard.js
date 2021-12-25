let fretLine = document.getElementById("fret_line");

let nut = [4, 9, 2, 7, 11, 4];

var shiftedNut;

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
    for (let i = 0; i < fretLine.rows[0].cells.length; i ++) {
        let cell = fretLine.rows[0].cells[i];
        if (cell.innerHTML !== "X") {
            let interval = parseInt(cell.innerHTML, 10);
            console.log(interval, shiftedNut[i]);
            if (interval !== shiftedNut[i]) {
                return false;
            }
        }
    }
    return true;
}

function generateSituation() {
    let stringSet = generateNRandomNumbersNoReplacement(2, 6);
    let interval = Math.floor(Math.random() * 12);
    let intervalOffset = interval - nut[stringSet[0]];
    shiftedNut = nut.map(x => posMod(x + intervalOffset, 12));
    for (let i = 0; i < 6; i ++) {
        if (i === stringSet[0])  {
            fretLine.rows[0].cells[i].innerHTML = interval.toString();
        } else {
            fretLine.rows[0].cells[i].innerHTML = "X";
        }
    }
    selectText(fretLine.rows[0].cells[stringSet[1]]);
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
            generateSituation();
        }
    }
}
