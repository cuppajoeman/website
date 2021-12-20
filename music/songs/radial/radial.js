
function createLayer(radius) {
    let circleGraph = document.createElement("div");
    circleGraph.classList.add("circlegraph");
    circleGraph.style.width = `${radius}px`;
    circleGraph.style.height = `${radius}px`;
    for (let j = 0; j < 12; j++) {
        let note = document.createElement("div");
        note.classList.add("circle");
        note.classList.add("center");
        let content = document.createTextNode(`${j}`)
        note.appendChild(content);
        circleGraph.appendChild(note);
    }
    let circles = circleGraph.querySelectorAll( '.circle' )
    let theta = 0, dtheta = Math.PI * 2 / circles.length
    for( let i = 0; i < circles.length; ++i ){
        let circle = circles[i]
        theta += dtheta
        circle.style.transform = `translate(-50%, -50%) rotate(${theta}rad) translate(${radius}px) `;
        circle.style.transform += `rotate(${Math.PI/2}rad)`;
    }
    document.body.appendChild(circleGraph)
}

createLayer(100);
createLayer(150);
createLayer(200);
createLayer(250);

