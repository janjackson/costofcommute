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
        var title = this.refs.home.value
        var locations = this.refs.locations
        var opportunityCosts = this.refs.opportunityCosts.value
        console.log('title, loc1name, loc1number ', title, locations, opportunityCosts)
    }
    addLoc(){
        this.setState({
            currentNumber:this.state.currentNumber+1,
            locations: this.state.locations.concat([{ location: '', number:0}])
        });
    }
    handleChangeInput(index, type){
      console.log('hi', this);
      var state = this.state;
      state.locations[index][type] = this
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
                      <input name="location" type="text" value={this.state.locations[index].location} onChange={() => this.handleChangeInput(index, "location", this)}/><br/>
                      <input name="number" type="number" value={this.state.locations[index].number} onChange={() => this.handleChangeInput(index, "number", this)}/><br/>
                      </div>
                  )
              })}

              <button onClick={this.addLoc.bind(this)}>+</button>
              <input ref="opportunityCosts" placeholder="Opportunity cost"/><br/>
              <button onClick={this.handleClick.bind(this)}>Add</button>
            </div>
        )
    }
}
