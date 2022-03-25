let tone_collections = [[1, 3, 4, 6, 7, 9, 10], [1, 2, 4, 6, 7, 9, 10], [1, 2, 4, 5, 7, 9, 10], [1, 2, 4, 5, 7, 8, 10], [0, 2, 4, 5, 7, 8, 10],
    [0, 2, 3, 5, 7, 8, 10], [0, 2, 3, 5, 6, 8, 10], [0, 2, 3, 5, 6, 8, 9], [0, 1, 3, 5, 6, 8, 9], [0, 1, 3, 4, 6, 8, 9],
    [0, 1, 3, 4, 6, 7, 9], [0, 3, 5, 6, 8, 9, 11], [0, 3, 4, 6, 8, 9, 11], [0, 3, 4, 6, 7, 9, 11], [0, 3, 4, 6, 7, 9, 10],
    [0, 2, 5, 6, 8, 9, 11], [0, 2, 4, 6, 8, 9, 11], [0, 2, 4, 6, 7, 9, 11], [0, 2, 4, 6, 7, 9, 10], [0, 2, 4, 5, 8, 9, 11],
    [0, 2, 4, 5, 7, 9, 11], [0, 2, 4, 5, 7, 9, 10], [0, 2, 4, 5, 7, 8, 11], [0, 2, 4, 5, 7, 8, 10], [0, 2, 3, 6, 8, 9, 11],
    [0, 2, 3, 6, 7, 9, 11], [0, 2, 3, 6, 7, 9, 10], [0, 2, 3, 5, 8, 9, 11], [0, 2, 3, 5, 7, 9, 11], [0, 2, 3, 5, 7, 9, 10],
    [0, 2, 3, 5, 7, 8, 11], [0, 2, 3, 5, 7, 8, 10], [0, 2, 3, 5, 6, 9, 11], [0, 2, 3, 5, 6, 9, 10], [0, 2, 3, 5, 6, 8, 11],
    [0, 2, 3, 5, 6, 8, 10], [0, 2, 3, 5, 6, 8, 9], [0, 1, 4, 6, 7, 9, 10], [0, 1, 4, 5, 7, 9, 10], [0, 1, 4, 5, 7, 8, 10],
    [0, 1, 3, 6, 7, 9, 10], [0, 1, 3, 5, 7, 9, 10], [0, 1, 3, 5, 7, 8, 10], [0, 1, 3, 5, 6, 9, 10], [0, 1, 3, 5, 6, 8, 10],
    [0, 1, 3, 5, 6, 8, 9], [0, 1, 3, 4, 7, 9, 10], [0, 1, 3, 4, 7, 8, 10], [0, 1, 3, 4, 6, 9, 10], [0, 1, 3, 4, 6, 8, 10],
    [0, 1, 3, 4, 6, 8, 9], [0, 1, 3, 4, 6, 7, 10], [0, 1, 3, 4, 6, 7, 9]]

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

// document.getElementById("tone_collection").innerHTML = generateRandomToneCollection().join(" ");
document.getElementById("tone_collection").innerHTML = tone_collections[Math.floor(Math.random() * tone_collections.length)].join(' ');
