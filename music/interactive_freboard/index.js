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
            td.onclick = function () {
                new Audio(`guitar_samples/${octave}_${note}.flac`).play();
                this.style.transitionDuration = "0.001ms"
                this.style.backgroundColor = 'green';
            }
            td.addEventListener("transitionend", function() {
                this.style.transitionDuration = "2s"
                this.style.backgroundColor = '#451004';
            })
            td.style.border = '1px solid black';
        }
    }
    body.appendChild(tbl);
}


tableCreate();