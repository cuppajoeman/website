
function generateRandomToneCollection(size=7) {
    let bucket = [];
    for (let i=1;i<=11;i++) {
        bucket.push(i);
    }
    function getRandomFromBucket() {
        let randomIndex = Math.floor(Math.random()*bucket.length);
        return bucket.splice(randomIndex, 1)[0];
    }
    let toneCollection = [0]; // Always contains 0
    for (let i = 0; i < size - 1; i ++){
        toneCollection.push(getRandomFromBucket())
    }
    toneCollection.sort(function(a,b){return a - b});
    return toneCollection;
}

document.getElementById("tone_collection").innerHTML = generateRandomToneCollection().join(" ");
