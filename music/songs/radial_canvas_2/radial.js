var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.translate(canvas.width/2, canvas.height/2);


let data =  [
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"],
    ["a", "b", "c", "d", "e", "f", "g", "h", ],
    ["a", "b", "c", "d",]
]

// let temp = [
//     ["100%", "#333"],
//     ["80%", "teal"],
//     ["60%", "grey"],
//     ["40%", "orange"],
// ]

let temp = [
    ["black"],
    ["teal"],
    ["gray"],
    ["orange"],
]

function radsToDegree(rads) {
    return rads * (180/Math.PI);
}

function getRandomHTMLColor() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function createdPartitionedAnnulus() {
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    let strokeWidth = 50;

    let originX = canvasWidth/2;
    let originY = canvasHeight/2;

    let radius = Math.min(canvasWidth,canvasHeight)/2 + (-strokeWidth/2)  + (-strokeWidth * (data.length - 1));


    for (let i = 0; i < data.length; i ++) {
        let dataItem = data[i];
        let numSegments = dataItem.length;
        let segmentAngle = (Math.PI * 2)/numSegments;

        for (let j = 0; j < dataItem.length; j ++) {
            let rotationAngle = segmentAngle * j;
            let dataContent = dataItem[j];

            ctx.lineWidth=strokeWidth;
            ctx.lineCap='butt';
            ctx.beginPath();
            ctx.arc(0, 0,radius,rotationAngle , rotationAngle + segmentAngle);
            ctx.strokeStyle= getRandomHTMLColor();
            ctx.stroke();

            ctx.save();
            ctx.rotate(-rotationAngle);
            ctx.rotate(-(Math.PI/2 + segmentAngle/2));
            ctx.font = '20px Arial';
            ctx.textAlign = "center";
            ctx.fillText("hi", 0, radius + strokeWidth/4);
            ctx.restore();
        }
        radius += strokeWidth;
    }
}


createdPartitionedAnnulus();


// If you want your text to be rotated as well: https://stackoverflow.com/a/28997668/6660685
