class SoundEffect {
    constructor(title, url) {
        this.title = title
        this.url = url
    }

    makeSound() {
        // Sound Effect Container
        const div = document.createElement('div')
        div.classList.add('sound-effect')

        // Close button
        const button = document.createElement('button')
        button.innerHTML = '&#215;' // × 

        // Name of Sound Effect entered by User
        const h2 = document.createElement('h2')
        h2.innerText = this.title

        div.appendChild(button)
        div.appendChild(h2)

        // Play Method
        h2.addEventListener('click', () => {
            this.play(div)
        })

        // Delete Method
        button.addEventListener('click', () => {
            this.delete(div)
        })

        document.querySelector('#sound-effects-container').appendChild(div)
    }

    play(div) {
        const iframe = document.createElement('iframe')
        iframe.src = this.url
        iframe.allow = 'autoplay'
        // console.log(iframe)

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