import React, { Component } from 'react'
import Geosuggest from "react-geosuggest";

export default class Places extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentTimePerWeek: 1,
			currentAdress: "",
			currentCoordinate: "",
			listItems: []
		};
	}

	updateTimesPerWeek = (e) => {
		this.setState({
			currentTimePerWeek: e.target.value,
		})
	}

	onSuggestSelect(suggest) {
		try {
			this.setState({
				currentCoordinate: suggest.location,
				currentAdress: suggest.gmaps.formatted_address
			})
		}

		catch (e) {
			console.log("Invalid Address");
		}
	}

	addPlace() {
		var singleItem = {
			address: this.state.currentAdress,
			number: this.state.currentTimePerWeek,
			location: this.state.currentCoordinate
		};
		var newItems = this.state.listItems.concat([singleItem])

		this.setState({
			listItems: newItems
		})

	}


	render() {
		const listElements = this.state.listItems.map((item, index) => {
			return <li key={index}>{item.address}</li>
		})

		return (
			<div className="add-places-container">
				<input onChange={this.updateTimesPerWeek.bind(this)} defaultValue="1" min="1" className="form-control-sg" type="number" />
				<span> time(s)/week to </span>

				<ol>{listElements}</ol>
			</div>
		)
	}


}
