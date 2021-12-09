const BASE_STRINGS = [4, 9, 14, 19, 23, 28]
const MARKERS = [3, 5, 7, 9, 12, 15, 17, 19, 21]
const NUM_STRINGS = 6;
const NUM_FRETS = 21;
let MODE = "HARMONY";

var KEY = getRandomInt(12);

let tonePosition = 0;
var toneSequence = [ [0, 4, 7, 11], [2, 5, 9, 0], [4, 7, 11, 2], [5, 9, 0, 4], [7, 11, 2, 5], [9, 0, 4, 7], [11, 2, 5, 9]];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function setToneSequence(newToneSequence) {
    toneSequence = newToneSequence;
    let chordWindow = document.getElementById("chord_window");
    chordWindow.innerHTML = toneSequence[tonePosition].toString().replace(/,/g, ' ');
}

function getToneSequence() {
    return toneSequence;
}

function setKey(newKey) {
    KEY = newKey;
    let keyElement = document.getElementById("key");
    keyElement.innerHTML = newKey;
}

function getKey() {
    return KEY;
}

function arraysEqual(a, b) {
    a = a.slice(0);
    b = b.slice(0);

    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    a.sort()
    b.sort()

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

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

    // const body = document.body,
    let tbl = document.createElement('table');
    tbl.style.border = '1px solid black';

    let chordWindow = document.getElementById("chord_window");
    chordWindow.innerHTML = toneSequence[tonePosition].toString().replace(/,/g, ' ');

    let keyElement = document.getElementById("key");
    keyElement.innerHTML = KEY.toString();


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
                    // Makes it blue
                    this.classList.toggle("fretted")
                    // "instantly"
                    this.style.transitionDuration = "0.001ms"
                } else if (MODE === "MELODY") {
                    new Audio(`../guitar_samples/${octave}_${note}.flac`).play();
                    this.style.transitionDuration = "0.001ms"
                    this.style.backgroundColor = 'green';
                }
            }
            td.addEventListener("transitionend", function() {
                // This gets called when it turns to blue and when it turns green
                if (this.classList.contains("just_played")) {
                    this.style.transitionDuration = "2s"
                    this.style.backgroundColor = '#300b02';
                }
                // this.classList.toggle("just_fretted");
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

    let fretboard = document.getElementById("fretboard")
    fretboard.appendChild(tbl);
    // body.appendChild(tbl);
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
        let justFrettedNotes = Array.from(document.getElementsByClassName("just_played"));
        // Unmark previous chord
        for (let i = 0; i < justFrettedNotes.length; i++) {
            let justFrettedNote = justFrettedNotes[i];
            justFrettedNote.classList.toggle("just_played");
            justFrettedNote.style.backgroundColor = '#451004';
        }
        let frettedNotes = Array.from(document.getElementsByClassName("fretted"));
        let notesPlayed = [];
        // play sound and visual feedback on chord that is just played
        for (let i = 0; i < frettedNotes.length; i++) {
            let frettedNote = frettedNotes[i];
            const [octave, note] = frettedNote.id.split("_").map(Number)
            notesPlayed.push(note);
            new Audio(`../guitar_samples/${octave}_${note}.flac`).play();
            frettedNote.style.transitionDuration = "0.001ms"
            frettedNote.style.backgroundColor = 'green';
            // Removing
            frettedNote.classList.toggle("fretted");
            // Adding a marker class to fretboard positions just played
            frettedNote.classList.toggle("just_played");
        }
        // Removes duplicates
        let cleanedNotesPlayed = [...new Set(notesPlayed)];
        let keyIntervalsPlayed = cleanedNotesPlayed.map(n => (n - KEY + 12) % 12);
        if (arraysEqual(keyIntervalsPlayed, toneSequence[tonePosition])) {
            tonePosition += 1;
            tonePosition %= toneSequence.length;
            if (tonePosition === 0) {
                setKey(getRandomInt(12));
            }
            let chordWindow = document.getElementById("chord_window");
            chordWindow.innerHTML = toneSequence[tonePosition].toString().replace(/,/g, ' ');
        }
    }

}

// preloadAudio();
tableCreate();

export { setToneSequence, getToneSequence, setKey, getKey };
