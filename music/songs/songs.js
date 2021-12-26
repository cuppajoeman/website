// TODO next up add abililty to add comments to website
// add ability to simplify song using a format like AABA inside of song
// make module for helpers and such so I can use the to string from chord here and then do conversions easily.

let w = 1;
let h = w/2;
let q = h/2;
let e = q/2;
let s = e/2;

let rhythmStringToValue = {
    "w":w,
    "h":h,
    "q":q,
    "e":e,
    "s":s,
}

// add a fretboard seed whenever a new songs loads up
// show list of songs and when you click one it loads it up and then you can go back to the list

class Song {
    constructor(title, melody, changes, key, timeSignature) {
        this.title = title;
        this.melody = melody;
        this.changes = changes;
        this.key = key;
        this.timeSignature = timeSignature;
    }
}

class Changes {
    constructor(chords) {
        this.chords = chords;
    }
}

class Melody {
    constructor(measures) {
        this.measures = measures;
    }
}

class Measure {
    constructor(notes, rhythm) {
        this.notes = notes;
        this.rhythm = rhythm;
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

function constructChanges(changesSkeleton) {
    let chords = [];
    for (const chordSkeleton of changesSkeleton) {
        let chordSkeletonNotes = chordSkeleton[0];
        let chordSkeletonDuration = chordSkeleton[1];
        let chord = new Chord(chordSkeletonNotes, chordSkeletonDuration);
        chords.push(chord);
    }
    return new Changes(chords);
}


function constructMelody(melodySkeleton) {
    let measures = [];
    for (const measureSkeleton of melodySkeleton) {
        let melodySkeletonNotes = measureSkeleton[0].split(" ");
        let melodySkeletonRhythm = measureSkeleton[1].split(" ");
        console.assert(melodySkeletonNotes.length === melodySkeletonRhythm.length);
        let measure = new Measure(melodySkeletonNotes, melodySkeletonRhythm);
        measures.push(measure);
    }
    return new Melody(measures);
}

function constructTimeSignature(timeSignatureSkeleton) {
    let [numerator, denominator] = timeSignatureSkeleton.split('/').map(Number);
    let beatsPerMeasure = numerator;
    let durationPerBeat = 1/denominator;
    return new TimeSignature(beatsPerMeasure, durationPerBeat);
}

function constructTitleFromCodeName(codename) {
    const words = codename.split("_");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(" ");
}


let songSkeletons = {
    "take_the_a_train":
    [
        "4/4",
        [
            ["7", "w"], ["7 4' 7 0'", "e qe q q"], ["4' 8", "e hqe"], ["8", "w"],
            ["9", "w"], ["9 10 11 4' 7 6 5 1'",  "e e e e e e e e"], ["0' 4", "e hqe"], ["4", "w"],
            ["7", "w"], ["7 4' 7 0'", "e qe q q"], ["4' 8", "e hqe"], ["8", "w"],
            ["9", "w"], ["9 10 11 4' 7 6 5 1'",  "e e e e e e e e"], ["0' 4", "e hqe"], ["4", "w"],
            ["9 0'", "e heq"], ["4' 5 9 0'", "e qe q q"], ["4' 9", "e hqe"], ["9", "w"],
            ["9 0'", "e hqe"], ["4' 6 9 0'", "e qe q q"], ["4' 9", "e hqe"], ["9 8", "h h"],
            ["7", "w"], ["7 4' 7 0'", "e qe q q"], ["4' 8", "e hqe"], ["8", "w"],
            ["9", "w"], ["9 10 11 4' 7 6 5 1'", "e e e e e e e e"], ["0' 4 5 6", "e qe q q"], ["7 9 11 0' R 0", "e e e e q q"],
        ],
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
    ],
    "there_will_never_be_another_you":
    [
        "4/4",
        [],
        [
            [[0, 4, 7, 11],2],[[ 11, 2, 5, 9],1],[[ 4, 8, 11, 2],1],
            [[9, 0, 4, 7],2],[[ 7, 10, 2, 5],1],[[ 0, 4, 7, 10],1],
            [[5, 9, 0, 4],1],[[ 5, 8, 0, 2],1],[[ 0, 4, 7, 11],1],[[ 9, 0, 4, 7],1],
            [[2, 6, 9, 0],2],[[ 2, 5, 9, 0],1],[[ 7, 11, 2, 5],1],
            [[0, 4, 7, 11],2],[[ 11, 2, 5, 9],1],[[ 4, 8, 11, 2],1],
            [[9, 0, 4, 7],2],[[ 7, 10, 2, 5],1],[[ 0, 4, 7, 10],1],
            [[5, 9, 0, 4],1],[[ 5, 8, 0, 2],1],[[ 0, 4, 7, 11],1],[[ 6, 9, 0, 3],0.5],[[ 11, 3, 6, 9],0.5],
            [[4, 7, 2, 5],0.5],[[ 8, 0, 3, 7],0.5],[[ 7, 10, 2, 5],0.5],[[ 9, 1, 4, 7],0.5],[[ 2, 5, 9, 10],0.5],[[ 7, 11, 2, 5],0.5],[[ 0, 4, 7, 11],0.5],[[ 7, 11, 2, 5],0.5],
        ]
    ],
    "stella_by_starlight":
    [
        "4/4",
        [],
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
    ],
    "st_thomas":
    [
        "4/4",
        [],
        [
            [[0, 4, 7, 11], h], [[5, 9, 0, 3], h], [[4, 7, 11, 2], h], [[9, 1, 4, 7], h],[[2, 5, 9, 0], h], [[7, 11, 2, 5], h],[[0, 4, 7, 9], w],
            [[0, 4, 7, 11], h], [[5, 9, 0, 3], h], [[4, 7, 11, 2], h], [[9, 1, 4, 7], h],[[2, 5, 9, 0], h], [[7, 11, 2, 5], h],[[0, 4, 7, 9], w],
            [[4, 7, 10, 2], h], [[10, 2, 5, 8], h],  [[9, 1, 4, 7, 10], w], [[2, 5, 9, 0], w], [[7, 11, 2, 5], w],
            [[0, 4, 7, 11], h], [[0, 4, 7, 10], h], [[5, 9, 0, 4], h], [[6, 9, 0, 3], h],[[7, 11, 2, 5], w], [[0, 4, 7, 9], w]
        ]
    ],
    "fly_me_to_the_moon":
        [
            "4/4",
            [],
            [
                [[9, 0, 4, 7], w], [[2, 5, 9, 0], w], [[7, 11, 2, 5], w], [[0, 4, 7, 10], w],
                [[5, 9, 0], w], [[11, 2, 5, 9], w], [[4, 8, 11, 2], w], [[9, 0, 4, 7], h], [[9, 1, 4, 7], h],
                [[2, 5, 9, 0], w], [[7, 11, 2, 5], w], [[0, 4, 7, 11], w], [[9, 1, 4, 7], w],
                [[2, 5, 9, 0], w], [[7, 11, 2, 5], w], [[0, 4, 7, 11], w], [[11, 2, 9, 5], h], [[4, 8, 11, 2], h],
                [[9, 0, 4, 7], w], [[2, 5, 9, 0], w], [[7, 11, 2, 5], w], [[0, 4, 7, 10], w],
                [[5, 9, 0], w], [[11, 2, 5, 9], w], [[4, 8, 11, 2], w], [[9, 0, 4, 7], h], [[9, 1, 4, 7], h],
                [[2, 5, 9, 0], w], [[7, 11, 2, 5], w], [[4, 7, 10, 2], w], [[9, 1, 4, 7], w],
                [[2, 5, 9, 0], w], [[7, 11, 2, 5], w], [[0, 4, 7, 11], w], [[11, 2, 5, 9], h],[[4, 8, 11, 2], h]
            ]
        ],
    "solar":
        [
            "4/4",
            [],
            [
                [[0, 3, 7, 9], 2 * w],  [[7, 10, 2, 5], w], [[0, 4, 7, 10], w],
                [[5, 9, 0, 4], 2 * w], [[5, 8, 0, 3], w], [[10, 2, 5, 8], w],
                [[3, 7, 10, 2], w], [[3, 6, 10, 2], h], [[8, 0, 3, 6], h], [[1, 5, 8, 0], w], [[2, 5, 8, 0], h], [[7, 11, 2, 5], h],
            ]
        ],
    "all_the_things_you_are":
        [
            "4/4",
            [],
            [
                [[5, 8, 0, 3], w], [[10, 1, 5, 8], w], [[3, 7, 10, 1], w], [[8, 0, 3, 7], w],
                [[1, 5, 8, 0], w], [[7, 11, 2, 5], w], [[0, 4, 7, 11], 2 * w],
                [[0, 3, 7, 10], w], [[5, 8, 0, 3], w], [[10, 2, 5, 8], w], [[3, 7, 10, 2], w],
                [[8, 0, 3, 7], w], [[9, 0, 3, 7], h], [[2, 6, 9, 0], h], [[7, 11, 2, 6], 2 * w],
                [[9, 0, 4, 7], w], [[2, 6, 9, 0], w], [[7, 11, 2, 6], 2 * w],
                [[6, 9, 0, 4], w], [[11, 3, 6, 9], w], [[4, 8, 11, 3], w], [[0, 4, 7, 10], w],
                [[5, 8, 0, 3], w], [[10, 1, 5, 8], w], [[3, 7, 10, 1], w], [[8, 0, 3, 7], w],
                [[1, 5, 8, 0], w], [[1, 5, 8, 11], h], [[6, 10, 0, 4], h], [[8, 0, 3, 7], w], [[11, 2, 5, 8], w],
                [[10, 1, 5, 8], w], [[3, 7, 10, 1], w], [[8, 0, 3, 7], 2 * w],
            ]
        ],
    "lady_bird":
        [
            "4/4",
            [],
            [
                [[0, 4, 7, 11], 2 * w], [[5, 8, 0, 3], w], [[10, 2, 5, 8], w],
                [[0, 4, 7, 11], 2 * w], [[10, 1, 5, 8], w], [[3, 7, 10, 1], w],
                [[8, 0, 3, 7], 2 * w], [[9, 0, 4, 7], w], [[2, 6, 9, 0], w],
                [[2, 5, 9, 0], w], [[7, 11, 2, 5], w], [[0, 4, 7, 11], h], [[3, 7, 10, 2], h], [[8, 0, 3, 7], h],  [[1, 5, 8, 0], h],
            ]
        ],
    "autumn_leaves":
        [
            "4/4",
            [],
            [
                [[9, 0, 4, 7], w], [[2, 6, 9, 0], w], [[7, 11, 2, 6], w], [[0, 4, 7, 11], w],
                [[6, 9, 0, 4], w], [[11, 3, 6, 9], w], [[4, 7, 11, 1], 2 * w],
                [[9, 0, 4, 7], w], [[2, 6, 9, 0], w], [[7, 11, 2, 6], w], [[0, 4, 7, 11], w],
                [[6, 9, 0, 4], w], [[11, 3, 6, 9], w], [[4, 7, 11, 1], 2 * w],
                [[6, 9, 0, 4], w], [[11, 3, 6, 9], w], [[4, 7, 11, 1], 2 * w],
                [[9, 0, 4, 7], w], [[2, 6, 9, 0], w], [[7, 11, 2, 6], 2 * w],
                [[6, 9, 0, 4], w], [[11, 3, 6, 9], w], [[4, 7, 11, 2],h], [[3, 7, 10, 1],h],  [[2, 5, 9, 0],h], [[1, 5, 8, 11],h],
                [[0, 4, 7, 11], w], [[11, 3, 6, 9], w], [[4, 7, 11, 1], 2 * w],
            ]
        ],
    "blue_bossa":
        [
            "4/4",
            [],
            [
                [[0, 3, 7, 10], 2 * w], [[5, 8, 0, 2], 2 * w],
                [[2, 5, 8 , 0], w], [[7, 11, 2, 5], w], [[0, 3, 7, 9], 2 * w],
                [[3, 6, 10, 1], w], [[8, 0, 3, 6], w], [[1, 5, 8, 0], 2 * w],
                [[2, 5, 8 , 0], w], [[7, 11, 2, 5], w], [[0, 3, 7, 9], w], [[2, 5, 8, 0], h], [[7, 11, 2, 5], h],
            ]
        ],
    "black_orpheus":
        [
            "4/4",
            [],
            [
                [[9, 0, 4, 7 ], w], [[11, 2, 5, 9], h], [[4, 8, 11, 2], h],  [[9, 0, 4, 7], w], [[11, 2, 5, 9], h],  [[4, 8, 11, 2], h],
                [[9, 0, 4, 7 ], w], [[2, 5, 9, 0], h], [[7, 11, 2, 5], h],  [[0, 4, 7, 11], w], [[1, 4, 7, 10], w],
                [[2, 5, 9, 0], w], [[7, 11, 2, 5], w], [[0, 4, 7, 11], w],  [[5, 9, 0, 4], w],
                [[11, 2, 5, 9], w], [[4, 8, 11, 2], w], [[9, 0, 4, 7], w],  [[11, 2, 5, 9], h], [[4, 8, 11, 2], h],
                [[9, 0, 4, 7 ], w], [[11, 2, 5, 9], h], [[4, 8, 11, 2], h],  [[9, 0, 4, 7], w], [[11, 2, 5, 9], h],  [[4, 8, 11, 2], h],
                [[4, 7, 10, 2], w], [[9, 1, 4, 7], w], [[2, 5, 9, 0], 2 * w],
                [[2, 5, 9, 0], w], [[11, 2, 5, 9], h], [[4, 8, 11, 2 ], h],  [[9, 0, 4, 7], w], [[5, 9, 0, 4], w],
                [[11, 2, 5, 9], w], [[4, 8, 11, 2], w], [[9, 0, 4, 7], h],  [[11, 2, 5, 9], h], [[4, 8, 11, 2], w],
            ]
        ],
    "all_of_me":
        [
            "4/4",
            [],
            [
                [[0, 4, 7, 9], 2 * w], [[4, 8, 11, 2], 2 * w],
                [[9, 1, 4, 7], 2 * w], [[2, 5, 9, 11], 2 * w],
                [[4, 8, 11, 2], 2 * w], [[9, 0, 4, 6], 2 * w],
                [[2, 6, 9, 0], 2 * w], [[2, 5, 9, 0], w], [[7, 11, 2, 5], w],
                [[0, 4, 7, 9], 2 * w], [[4, 8, 11, 2], 2 * w],
                [[9, 1, 4, 7], 2 * w], [[2, 5, 9, 11], 2 * w],
                [[5, 9, 0, 2], w], [[5, 8, 0, 2], w], [[0, 4, 7, 9], w], [[9, 1, 4, 7], w],
                [[2, 5, 9, 0], w], [[7, 11, 2, 5], w], [[0, 4, 7, 9], w], [[2, 5, 9, 0], h], [[7, 11, 2, 5], h]
            ]
        ],
}

function constructObjectSongs() {
    let songs = {};
    for (const songName in songSkeletons) {
        let [timeSkeleton, melodySkeleton, changesSkeleton] = songSkeletons[songName];
        let timeSignature = constructTimeSignature(timeSkeleton);
        let melody = constructMelody(melodySkeleton);
        let changes = constructChanges(changesSkeleton);
        let title = constructTitleFromCodeName(songName);
        songs[songName] = new Song(title, melody, changes, timeSignature);
    }
    return songs;
}

let songs = constructObjectSongs();

export { songs }





