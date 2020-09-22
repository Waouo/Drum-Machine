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
            id: '',
            sliderValue:'',
        }
        this.newQuote = this.newQuote.bind(this)
        this.getInitialSlider = this.getInitialSlider.bind(this)
        this.onChangeSlider = this.onChangeSlider.bind(this)
    }

    newQuote() {
        store.dispatch(getActionId())
    }

    onChangeSlider(e) {
        this.setState({
            sliderValue: e.target.value
        })
    }

    getInitialSlider() {
        this.setState({sliderValue: '50'})
    }

    componentDidMount() {
        this.getInitialSlider()
    }


    render() {
        return (
            <main id='drum-machine' className='d-flex justify-content-around'>
                <h1><i className='fas fa-mug-hot'></i><em>WAO</em></h1>
                <section id='pads' className='d-flex flex-wrap align-items-center justify-content-around'>
                    <button className="drum-pad">Q</button>
                    <button className="drum-pad">E</button>
                    <button className="drum-pad">W</button>
                    <button className="drum-pad">A</button>
                    <button className="drum-pad">S</button>
                    <button className="drum-pad">D</button>
                    <button className="drum-pad">Z</button>
                    <button className="drum-pad">X</button>
                    <button className="drum-pad">C</button>
                </section>
                <section id='right-panel' className=''>
                    <div className='d-flex flex-wrap align-items-center justify-content-center m-0' style={{width: '100%', height: '100%'}}>
                        <div id="powerSW" className=''>
                            <h2 id='power-title' className='text-center'>Power</h2>
                            <div className="selector mx-auto">
                                <div className="inner-0"></div>
                                <div className="inner-1"></div>
                            </div>
                        </div>
                        <div id="display"></div>
                        <div className="slidecontainer d-flex justify-content-center ">
                            <input type="range" min="1" max="100" value={this.state.sliderValue} className="slider" id="myRange"
                                onChange={this.onChangeSlider}/>
                        </div>
                        <div id='bankSW'>
                            <h2 id='bank-title' className='text-center'>Bank</h2>
                            <div className="selector mx-auto">
                                <div className="inner-0"></div>
                                <div className="inner-1"></div>
                            </div>
                        </div>
                    </div>
                    
                </section>
            </main>
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
