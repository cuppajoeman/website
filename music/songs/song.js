// TODO next up add abililty to add comments to website
class SongDisplay {
    constructor(title, song, numBarsPerRow, minimumDivision) {
        this.song = song;
        this.numBarsPerRow = numBarsPerRow;
        this.title = title;
        this.minimumDivision = minimumDivision
    }
}

class Song {
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
        ]
}

let timeSignature = new TimeSignature(4, 0.25);
let song = new Song(constructSong(songs["take_the_a_train"]), 3, timeSignature);
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
