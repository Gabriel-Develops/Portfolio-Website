document.querySelector('form').addEventListener('submit', addSound)

function addSound(e) {
    // Prevents page refresh behavoir
    e.preventDefault();
    
    const title = document.querySelector('#title-input').value
    let url = document.querySelector('#url-input').value
    
    if (!title || !url)
        return console.error('Missing parameter')
    
    // Parse out Video ID from URL
    let index = url.indexOf('v=')
    url = url.slice(index + 2, index + 13) // Video IDs are 11 characters long
    url = `https://www.youtube.com/embed/${url}?autoplay=1`

    const sound = new SoundEffect(title, url)

    // Creates Sound element, adds to it event listeners for Playing and Deleting element
    sound.makeSound()

    // Added to LocalStorage
    toMemory(sound)
}

function toMemory(sound) {
    // If memory has no sounds
    if (!localStorage.getItem('sounds'))
        return localStorage.setItem('sounds', JSON.stringify([sound]))
    
    // Memory already has sounds
    const soundArray = JSON.parse(localStorage.getItem('sounds'))
    soundArray.push(sound)

    return localStorage.setItem('sounds', JSON.stringify(soundArray))
}

// Runs on Startup
// Sound methods cannot be stored in Memory, So they are newly created upon load
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