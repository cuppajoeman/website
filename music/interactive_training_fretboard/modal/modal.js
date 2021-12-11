import { setToneSequence, getToneSequence, setKey, getKey, setNotationMode, loadNotation} from "../index.js";

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("settings_button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
let saveButton = document.getElementById("save_button");

let chordSequenceInput = document.getElementById("chord_sequence_input");
let keyInput = document.getElementById("key_input");

let standardNotationRadioButton = document.getElementById("standard_notation");
let integerNotationRadioButton = document.getElementById("integer_notation");

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
    chordSequenceInput.value = getToneSequence().map(convertIntChordToStringChord).toString();
    keyInput.value = getKey().toString();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function convertIntChordToStringChord(intChord) {
    return intChord.toString().replace(/,/g, ' ');
}

function convertStringChordToIntChord(stringChord) {
    return stringChord.trim().split(" ").map(function(item) {
        return parseInt(item, 10);
    });
}

saveButton.onclick = function() {
    let rawSequence = chordSequenceInput.value;
    let stringChordList = rawSequence.split(",");
    setToneSequence(stringChordList.map(convertStringChordToIntChord));
    setKey(parseInt(keyInput.value));
    if (standardNotationRadioButton.checked) {
        setNotationMode("STANDARD");
    } else if (integerNotationRadioButton.checked) {
        setNotationMode("INTEGER");
    }
    loadNotation();
}

