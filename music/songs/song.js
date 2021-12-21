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

let randomKey = document.getElementById("random_key");
let fretboardSeed = document.getElementById("fretboard_seed");

randomKey.appendChild(document.createTextNode(`𝓚: ${Math.floor(Math.random() * 12)}`));
fretboardSeed.appendChild(document.createTextNode(`String: ${Math.floor(Math.random() * 6)} Fret: ${Math.floor(Math.random() * 22)}`));

