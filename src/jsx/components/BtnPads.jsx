import React from 'react'

export default class BtnPads extends React.Component {
    constructor(props) {
        super(props);
        this.mouseUp = this.mouseUp.bind(this)
    }

    // Button was clicked by mouse
    mouseUp(e) {
        if (this.props.powerValue === true) {
            const btn = e.target
            const audio = e.target.children[0]

            this.buttonStyleAndState(btn)
            this.soundPlay(audio)
        }
    }

    // Button was pressed by key
    keyDown() {
        document.querySelector('body').addEventListener('keydown', e => {
            if (this.props.powerValue === true) {
                let audio
                let matched = (e.key).match(/^[qweasdzxc]$/i)
                if (matched) {
                    audio = document.getElementById(matched[0].toUpperCase())

                    this.buttonStyleAndState(audio.parentElement)

                    this.soundPlay(audio)
                }
            }
        })
    }

    soundPlay(audio) {
        audio.currentTime = 0 // Reset audio
        audio.volume = this.props.sliderValue / 100;
        audio.play()
    }

    buttonStyleAndState(button) {
        button.classList.add('pressed')

        this.props.onDisplayValueChange(button.id)

        setTimeout(() => {
            button.classList.remove('pressed')
        }, 100)

        clearTimeout()
    }

    componentDidMount() {
        this.keyDown()
    }

    render() {
        const btn = this.props.data.map(el => {
            return (
                <button key={el.id} id={el.id} className="drum-pad" onMouseUp={this.mouseUp}>
                    {el.keyTrigger}
                    <audio key={el.keyTrigger} id={el.keyTrigger} className='clip' src={el.url}>q</audio>
                </button>
            )
        })

        return (
            <section id='pads' className='d-flex flex-wrap align-items-center justify-content-around'>
                {btn}
            </section>
        )
    }
}