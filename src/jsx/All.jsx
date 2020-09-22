import React from 'react'
import ReactDom from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { bankOne, bankTwo } from './base.js'


/**Redux */
// function getActionId() {
//     let randomNum = Math.floor(Math.random() * Math.floor(quotes.length))
//     return {
//         type: String(randomNum)
//     }
// }

// const authorReducer = (state = '', action) => {
//     switch (action.type) {
//         case '0':
//             return quotes[0].author
//         case '1':
//             return quotes[1].author
//         case '2':
//             return quotes[2].author
//         case '3':
//             return quotes[3].author
//         case '4':
//             return quotes[4].author
//         case '5':
//             return quotes[5].author
//         default:
//             return state
//     }
// }
// const textReducer = (state = '', action) => {
//     switch (action.type) {
//         case '0':
//             return quotes[0].text
//         case '1':
//             return quotes[1].text
//         case '2':
//             return quotes[2].text
//         case '3':
//             return quotes[3].text
//         case '4':
//             return quotes[4].text
//         case '5':
//             return quotes[5].text
//         default:
//             return quotes[0].text
//     }
// }

// const reducer = combineReducers({
//     authors: authorReducer,
//     texts: textReducer,
// })

// const store = createStore(reducer)



/**React */
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderValue: '',
            powerValue: '',
            bankValue: '',
            displayValue: '',
        }
        this.newQuote = this.newQuote.bind(this)
        this.getInitialState = this.getInitialState.bind(this)
        this.onChangeSlider = this.onChangeSlider.bind(this)
        this.onClickSelector = this.onClickSelector.bind(this)
        this.onSliderMouseUp = this.onSliderMouseUp.bind(this)
        this.soundPlay = this.soundPlay.bind(this)
    }

    newQuote() {
        store.dispatch(getActionId())
    }

    onClickSelector(e) {
        let sw
        if (e.target.parentElement.id === 'powerSW' || e.target.id === 'powerSW') {
            sw = {
                powerValue: !this.state.powerValue,
                displayValue: '',
            }
        } else if (e.target.parentElement.id === 'bankSW' || e.target.id === 'bankSW') {
            sw = {
                bankValue: !this.state.bankValue,
            }
        }

        this.setState(sw)
    }


    onChangeSlider(e) {
        this.setState({
            sliderValue: e.target.value,
            displayValue: `Volume: ${e.target.value}` // 如果{}內為this.state.sliderValue，獲得的值為上一個狀態的值
        })
    }

    onSliderMouseUp() {
        setTimeout(() => {
            this.setState({
                displayValue :''
            })
        }, 1400)
        
        clearTimeout()
    }

    soundPlay(e) {
        const audio = e.target.children[0]
        audio.volume = this.state.sliderValue / 100;
        audio.play()
        
        
        this.setState({
            displayValue: e.target.id
        })
    }


    getInitialState() {
        this.setState({
            sliderValue: '50',
            powerValue: true,
            bankValue: true,
        })
    }

    componentDidMount() {
        this.getInitialState()
    }




    render() {

        let powerZeroStyle,
            powerOneStyle,
            bankZeroStyle,
            bankOneStyle;
        
        const pads = bankOne.map((el, index) => {
            return (
                <button id={el.id} className="drum-pad" onMouseUp={this.soundPlay}>
                    {el.keyTrigger}
                    <audio id={el.keyTrigger} className='clip' src={el.url}>q</audio>
                </button>
            )
        }) 

        if (this.state.powerValue === true) {
            powerOneStyle = { backgroundColor: 'blue' }
        } else {
            powerZeroStyle = { backgroundColor: 'blue' }
        }

        if (this.state.bankValue === true) {
            bankOneStyle = { backgroundColor: 'blue' }
        } else {
            bankZeroStyle = { backgroundColor: 'blue' }
        }

        return (
            <main id='drum-machine' className='d-flex align-items-center justify-content-around'>
                <h1 className='align-self-start'><i className='fas fa-mug-hot '></i><em>WAO</em></h1>
                <section id='pads' className='d-flex flex-wrap align-items-center justify-content-around'>
                    {/* <button id='Q' className="drum-pad" onClick={this.soundPlay} onMouseUp={this.soundPlay}>Q</button>
                    <button id='E' className="drum-pad">E</button>
                    <button id='W' className="drum-pad">W</button>
                    <button id='A' className="drum-pad">A</button>
                    <button id='S' className="drum-pad">S</button>
                    <button id='D' className="drum-pad">D</button>
                    <button id='Z' className="drum-pad">Z</button>
                    <button id='X' className="drum-pad">X</button>
                    <button id='C' className="drum-pad">C</button> */}
                    {pads}
                </section>
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


/**React-Redux */
// const mapStateToProps = (state) => {
//     return {
//         author: state.authors,
//         text: state.texts,
//     }
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getNewQuote: () => {
//             dispatch(getActionId())
//         }
//     }
// };




// const Container = connect(mapStateToProps, mapDispatchToProps)(Text)

// class AppWrapper extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return (
//             <Provider store={store}>
//                 <Container />
//             </Provider>
//         );
//     }
// };


ReactDom.render(<App />, document.getElementById('react-root'))
