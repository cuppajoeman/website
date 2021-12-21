// TODO next up add abililty to add comments to website
// add ability to simplify song using a format like AABA inside of song
// make module for helpers and such so I can use the to string from chord here and then do conversions easily.

let w = 1;
let h = w/2;
let q = h/2;
let e = q/2;
let s = e/2;

// add a fretboard seed whenever a new songs loads up
// show list of songs and when you click one it loads it up and then you can go back to the list
class SongDisplay {
    constructor(title, song, numBarsPerRow, minimumDivision) {
        this.song = song;
        this.numBarsPerRow = numBarsPerRow;
        this.title = title;
        this.minimumDivision = minimumDivision
    }
}

class Tabular {
    constructor(chords, key, timeSignature) {
        this.chords = chords;
        this.key = key;
        this.timeSignature = timeSignature;
    }
}

class Chord {
    constructor(notes, duration) {
        this.notes = notes;
        this.duration = duration;
        this.stringChord = notes.toString();
    }
}

class TimeSignature {
    constructor(beatsPerMeasure, durationOfBeat) {
        this.beatsPerMeasure = beatsPerMeasure;
        this.durationOfBeat = durationOfBeat;
    }
}

function constructSong(songSkeleton) {
    let song = [];
    for (const chordSkeleton of songSkeleton) {
        let chordSkeletonNotes = chordSkeleton[0];
        let chordSkeletonDuration = chordSkeleton[1];
        let chord = new Chord(chordSkeletonNotes, chordSkeletonDuration);
        song.push(chord);
    }
    return song;
}

let songs = {
    "take_the_a_train":
        [
            [[0, 4, 7, 9], 2], [[2, 6, 9, 0], 2],
            [[2, 5, 9, 0], 1], [[7, 11, 2, 5], 1], [[0, 4, 7, 9], 1], [[2, 5, 9, 0], 0.5], [[7, 11, 2, 5], 0.5],
            [[0, 4, 7, 9], 2], [[2, 6, 9, 0], 2],
            [[2, 5, 9, 0], 1], [[7, 11, 2, 5], 1], [[0, 4, 7, 9], 1], [[7, 10, 2, 5], 0.5], [[0, 4, 7, 10], 0.5],
            [[5, 9, 0, 2], 4],
            [[2, 6, 9, 0], 2], [[2, 5, 9, 0], 1], [[7, 11, 2, 5], 1],
            [[0, 4, 7, 9], 2], [[2, 6, 9, 0], 2],
            [[2, 5, 9, 0], 1], [[7, 11, 2, 5], 1], [[0, 4, 7, 9], 1], [[2, 5, 9, 0], 0.5], [[7, 11, 2, 5], 0.5]
        ],
    "there_will_never_be_another_you":
        [
            [[0, 4, 7, 11],2],[[ 11, 2, 5, 9],1],[[ 4, 8, 11, 2],1],
            [[9, 0, 4, 7],2],[[ 7, 10, 2, 5],1],[[ 0, 4, 7, 10],1],
            [[5, 9, 0, 4],1],[[ 5, 8, 0, 2],1],[[ 0, 4, 7, 11],1],[[ 9, 0, 4, 7],1],
            [[2, 6, 9, 0],2],[[ 2, 5, 9, 0],1],[[ 7, 11, 2, 5],1],
            [[0, 4, 7, 11],2],[[ 11, 2, 5, 9],1],[[ 4, 8, 11, 2],1],
            [[9, 0, 4, 7],2],[[ 7, 10, 2, 5],1],[[ 0, 4, 7, 10],1],
            [[5, 9, 0, 4],1],[[ 5, 8, 0, 2],1],[[ 0, 4, 7, 11],1],[[ 6, 9, 0, 3],0.5],[[ 11, 3, 6, 9],0.5],
            [[4, 7, 2, 5],0.5],[[ 8, 0, 3, 7],0.5],[[ 7, 10, 2, 5],0.5],[[ 9, 1, 4, 7],0.5],[[ 2, 5, 9, 10],0.5],[[ 7, 11, 2, 5],0.5],[[ 0, 4, 7, 11],0.5],[[ 7, 11, 2, 5],0.5],
        ],
    "stella_by_starlight":
    [
        [[6, 9, 0, 4], 1], [[11, 3, 6, 9], 1], [[2, 5, 9, 0], 1], [[7, 11, 2, 5], 1],
        [[7, 10, 2, 5], 1], [[0, 4, 7, 10], 1], [[5, 9, 0, 4], 1], [[10, 2, 5, 8], 1],
        [[0, 4, 7, 11], 1], [[6, 9, 0, 4], 0.5], [[11, 3, 6, 9], 0.5], [[4, 7, 11, 2], 1], [[0, 3, 7, 10], 0.5],[[5, 9, 0, 3], 0.5],
        [[7, 11, 2, 6], 1], [[6, 9, 0, 4], 0.5], [[11, 3, 6, 9], 0.5], [[11, 2, 5, 9], 1], [[4, 7, 11, 2], 1],
        [[9, 1, 4, 7, 5], 2], [[2, 5, 9, 11], 2],
        [[10, 2, 5, 8], 2], [[0, 4, 7, 11], 2],
        [[6, 9, 0, 4], 1], [[11, 3, 6, 9], 1], [[4, 7, 10, 2], 1], [[9, 1, 4, 7], 1],
        [[2, 5, 8, 0], 1], [[7, 11, 2, 5], 1], [[0, 4, 7, 11], 2],
    ]
}

