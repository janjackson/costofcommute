import React, { Component } from 'react'
import Places from "./Places";
import Geosuggest from 'react-geosuggest' //npm i react-geosuggest

export default class Inputs extends Component {
    constructor() {
        super();
        this.state = {
            currentNumber: 1,
            locations: [{ location: '', number: 0 }]
        };
    }

  render() {
    return (
      <div>
        <label htmlFor="pot-house">Adress of potential real estate</label>
        <div className="input-group">
          <span className="input-group-addon"><i className="fas fa-home"></i></span>
          <Geosuggest placeholder="Address"/>
        </div>

        <label htmlFor="time-in-money">How much do you value one hour of your time in money?</label>
        <div className="input-group">
          <span className="input-group-addon"><i className="fas fa-euro-sign"></i></span>
          <input id="time-in-money" type="number" min="0" className="form-control" ref="opportunityCosts" placeholder="Amount of money in Euros"/><br/>
        </div>

        <label>Add places you need to go to (e.g. work place or college)</label>
        <Places/>

      </div>
    )
  }
}
