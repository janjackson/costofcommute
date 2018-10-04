import React, { Component } from 'react'
import Geosuggest from 'react-geosuggest' //npm i react-geosuggest

export default class Inputs extends Component {
    constructor() {
        super();
        this.state = {
            currentNumber: 1,
            locations: [{ location: '', number:0}]
        };
    }
    handleClick(){
        var homeAddress = this.refs.home.value
        var locations = this.state.locations
        var opportunityCosts = this.refs.opportunityCosts.value
        console.log('homeAddress, loc1name, loc1number ', homeAddress, locations, opportunityCosts)
    }
    addLoc(){
        this.setState({
            currentNumber:this.state.currentNumber+1,
            locations: this.state.locations.concat([{ location: '', number:0}])
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
                <span className="input-group-addon"><i className="fas fa-map-marker-alt"></i></span>
                <input id="pot-house" type="text" className="form-control" name="adress" placeholder="Adresse"/><br/>
              </div>

              <label htmlFor="time-in-money">How much do you value your time in money?</label>
              <div className="input-group">
                <span className="input-group-addon"><i className="fas fa-euro-sign"></i></span>
                <input id="time-in-money" type="text" className="form-control" name="time-in-money" placeholder="Betrag in Euro"/><br/>
              </div>

              <Geosuggest />
              { this.state.locations.map((val, index)=>{
                  return(
                      <div key={index}>
                      <input type="text" name={index} value={this.state.locations[index].location} onChange={this.handleChangeLocation}/><br/>
                      <input type="number" name={index} value={this.state.locations[index].number} onChange={this.handleChangeNumber}/><br/>
                      </div>
                  )
              })}
              <button onClick={this.addLoc.bind(this)}>+</button><br/>
              <input ref="opportunityCosts" placeholder="Opportunity cost"/><br/>
              <button onClick={this.handleClick.bind(this)}>Add</button>
            </div>
        )
    }
}
