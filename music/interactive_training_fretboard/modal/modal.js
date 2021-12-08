import { setToneSequence } from "../index.js";

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("settings_button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
let saveButton = document.getElementById("save_button");

let chordSequenceInput = document.getElementById("chord_sequence_input");


// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
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

function convertStringChordToIntChord(stringChord) {
    return stringChord.trim().split(" ").map(function(item) {
        return parseInt(item, 10);
    });
}

saveButton.onclick = function() {
    let rawSequence = chordSequenceInput.value;
    let stringChordList = rawSequence.split(",");
    setToneSequence(stringChordList.map(convertStringChordToIntChord));
}

