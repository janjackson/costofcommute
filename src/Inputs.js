import React, { Component } from 'react'
import Geosuggest from 'react-geosuggest' //npm i react-geosuggest

export default class Inputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentNumber: 1,
            locations: [{ location: '', number: 0 }]
        };
    }
    handleClick() {
        var homeAddress = this.refs.home.value
        var locations = this.state.locations
        var opportunityCosts = this.refs.opportunityCosts.value
        console.log('homeAddress, loc1name, loc1number ', homeAddress, locations, opportunityCosts)
    }
    addLoc() {
        this.setState({
            currentNumber: this.state.currentNumber + 1,
            locations: this.state.locations.concat([{ location: '', number: 0 }])
        });
    }
    handleChangeLocation = (event) => {
        var index = event.target.getAttribute('name')
        var state = this.state
        console.log('state ', state, index);
        state.locations[index].location = event.target.value
        this.setState(state)
    }
    handleChangeNumber = (event) => {
        var index = event.target.getAttribute('name')
        var state = this.state
        state.locations[index].number = event.target.value
        this.setState(state)
    }

    render() {
        return (
            <div>
                <label htmlFor="pot-house">Adress of potential real estate</label>
                <div className="input-group">
                    <span className="input-group-addon"><i className="fas fa-home"></i></span>
                    <Geosuggest placeholder="Address" />
                    {/*<!--id="pot-house" type="text" className="form-control" ref="home" placeholder="Adress"-->*/}
                </div>

                <label htmlFor="time-in-money">How much do you value your time in money?</label>
                <div className="input-group">
                    <span className="input-group-addon"><i className="fas fa-euro-sign"></i></span>
                    <input id="time-in-money" type="text" className="form-control" ref="opportunityCosts" placeholder="Amount of money in Euro" /><br />
                </div>

                <label>Most visited places in one week (e.g. work place or college)</label>
                {this.state.locations.map((val, index) => {
                    return (
                        <div key={index}>
                            <input type="text" name={index} value={this.state.locations[index].location} onChange={this.handleChangeLocation} /><br />
                            <input type="number" name={index} value={this.state.locations[index].number} onChange={this.handleChangeNumber} /><br />
                        </div>
                    )
                })}
                <button onClick={this.addLoc.bind(this)}>+</button><br />
                <button onClick={this.handleClick.bind(this)}>Add</button>
            </div>
        )
    }
}
