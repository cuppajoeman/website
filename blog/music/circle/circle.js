let data =  [
    Array.from(Array(12).keys()).map(String),
]

function getRandomHTMLColor() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function createPieMenu() {
    let pieMenu = document.createElement("div");
    pieMenu.id = "pie-menu"
    pieMenu.classList.add("pie-outer");
    pieMenu.classList.add("full_center");

    let widthDelta = 100/data.length;
    let widthPercentage = 100;

    for (let i = 0; i < data.length; i ++) {
        let dataItem = data[i];
        let numSegments = dataItem.length;
        let segmentAngle = (Math.PI * 2)/numSegments;
        let skewAngle = (Math.PI/2) - segmentAngle;

        let pie = document.createElement("div");
        let pieRotateAngle = (Math.PI/2) - segmentAngle/2;
        pie.classList.add("pie");
        console.log(widthPercentage);

        pie.style.width = `${widthPercentage}%`;
        pie.style.background = 'rgb(100, 100, 100)';

        pie.style.transform = `translate(-50%,-50%) rotate(${pieRotateAngle}rad)`;

        let pieList = document.createElement("ul");

        for (let j = 0; j < dataItem.length; j ++) {
            let rotationAngle = segmentAngle * j;
            let dataContent = dataItem[j];
            let pieListItem = document.createElement('li'); // create a new list item
            pieListItem.classList.add("pie-slice");
            let pieItemAnchor = document.createElement('a'); // create a new list item

            pieListItem.style.transform = `rotate(${rotationAngle}rad) skew(${skewAngle}rad)`;

            pieItemAnchor.appendChild(document.createTextNode(dataContent)); // append the text to the li
            let anchorRotate = segmentAngle/2 - Math.PI/2;
            let anchorSkew = segmentAngle - Math.PI/2;
            pieItemAnchor.style.transform = `skew(${anchorSkew}rad) rotate(${anchorRotate}rad)`;

            pieListItem.appendChild(pieItemAnchor);
            pieList.appendChild(pieListItem)
        }
        pie.appendChild(pieList);
        pieMenu.appendChild(pie);
        widthPercentage -= widthDelta;
    }

    document.body.appendChild(pieMenu);
}

createPieMenu();

function highlight