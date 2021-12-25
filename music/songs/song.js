import { songs } from './songs.js';

let randomKey = document.getElementById("random_key");
let fretboardSeed = document.getElementById("fretboard_seed");

randomKey.appendChild(document.createTextNode(`𝓚: ${Math.floor(Math.random() * 12)}`));
fretboardSeed.appendChild(document.createTextNode(`String: ${Math.floor(Math.random() * 6)} Fret: ${Math.floor(Math.random() * 18)}`));

let songsDiv = document.getElementById("songs");
let songList = document.createElement("ul")
for (const songName in songs) {
    let songListItem = document.createElement("li");
    let melodyAnchor = document.createElement("a");
    let changesAnchor = document.createElement("a");

    let currUrl = new URL(document.URL).pathname;
    let hostName = new URL(document.URL).hostname;
    let basePath = currUrl.substr(0, currUrl.lastIndexOf("/"));
    let changesPath = basePath + '/tabular/tabular.html'
    let melodyPath  = basePath + '/tabular_melody/tabular.html'

    let changesURL = new URL(`https://${hostName}${changesPath}`);
    changesURL.searchParams.append('songName', songName);
    changesAnchor.href = changesURL.toString();
    changesAnchor.appendChild(document.createTextNode("Changes"))

    let melodyURL = new URL(`https://${hostName}${melodyPath}`);
    melodyURL.searchParams.append('songName', songName);
    melodyAnchor.href = melodyURL.toString();
    melodyAnchor.appendChild(document.createTextNode("Melody, "))

    songListItem.appendChild(document.createTextNode(`${songs[songName].title}: `));
    songListItem.appendChild(melodyAnchor);
    songListItem.appendChild(changesAnchor);
    songList.appendChild(songListItem);
}
songsDiv.appendChild(songList);






