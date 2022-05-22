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

// KEYBOARD SHORTCUTS

function addShortcuts() {
    const shortcutArr = Array.from({length: 9}, (_, index) => index)

    for (let shortcut of shortcutArr) {
        document.addEventListener('keyup', (event) => {
            const key = event.key
            if (key != shortcut)
                return

            const sounds = Array.from(document.querySelectorAll('.sound-effect'))
            sounds[shortcut - 1].children[1].dispatchEvent(new KeyboardEvent('click'))
        })
    }
}
addShortcuts()


// MODAL

document.querySelector('#modal-container button').addEventListener('click', showModal)

document.querySelector('#modal button').addEventListener('click', hideModal)
document.querySelector('#modal-shadow').addEventListener('click', hideModal)

function showModal() {
    document.querySelector('#modal').style.display = 'inline-block'
    document.querySelector('#modal-shadow').style.display = 'inline-block'
}

function hideModal() {
    document.querySelector('#modal').style.display = 'none'
    document.querySelector('#modal-shadow').style.display = 'none'
}

// Customizability from User
// INSTRUCTIONS VISIBILITY TOGGLE
document.querySelector('#instructionsCheck').addEventListener('click', toggleInstructions)
function toggleInstructions() {
    let instructions = document.querySelector('#instructions')
    let instructionsCheckBox = document.querySelector('#instructionsCheck')

    instructionsCheckBox.checked ? instructions.style.display = 'none' : instructions.style.display = 'inline-block'
}
toggleInstructions()

// VIDEO SEARCH VISIBILITY TOGGLE
document.querySelector('#videoSearchCheck').addEventListener('click', toggleVideoSearch)
function toggleVideoSearch() {
    let videoSearch = document.querySelector('#videoSearch')
    let videoSearchCheckBox = document.querySelector('#videoSearchCheck')

    videoSearchCheckBox.checked ? videoSearch.style.display = 'none' : videoSearch.style.display = 'block'
}
toggleVideoSearch()

// BACKGROUND COLOR CUSTOMIZE
document.querySelector('#applyColor').addEventListener('click', changeColor)

function changeColor() {
    let backgroundColorLeft = document.querySelector('#background-color-left').value
    let backgroundColorRight = document.querySelector('#background-color-right').value
    let soundEffectColorLeft = document.querySelector('#sound-effect-color-left').value
    let soundEffectColorRight = document.querySelector('#sound-effect-color-right').value

    let body = document.querySelector('body')
    let soundEffects = document.querySelectorAll('.sound-effect')

    body.style.backgroundImage = `linear-gradient(160deg, ${backgroundColorLeft} 0%, ${backgroundColorRight} 100%)`
    soundEffects.forEach(soundEffect => soundEffect.style.backgroundImage = `linear-gradient(28deg, ${soundEffectColorLeft} 0%, ${soundEffectColorRight} 100%)`)

    console.log(backgroundColorLeft, backgroundColorRight, soundEffectColorLeft, soundEffectColorRight)
}
changeColor()