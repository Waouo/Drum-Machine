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
        }
        this.newQuote = this.newQuote.bind(this)
    }

    newQuote() {
        store.dispatch(getActionId())
    }

    render() {
        return (
            <main id='drum-machine' className='d-flex'>
                <h1><i className='fas fa-mug-hot'></i><em>WAO</em></h1>
                <section id='pads' className='d-flex flex-wrap align-items-center justify-content-around'>
                    <div className="drum-pad">Q</div>
                    <div className="drum-pad">E</div>
                    <div className="drum-pad">W</div>
                    <div className="drum-pad">A</div>
                    <div className="drum-pad">S</div>
                    <div className="drum-pad">D</div>
                    <div className="drum-pad">Z</div>
                    <div className="drum-pad">X</div>
                    <div className="drum-pad">C</div>
                </section>
                <section id='right-panel' className=''>
                    <div className='row aling-items-center' style={{width: '100%', height: '100%'}}>
                        <div id="powerSW">
                            <h2 id='power-title' className='col-12'>Power</h2>
                            <div className="selector col-12">
                                <div className="inner"></div>
                                <div className="inner"></div>
                            </div>
                        </div>
                        <div id="display"></div>
                        <div></div>
                        <div id='bankSW'>
                            <h2 id='bank-title'>Bank</h2>
                            <div className="selector">
                                <div className="inner"></div>
                                <div className="inner"></div>
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
