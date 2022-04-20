document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
    const birdName = document.querySelector('input').value
    const url = `https://xeno-canto.org/api/2/recordings?query=${birdName}`

    fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        console.log(data)
        addBird(data.recordings[0].file)
    })
    .catch(err => {
        console.log(`error ${err}`)
});
}

let birdSymphony = []

function addBird(birdSound) {
    // Check to see if bird has already been added
    if (birdSymphony.indexOf(birdSound) !== -1)
        return console.error('Bird being added is already in Bird Symphony')

    birdSymphony.push(birdSound)

    // Add bird audio element to symphony of birds
    let bird = document.createElement('audio')
    bird.setAttribute('autoplay', '')
    bird.setAttribute('loop', '')
    bird.src = birdSound
    document.querySelector('#bird-sounds').appendChild(bird)
}