let data =  [
    Array.from(Array(12).keys()).map(String),
    Array.from(Array(12).keys()).map(String),
    Array.from(Array(12).keys()).map(String),
    Array.from(Array(12).keys()).map(String),
    Array.from(Array(12).keys()).map(String),
    Array.from(Array(12).keys()).map(String),
    Array.from(Array(12).keys()).map(String),
]

let numBands = data.length;

let mainBandIndex = Math.ceil(data.length/2) - 1;

function validIndex(potentialIndex, maxIndex) {
   return 0 <= potentialIndex && potentialIndex <= maxIndex;
}

let toneSequence = [
    [0, 4, 7, 11],
    [2, 5, 9,  0],
    [4, 7, 11, 2],
    [5, 9, 0, 4],
    [7, 11, 2, 5],
    [9, 0, 4, 7],
    [11, 2, 5, 9],
]

let toneSequenceIndex = 0;

function createPieMenu() {
    let container = document.createElement("div");
    container.classList.add("center");

    let pieMenu = document.createElement("div");
    pieMenu.id = "pie-menu"
    pieMenu.classList.add("pie-outer");

    let deltaWidth = 100/data.length;
    let widthPercentage = 100;

    for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        let numSegments = dataItem.length;
        let segmentAngle = (Math.PI * 2)/numSegments;
        let skewAngle = (Math.PI/2) - segmentAngle;

        let pie = document.createElement("div");
        let pieRotateAngle = (Math.PI/2) - segmentAngle/2;
        pie.classList.add("pie");

        pie.style.width = `${widthPercentage}%`;
        pie.style.background = "black";
        pie.style.transform = `translate(-50%,-50%) rotate(${pieRotateAngle}rad)`;


        let paddingRing = document.createElement("div");
        paddingRing.classList.add("padding_ring");
        paddingRing.classList.add("pie");
        paddingRing.style.width = `${widthPercentage - (deltaWidth/2)}%`;
        paddingRing.style.transform = `translate(-50%,-50%) rotate(${pieRotateAngle}rad)`;

        if (i === mainBandIndex) {
            pie.classList.add("main_ring");
            paddingRing.classList.add("main_ring");
        }

        let pieList = document.createElement("ul");
        let paddingList = document.createElement("ul");

        for (let j = 0; j < dataItem.length; j ++) {
            let rotationAngle = segmentAngle * j;
            let dataContent = dataItem[j];

            let pieListItem = document.createElement('li'); // create a new list item
            let pieItemAnchor = document.createElement('a'); // create a new list item

            let paddingListItem = document.createElement('li'); // create a new list item
            let paddingItemAnchor = document.createElement('a'); // create a new list item

            pieListItem.style.transform = `rotate(${rotationAngle}rad) skew(${skewAngle}rad)`;
            paddingListItem.style.transform = `rotate(${rotationAngle}rad) skew(${skewAngle}rad)`;

            pieItemAnchor.id = `${(data.length - 1) - i}_${j}`;
            paddingListItem.id = `${(data.length - 1) - i}_${j}`;

            pieItemAnchor.appendChild(document.createTextNode(dataContent)); // append the text to the li
            // paddingItemAnchor.appendChild(document.createTextNode(dataContent)); // append the text to the li

            let anchorRotate = segmentAngle/2 - Math.PI/2;
            let anchorSkew = segmentAngle - Math.PI/2;
            pieItemAnchor.style.transform = `skew(${anchorSkew}rad) rotate(${anchorRotate}rad)`;
            paddingItemAnchor.style.transform = `skew(${anchorSkew}rad) rotate(${anchorRotate}rad)`;

            pieListItem.appendChild(pieItemAnchor);
            pieList.appendChild(pieListItem)

            paddingListItem.appendChild(paddingItemAnchor);
            paddingList.appendChild(paddingListItem)
        }
        pie.appendChild(pieList);
        paddingRing.appendChild(paddingList);

        pieMenu.appendChild(pie);
        pieMenu.appendChild(paddingRing);

        widthPercentage -= deltaWidth;
    }

    container.appendChild(pieMenu)
    document.body.appendChild(container);
}

function clearChords() {
    let activatedElements = Array.from(document.getElementsByClassName("activated"));
    for (let i = 0; i < activatedElements.length; i ++) {
        let activatedElement = activatedElements[i];
        activatedElement.classList.toggle("activated");
    }
}

function loadChordsOntoPie(toneSequence, index) {
    // the chord at the given index will be loaded at
    // the main ring and subsequent ones will be going outward
    clearChords();
    for (let i = 0; i < toneSequence.length; i++) {
        let ringIndex = i - mainBandIndex + index;
        console.log(i , ringIndex, numBands, validIndex(ringIndex, numBands));
        if (validIndex(ringIndex, numBands-1)) {
            let chord = toneSequence[ringIndex];
            for (let j = 0; j < chord.length; j++) {
                let interval = chord[j];
                let section = document.getElementById(`${i}_${interval}`);
                section.classList.add("activated");
            }
        }
    }
}


document.addEventListener('keydown', function(event) {
    console.log(toneSequenceIndex);
    if (event.keyCode == '38' || event.key === 'k') {
        toneSequenceIndex = Math.min(toneSequenceIndex + 1, toneSequence.length - 1);
    }
    else if (event.keyCode == '40' || event.key === 'j') {
        toneSequenceIndex = Math.max(toneSequenceIndex - 1, 0);
    }
    else if (event.keyCode == '37' || event.key === 'h') {
        // left arrow
    }
    else if (event.keyCode == '39' || event.key === 'l') {
        // right arrow
    }
    loadChordsOntoPie(toneSequence, toneSequenceIndex);
});

createPieMenu();
loadChordsOntoPie(toneSequence, 0);


