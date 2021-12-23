import { songs } from './songs.js';

let randomKey = document.getElementById("random_key");
let fretboardSeed = document.getElementById("fretboard_seed");

randomKey.appendChild(document.createTextNode(`𝓚: ${Math.floor(Math.random() * 12)}`));
fretboardSeed.appendChild(document.createTextNode(`String: ${Math.floor(Math.random() * 6)} Fret: ${Math.floor(Math.random() * 22)}`));

let songsDiv = document.getElementById("songs");
let songList = document.createElement("ul")
for (const songName in songs) {
    let songListItem = document.createElement("li");
    let songListItemAnchor = document.createElement("a");

    let currUrl = new URL(document.URL).pathname;
    let hostName = new URL(document.URL).hostname;
    let basePath = currUrl.substr(0, currUrl.lastIndexOf("/"));
    basePath += '/tabular/tabular.html'


    var url = new URL(`https://${hostName}${basePath}`);
    url.searchParams.append('songName', songName);

    songListItemAnchor.href = url;

    songListItemAnchor.appendChild(document.createTextNode(songs[songName].title));
    songListItem.appendChild(songListItemAnchor);
    songList.appendChild(songListItem);
}
songsDiv.appendChild(songList);






