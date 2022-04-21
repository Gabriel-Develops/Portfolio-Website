document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
    const birdName = document.querySelector('input').value
    const url = `https://xeno-canto.org/api/2/recordings?query=${birdName}`

    fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        console.log(data)
        let bird = addBird(data.recordings[0].file)  // Audio Source
        if (bird === -1)
            return
            
        addPicofBird(bird, data.recordings[0].en) // Bird Name in English
    })
    .catch(err => {
        console.log(`error ${err}`)
});
}

let birdSymphony = []

function addBird(birdSound) {
    // Check to see if bird has already been added
    if (birdSymphony.indexOf(birdSound) !== -1) {
        console.error('Bird being added is already in Bird Symphony')
        return -1
    }

    birdSymphony.push(birdSound)

    // Add bird audio element to symphony of birds
    let birdNoise = document.createElement('audio')
    birdNoise.setAttribute('autoplay', '')
    birdNoise.setAttribute('loop', '')
    birdNoise.src = birdSound

    let bird = document.createElement('div')
    bird.appendChild(birdNoise)

    document.querySelector('#birds').appendChild(bird)
    return bird
}

function addPicofBird(bird, name) {
    let url = `https://gtfo-cors--timmy_i_chen.repl.co/get?url=https://imsea.herokuapp.com/api/1?q=${name}`
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let title = document.createElement('span')
        title.innerText = name
        bird.appendChild(title)

        bird.style.backgroundImage = `url('${data.results[0]}')`
        bird.classList.add('image')

        bird.addEventListener('click', function() {
            let position = birdSymphony.indexOf(this.children[0].attributes[2].value)
            birdSymphony.splice(position, 1)

            this.remove()
        })
    })
    .catch((error) => {
    console.error('Error:', error);
    })
}


// fetch(url)
// .then(response => response.json())
// .then(data => {
//     console.log(data)

//     document.querySelector('section').innerHTML = ''

//     let uniqData = Array.from(new Set(data.results))
//     console.log('unique', new Set(data.results))

//     uniqData.forEach(element => {
//         let image = document.createElement('img')
//         image.src = element
//         image.setAttribute('class', 'masonry-item')
//         document.querySelector('section').appendChild(image)
//     })
// })
// .catch((error) => {
// console.error('Error:', error);
// })