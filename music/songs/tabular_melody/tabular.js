import { songs } from '../songs.js';

function tableCreate(songName) {
    let numBarsPerRow = 4;
    let song = songs[songName];
    const body = document.body, tbl = document.createElement('table');
    tbl.classList.add("center");
    tbl.style.width = '90%';
    tbl.style.height = '80%';
    tbl.style.border = '5px solid white';
    tbl.style.textAlign = 'center';

    let lineLength = 0;
    let tr ;
    for (const measure of song.melody.measures) {
        if (lineLength % numBarsPerRow === 0) {
            tr = tbl.insertRow();
        }
        var td;
        td = tr.insertCell();
        td.style.border = '1px solid white';
        // td.style.fontSize = '2vw';
        td.style.width = `${100/numBarsPerRow}%`;
        const melodyTable = document.createElement('table');
        let noteRow = melodyTable.insertRow();
        let rhythmRow = melodyTable.insertRow();
        melodyTable.style.border = '2px solid white';
        melodyTable.style.borderColor = "white";
        melodyTable.classList.add("center");
        for (let i = 0; i < measure.notes.length; i ++) {
            let note = noteRow.insertCell();
            note.appendChild(document.createTextNode(measure.notes[i]))
            note.style.border = '1px solid white';

            let rhythm = rhythmRow.insertCell();
            rhythm.appendChild(document.createTextNode(measure.rhythm[i]))
            rhythm.style.border = '1px solid white';
        }
        td.appendChild(melodyTable);
        lineLength += 1;
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
tableCreate(songName);
