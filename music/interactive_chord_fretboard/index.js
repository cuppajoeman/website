function quotientRemainder(n, d) {
    var quotient = Math.floor(n/d);
    var remainder = n % d;
    return [quotient, remainder];
}

function tableCreate() {

    const body = document.body,
        tbl = document.createElement('table');
    tbl.style.border = '1px solid black';

    const BASE_STRINGS = [4, 9, 14, 19, 23, 28]
    const MARKERS = [3, 5, 7, 9, 12, 15, 17, 19, 21]

    let numStrings = 6;
    let numFrets = 21;

    for (let i = 0; i < numStrings; i++) {
        const tr = tbl.insertRow();
        for (let j = 0; j < numFrets; j++) {
            const inverted_y_index = (numStrings - 1) - i;
            let octave, note;
            [octave, note] = quotientRemainder((BASE_STRINGS[inverted_y_index] + j), 12)
            octave += 3
            const td = tr.insertCell();
            td.classList.add("fret")
            // td.appendChild(document.createTextNode(`${octave}_${note}`));
            if (j === 0) {
                td.appendChild(document.createTextNode("o"));
            } else {
                td.appendChild(document.createTextNode("*"));
            }
            td.id = `guitar_samples/${octave}_${note}.flac`;
            td.onclick = function () {
                this.classList.toggle("fretted")
                this.style.transitionDuration = "0.001ms"
            }
            td.addEventListener("transitionend", function() {
                if (! this.classList.contains("fretted")) {
                    this.style.transitionDuration = "2s"
                    this.style.backgroundColor = '#451004';
                }
            })
            if (MARKERS.includes(j)) {
                td.style.borderRight = '3px solid black';
                td.style.borderLeft = '1px solid black';
                td.style.borderTop = '1px solid black';
                td.style.borderBottom = '1px solid black';
            } else {
                td.style.border = '1px solid black';
            }
        }
    }
    body.appendChild(tbl);
}

document.body.onkeyup = function(e){
    if(e.key === ' '){
        // Copy since we are modifying during iterations by using toggle
        var frettedNotes = Array.from(document.getElementsByClassName("fretted"));
        for (var i = 0; i < frettedNotes.length; i++) {
            var frettedNote = frettedNotes[i];
            new Audio(frettedNote.id).play();
            frettedNote.style.transitionDuration = "0.001ms"
            frettedNote.style.backgroundColor = 'green';
            frettedNote.classList.toggle("fretted")
        }
    }
}

tableCreate();