const BASE_QUALITIES = {
    "maj": [0, 4, 7],
    "min": [0, 3, 7],
    "dim": [0, 3, 6],
    "aug": [0, 4, 8]
};

const four_note_qualities = {
    "maj7": [0, 4, 7, 11],
    "min7": [0, 3, 7, 10],
    "dom7": [0, 4, 7, 10],
    "half-dim7": [0, 3, 6, 10],
    "dim7": [0, 3, 6, 9],
    "min-maj7" : [0, 3, 7, 11],
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
