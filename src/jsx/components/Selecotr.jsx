import React from 'react'

export default class Selector extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const id = this.props.id
        const divId = `${id}Div`
        return (
            <div id={divId}>
                <h2 id={id} className='text-center'>{id}</h2>
                <div id={id} className="selector d-flex mx-auto" onClick={this.props.onClickSelector}>
                    <div className="inner-0" style={this.props.zeroStyle}></div>
                    <div className="inner-1" style={this.props.oneStyle}></div>
                </div>
            </div>
        )
    }
}