let x = [
    [[11, w]], [[11, q], [9, q], [11, q], [0, q]],
]

A = [
    ["7", [4*q]],
    ["7 4' 7 0'", [e, q + q, q, q]],
    ["4' 8 8", [q, e, 3 * q]],
    ["8", [4 * q]],
    ["9", [4 * q]],
    ["9 10 11 4' 7 6 5 1'", [q, e, q, e, q, e, q, e]],
    ["0' 4 4", [q, e, 3 * q]],
    ["4", [4 * q]],
]

q = [
    ["9 0' 0'", [q, e, 3 * q]],
    ["4' 5 9 0'", [e, q + q, q, q]],
    ["4' 9 9", [q, q + e, 2*q]],
    ["9", [4*q]],
    ["9 0' 0'", [q, e, 3 * q]],
    ["4' 6 9 0'", [e, q + q, q, q]],
    ["4' 9 9", [q, e, 3*q]],
    ["9 8", [2*q, 2*q]],
]

A_prime = [
    ["7", [4*q]],
    ["7 4' 7 0'", [e, q + q, q, q]],
    ["4' 8 8", [q, e, 3 * q]],
    ["8", [4 * q]],
    ["9", [4 * q]],
    ["9 10 11 4' 7 6 5 1'", [q, e, q, e, q, e, q, e]],
    ["0' 4 5 6", [e, q + q, q, q]],
    ["7 9 11 0' R 0", [q, e, q, e, q, q]],
]

take_ehe_a_erain = [
    *A,
*q,
*A_prime
]

A = [
    ["7' 5' 9 0' 4'", [q, e, q, e, 2*q]],
    ["7' 5' 9 0' 4'", [q, e, q, e, 2*q]],
    ["7' 5' 9 0' 4' 4'", [q, e, q, e, q, q]],
    ["4' 4' 2' 0' 9", [2*q, q, e, q, e]],
    ["0' 0' 0'", [q,q,2*q]],
    ["0' 4' 2' 0' 9", [2*q, q, e, q, e]],
    ["0'", [4*q]],
    ["0' R", [2*q, 2*q]],
]

q = [
    ["0' 2'", [2*q, 2*q]],
    ["3' 4'", [2*q, 2*q]],
    ["R 5' 7' 5' 7'", [q, q, q, e, q]],
    ["8' 7' 5'", [q, q, 2*q + e]],
    ["2' 4'", [2*q, 2*q]],
    ["5' 6'", [2*q, 2*q]],
    ["R 7' 9' 7' 9'", [q, q, q, e, q]],
    ["10' 9' 7'", [q, q, 2*q + e]],
]

honey_suckle_rose = [
    *A, *A, *q, *A
]

