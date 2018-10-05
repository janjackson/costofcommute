import React, { Component } from 'react'
import Geosuggest from "react-geosuggest";

export default class Places extends Component {
  constructor() {
    super();
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

    catch(e){
      console.log("Invalid Address");
    }
  }

  addPlace(){
    var singleItem = [this.state.currentAdress, this.state.currentTimePerWeek, this.state.currentCoordinate];
    var newItems = this.state.listItems.push(singleItem)
    this.setState({
      listItems: newItems
    })
    console.log(this.state.listItems);






  }

  renderListElements() {
    console.log(this.state.listItems)
    return this.state.listItems.map((item, index) =>
      <li key={index}>{item}</li>
    )
  }

  render() {
    return (
      <div className="add-places-container">
        <input onChange={this.updateTimesPerWeek.bind(this)} defaultValue="1" min="1" className="form-control-sg" type="number"/>
        <span> time(s)/week to </span>

        <div className="input-group sg">
          <span className="input-group-addon"><i className="fas fa-map-marker-alt"></i></span>
          <Geosuggest placeholder="Address"
                      onSuggestSelect={this.onSuggestSelect.bind(this)}/>
          <button className="button-primary" onClick={this.addPlace.bind(this)}>Add</button>
        </div>

        console.log(this.state.listItems)

        <ol>{this.renderListElements()}</ol>



      </div>
    )
  }


}
