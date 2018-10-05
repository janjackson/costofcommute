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

    changeTransport(event){
      console.log('hi', event.target.name);
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
        <div className="form-check-inline">
              <label className="transportOptionsLabel radio" htmlFor="exampleRadios1">
                <input className="form-check-input" type="radio" name="transportRadio" id="exampleRadios1"/>
                <img onClick={this.changeTransport.bind(this)} className="transportImg" src="bicycle.png" name="bike"/>
              </label>
          </div>
          <div className="form-check-inline">
              <label className="transportOptionsLabel radio" htmlFor="exampleRadios2">
                <input className="form-check-input" type="radio" name="transportRadio" id="exampleRadios2"/>
                <img onClick={this.changeTransport.bind(this)} className="transportImg" src="car.png" name="car"/>
              </label>
          </div>
          <div className="form-check-inline">
              <label className="transportOptionsLabel radio" htmlFor="exampleRadios3">
                <input className="form-check-input" type="radio" name="transportRadio" id="exampleRadios3"/>
                <img onClick={this.changeTransport.bind(this)} className="transportImg" src="bus.png" name="public"/>
              </label>
        </div>
      </div>
    )
  }
}
