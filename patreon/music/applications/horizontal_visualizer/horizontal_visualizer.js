let solutionElement = document.getElementById("solution");
let imageElement = document.getElementById("fretboard_image");
let questionElement = document.getElementById("question");

let direction;
let distance;

function smallMod(n, d) {
    let posMod = (((n % d) + d ) % d);
    if (posMod > d/2) {
        return posMod - d
    }
    return posMod;
}

function isCorrect() {

    let userSolution = parseInt(solutionElement.innerHTML, 10);

    let trueSolution = smallMod((direction === "up" ? -1 : 1) * 5 * distance, 12)

    return userSolution === trueSolution;

}

function generateSituation() {
    direction = Math.random() <= 0.5 ? "up" : "down";
    distance = Math.ceil(Math.random() * 5) ;

    imageElement.src = direction + ".png";
    questionElement.innerHTML = "distance : " + distance.toString(10);

    selectText(solutionElement);
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
            solutionElement.innerHTML = "X";
            generateSituation();
        }
    }
}
