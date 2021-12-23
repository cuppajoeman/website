import { songs } from '../songs.js';

function loadChanges(songName) {
    let song = songs[songName]
    const body = document.body, tbl = document.createElement('table');
    let numBarsPerRow = 4;
    tbl.classList.add('center');
    tbl.style.width = '90%';
    tbl.style.height = '80%';
    tbl.style.border = '5px solid white';

    let lineLength = 0;
    let tr ;
    for (const chord of song.changes.chords) {
        if (lineLength % numBarsPerRow === 0) {
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
            td.style.width = `${100/numBarsPerRow}%`;
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

function createTitle(songName) {
    let song = songs[songName];
    let title = document.createElement("h1");
    title.appendChild(document.createTextNode(song.title));
    title.style.fontSize = '3vw';
    title.style.textAlign = 'center';
    title.style.margin = '1vw';
    document.body.appendChild(title);
}

const parsedUrl = new URL(window.location.href);
let songName = parsedUrl.searchParams.get("songName"); // "123"

createTitle(songName);
loadChanges(songName);
