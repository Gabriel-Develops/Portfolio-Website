class SoundEffect {
    constructor(title, url) {
        this.title = title
        this.url = url
    }
    makeSound() {
        const div = document.createElement('div')
        div.classList.add('sound-effect')

        const button = document.createElement('button')
        button.innerHTML = '&#215;'

        const h2 = document.createElement('h2')
        h2.innerText = this.title

        div.appendChild(button)
        div.appendChild(h2)

        h2.addEventListener('click', () => {
            this.play(div)
        })

        button.addEventListener('click', () => {
            this.delete(div)
        })

        document.querySelector('#sound-effects-container').appendChild(div)
    }
    play(div) {
        const iframe = document.createElement('iframe')
        iframe.src = this.url
        iframe.allow = 'autoplay'
        console.log(iframe)

        div.appendChild(iframe)
    }
    delete(div) {
        div.remove()

        // Remove from Memory
        const soundArray = JSON.parse(localStorage.getItem('sounds'))
        const index = soundArray.findIndex(object => object.title === this.title && object.url === this.url)
        soundArray.splice(index, 1)
        localStorage.setItem('sounds', JSON.stringify(soundArray))
    }
}



// Add sounds from localStorage

document.querySelector('form').addEventListener('submit', addSound)

function addSound(e) {
    e.preventDefault();
    const title = document.querySelector('#title-input').value
    let url = document.querySelector('#url-input').value
    
    if (!title || !url)
        return console.error('Missing parameter')
    
    url = `https://www.youtube.com/embed/${url}?autoplay=1`

    const sound = new SoundEffect(title, url)

    sound.makeSound()

    toMemory(sound)
}


// LocalStorage
function toMemory(sound) {
    // If memory has no sounds
    if (!localStorage.getItem('sounds'))
        return localStorage.setItem('sounds', JSON.stringify([sound]))
    
    // Memory already has sounds
    const soundArray = JSON.parse(localStorage.getItem('sounds'))
    soundArray.push(sound)

    return localStorage.setItem('sounds', JSON.stringify(soundArray))
}


function printSoundsFromStorage() {
    if (!localStorage.getItem('sounds'))
        return console.log('No sounds in memory')

    const sounds = JSON.parse(localStorage.getItem('sounds'))

    sounds.forEach(element => {
        let sound = new SoundEffect(element.title, element.url)
        sound.makeSound()
    })
}

printSoundsFromStorage()