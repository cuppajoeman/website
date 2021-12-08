const BASE_STRINGS = [4, 9, 14, 19, 23, 28]
const MARKERS = [3, 5, 7, 9, 12, 15, 17, 19, 21]
const NUM_STRINGS = 6;
const NUM_FRETS = 21;
let MODE = "HARMONY";

function quotientRemainder(n, d) {
    let quotient = Math.floor(n/d);
    let remainder = n % d;
    return [quotient, remainder];
}


function constructNoteAndOctaveFromFretboardPosition(string, fret) {
    const inverted_y_index = (NUM_STRINGS - 1) - string;
    let octave, note;
    [octave, note] = quotientRemainder((BASE_STRINGS[inverted_y_index] + fret), 12)
    octave += 3
    return [octave, note]
}

function preloadAudio() {
    for (let i = 0; i < NUM_STRINGS; i++) {
        for (let j = 0; j < NUM_FRETS; j++) {
            const [octave, note] = constructNoteAndOctaveFromFretboardPosition(i, j);
            new Audio(`../guitar_samples/${octave}_${note}.flac`);
        }
    }
}

function tableCreate() {

    const body = document.body,
    tbl = document.createElement('table');
    tbl.style.border = '1px solid black';

    let chordBox = document.createElement('div');
    chordBox.classList.add("chord_window")
    chordBox.appendChild(document.createTextNode("0 4 7 11"));


    for (let i = 0; i < NUM_STRINGS; i++) {
        const tr = tbl.insertRow();
        for (let j = 0; j < NUM_FRETS; j++) {
            const [octave, note] = constructNoteAndOctaveFromFretboardPosition(i, j);
            const td = tr.insertCell();
            td.classList.add("fret")
            if (j === 0) {
                td.appendChild(document.createTextNode("o"));
            } else {
                td.appendChild(document.createTextNode("*"));
            }
            td.id = `${octave}_${note}`;
            td.onclick = function () {
                if (MODE === "HARMONY") {
                    this.classList.toggle("fretted")
                    this.style.transitionDuration = "0.001ms"
                } else if (MODE === "MELODY") {
                    new Audio(`../guitar_samples/${octave}_${note}.flac`).play();
                    this.style.transitionDuration = "0.001ms"
                    this.style.backgroundColor = 'green';
                }
            }
            td.addEventListener("transitionend", function() {
                if (! this.classList.contains("fretted")) {
                    this.style.transitionDuration = "2s"
                    this.style.backgroundColor = '#451004';
                }
            })
            if (MARKERS.includes(j)) {
                td.style.borderRight = '3px solid black';
                td.style.borderLeft = '1px solid black';
                td.style.borderTop = '1px solid black';
                td.style.borderBottom = '1px solid black';
            } else {
                td.style.border = '1px solid black';
            }
        }
    }
    body.appendChild(tbl);
    body.appendChild(chordBox);
}

document.body.onkeyup = function(e){
    if(e.key === 'H'){
        MODE = "HARMONY"
    }
    if(e.key === 'M'){
        MODE = "MELODY"
        let frettedNotes = Array.from(document.getElementsByClassName("fretted"));
        for (let i = 0; i < frettedNotes.length; i++) {
            let frettedNote = frettedNotes[i];
            frettedNote.classList.toggle("fretted")
        }
    }
    if(MODE === "HARMONY" && e.key === ' '){
        // Copy since we are modifying during iterations by using toggle
        let frettedNotes = Array.from(document.getElementsByClassName("fretted"));
        let notes_played = [];
        for (let i = 0; i < frettedNotes.length; i++) {
            let frettedNote = frettedNotes[i];
            const [octave, note] = frettedNote.id.split("_").map(Number)
            notes_played.push(note);
            new Audio(`../guitar_samples/${octave}_${note}.flac`).play();
            frettedNote.style.transitionDuration = "0.001ms"
            frettedNote.style.backgroundColor = 'green';
            frettedNote.classList.toggle("fretted")
        }
        console.log(notes_played)
    }

}

preloadAudio();
tableCreate();
