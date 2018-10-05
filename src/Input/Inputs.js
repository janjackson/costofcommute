import React, { Component } from 'react'
import Places from "./Places";
import Geosuggest from 'react-geosuggest' //npm i react-geosuggest

export default class Inputs extends Component {
	constructor() {
		super();
		this.state = {
			currentNumber: 1,
			locations: [],
			home: {},
			transport: ""
		};
	}

	changeTransport(event) {
		this.setState({
			transport: event.target.name
		})
	}

	mirrorState(locations) {
		this.setState({ locations })
	}

	updateHome(home) {
		this.setState({
			home: home.location
		})
	}

	formSubmit() {
		this.props.dataSubmitted(this.state)
	}

	render() {
		return (
			<div>
				<label htmlFor="pot-house">Address of potential real estate</label>
				<div className="input-group">
					<span className="input-group-addon"><i className="fas fa-home"></i></span>
					<Geosuggest placeholder="Address" onChange={this.updateHome.bind(this)} onSuggestSelect={this.updateHome.bind(this)}/>
				</div>

{/* 				<label htmlFor="time-in-money">How much do you value one hour of your time in money?</label>
				<div className="input-group">
					<span className="input-group-addon"><i className="fas fa-euro-sign"></i></span>
					<input id="time-in-money" type="number" min="0" className="form-control" ref="opportunityCosts" placeholder="Amount of money in Euros" /><br />
				</div>
 */}
				<label>Add places you need to go to (e.g. work place or college)</label>
				<Places mirrorState={this.mirrorState.bind(this)} />
				<div className="form-check-inline">
					<label className="transportOptionsLabel radio" htmlFor="exampleRadios1">
						<input className="form-check-input" type="radio" name="transportRadio" id="exampleRadios1" />
						<img onClick={this.changeTransport.bind(this)} className="transportImg" src="bicycle.png" name="bike" />
					</label>
				</div>
				<div className="form-check-inline">
					<label className="transportOptionsLabel radio" htmlFor="exampleRadios2">
						<input className="form-check-input" type="radio" name="transportRadio" id="exampleRadios2" />
						<img onClick={this.changeTransport.bind(this)} className="transportImg" src="car.png" name="car" />
					</label>
				</div>
				<div className="form-check-inline">
					<label className="transportOptionsLabel radio" htmlFor="exampleRadios3">
						<input className="form-check-input" type="radio" name="transportRadio" id="exampleRadios3" />
						<img onClick={this.changeTransport.bind(this)} className="transportImg" src="bus.png" name="public" />
					</label>
				</div>
				<button className="button-primary" onClick={this.formSubmit.bind(this)}>Submit</button>

			</div>
		)
	}
}
