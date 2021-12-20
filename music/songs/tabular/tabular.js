// TODO next up add abililty to add comments to website
// add ability to simplify song using a format like AABA inside of song
// make module for helpers and such so I can use the to string from chord here and then do conversions easily.

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
}

let timeSignature = new TimeSignature(4, 0.25);
let song = new Tabular(constructSong(songs["take_the_a_train"]), 3, timeSignature);
// let song = new Tabular(constructSong(songs["there_will_never_be_another_you"]), 3, timeSignature);
let songDisplay = new SongDisplay("Take the A Train", song, 4, 0.5);

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
