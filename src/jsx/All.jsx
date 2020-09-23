import React from 'react'
import ReactDom from 'react-dom'
import { bankOne, bankTwo } from './base.js'

/**React */
class BtnPads extends React.Component {
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



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderValue: 50,
            powerValue: true,
            bankValue: true,
            displayValue: '',
        }
        this.onChangeSlider = this.onChangeSlider.bind(this)
        this.onClickSelector = this.onClickSelector.bind(this)
        this.onSliderMouseUp = this.onSliderMouseUp.bind(this)
        this.onDisplayValueChange = this.onDisplayValueChange.bind(this)
    }

    onClickSelector(e) {
        let sw
        // Power Switch
        if (e.target.parentElement.id === 'powerSW' || e.target.id === 'powerSW') {
            sw = {
                powerValue: !this.state.powerValue,
                displayValue: '',
            }
            // Bank Switch
        } else if (e.target.parentElement.id === 'bankSW' || e.target.id === 'bankSW') {
            if (this.state.powerValue === true) {
                sw = {
                    bankValue: !this.state.bankValue,
                    displayValue: ''
                }
            }
        }

        this.setState(sw)
    }

    onChangeSlider(e) {
        // Power closed
        if (this.state.powerValue === true) {
            this.setState({
                sliderValue: e.target.value,
                displayValue: `Volume: ${e.target.value}` // 如果{}內為this.state.sliderValue，獲得的值為上一個狀態的值
            })
        }
    }

    // When mouseUp actived in slider, reset the this.state.displayValus
    onSliderMouseUp() {
        setTimeout(() => {
            this.setState({
                displayValue: ''
            })
        }, 1400)

        clearTimeout()
    }

    onDisplayValueChange(displayValue) {
        this.setState({
            displayValue: displayValue
        })
    }   

    render() {
        // Change selector
        let powerZeroStyle,
            powerOneStyle,
            bankZeroStyle,
            bankOneStyle;
        const selectorBgc = { backgroundColor: 'blue' }
        
        if (this.state.powerValue === true) {
            powerOneStyle = selectorBgc
        } else {
            powerZeroStyle = selectorBgc
        }

        if (this.state.bankValue === true) {
            bankOneStyle = selectorBgc
        } else {
            bankZeroStyle = selectorBgc
        }

        // Create BtnPads by bankOne or bankTwo 
        const bank = this.state.bankValue === false ? bankOne : bankTwo
        
        return (
            <main id='drum-machine' className='d-flex align-items-center justify-content-around'>
                <h1 className='align-self-start'><i className='fas fa-mug-hot '></i><em>WAO</em></h1>
                
                <BtnPads
                    data={bank}
                    powerValue={this.state.powerValue}
                    displayValue={this.state.displayValue}
                    sliderValue={this.state.sliderValue}
                    onDisplayValueChange={this.onDisplayValueChange}
                />
                
                <section id='right-panel'>
                    <div className='d-flex flex-wrap align-items-center justify-content-center m-0' style={{ width: '100%', height: '100%' }}>
                        <div id="powerSWDiv">
                            <h2 id='power-title' className='text-center'>Power</h2>
                            <div id="powerSW" className="selector d-flex mx-auto" onClick={this.onClickSelector}>
                                <div className="inner-0" style={powerZeroStyle}></div>
                                <div className="inner-1" style={powerOneStyle}></div>
                            </div>
                        </div>
                        <div id="display">
                            <p>{this.state.displayValue}</p>
                        </div>
                        <div className="slidecontainer d-flex" onClick={this.onClickSelector}>
                            <input type="range" min="0" max="100" step="1" value={this.state.sliderValue} className="slider" id="myRange"
                                onChange={this.onChangeSlider} onMouseUp={this.onSliderMouseUp} />
                        </div>
                        <div id='bankSWDiv'>
                            <h2 id='bank-title' className='text-center'>Bank</h2>
                            <div id='bankSW' className="selector d-flex mx-auto" onClick={this.onClickSelector}>
                                <div className="inner-0" style={bankZeroStyle}></div>
                                <div className="inner-1" style={bankOneStyle}></div>
                            </div>
                        </div>
                    </div>

                </section>
            </main >
        )
    }
};



ReactDom.render(<App />, document.getElementById('react-root'))