A = [
    ["R 7 0' R 11 R 9 7", [q, q, e, q, e, q, e]],
    ["7 9 4 5", [q, q, q, q]],
    ["7 0' 11 0'", [q, q, q, q]],
    ["R", [4*q]],
]

q = [
    ["4' 5' 7'", [2*q, q + q, e]],
    ["R", [4 * q]],
    ["5' 4' 2'", [2*q, q + q, e]],
    ["R", [4*q]],
]

C = [
    ["4' 2'", [2*q, 2*q]],
    ["0' 9", [q + q, e + 2*q]],
    ["7 0' 11 0'", [q, q, q, q]],
    ["R", [4*q]],
]

se_thomas = [
    *A, *A, *q, *C
]

A = [
    ["9 11 0' 2'", [q, q, q, q]],
    ["4' 7' 2' 0'", [q, q, q, q]],
    ["2'", [4*q]],
    ["2' R 4'", [2*q, q, e + q ]],
    ["0' 2' 4' 7'", [q, q, q, q]],
    ["9' 0'' 9' 7'", [q, q, q + q, e]],
    ["9'", [4*q]],
    ["9' 7'", [3*q, q]],
]

there_qill_never_qe_anoeher_you = [
    *A,
    ["0'' 9' 7' 5'", [q, q, q, q]],
    ["4' 2' 4' 5'", [q, q, q, q]],
    ["7' 4' 2' 0'", [q, q, q, q]],
    ["2' 0' 2' 0'", [q, q, e + q, q]],
    ["11' 9' 7' 6'", [q, q, q, q]],
    ["4' 2' 4' 2'", [q, q, q, q]],
    ["5'", [4*q]],
    ["5' 7", [3*q, q]],
*A,
    ["0'' 9' 7' 5'", [q, q, q, q]],
    ["4' 2' 4' 5'", [q, q, q, q]],
    ["7' 4' 2' 0' 11", [q, q, q, q, e]],
    ["11 R 9", [2*q, q, e + q]],
    ["7' 0'' 11' 9'", [q, q, q, q]],
    ["7' 0' 7' 5'", [q, q, q, q]],
    ["2' 4'", [2*q, 2*q]],
    ["0'", [4*q]],
]



function createTitleFromCodeName(codename) {
    const words = codename.split("_");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(" ");
}

let timeSignature = new TimeSignature(4, 0.25);
// let song = new Tabular(constructSong(songs["take_the_a_train"]), 3, timeSignature);
// let song = new Tabular(constructSong(songs["there_will_never_be_another_you"]), 3, timeSignature);
let songCodeName = "stella_by_starlight"
let song = new Tabular(constructSong(songs[songCodeName]), 3, timeSignature);
let songDisplay = new SongDisplay(createTitleFromCodeName(songCodeName), song, 4, 0.5);

function tableCreate() {
    const body = document.body, tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.style.height = '80%';
    tbl.style.border = '5px solid white';

    let lineLength = 0;
    let tr ;
    for (const chord of songDisplay.song.chords) {
        if (lineLength % (songDisplay.numBarsPerRow ) === 0) {
            tr = tbl.insertRow();
        }
        for (let i = 0; i < chord.duration; i++) {
            var td;
            if (lineLength % 1 === 0) {
                console.log("yes")
                td = tr.insertCell();
                td.style.border = '1px solid white';
                td.style.fontSize = '2vw';
            }
            td.style.width = `${100/songDisplay.numBarsPerRow}%`;
            if (i === 0) {
                if (td.hasChildNodes()) {
                    td.appendChild(document.createTextNode(" - " + chord.stringChord));
                } else {
                    td.appendChild(document.createTextNode(chord.stringChord));
                }
            } else {
                td.appendChild(document.createTextNode("%"));
            }
        }
        lineLength += chord.duration;
    }
    body.appendChild(tbl);
}

function createTitle() {
    let title = document.createElement("h1");
    title.appendChild(document.createTextNode(songDisplay.title));
    title.style.fontSize = '3vw';
    title.style.textAlign = 'center';
    title.style.margin = '1vw';
    document.body.appendChild(title);
}

createTitle();
tableCreate();
