import React, { Component } from 'react'
import Geosuggest from 'react-geosuggest' //npm i react-geosuggest

export default class Inputs extends Component {
    constructor() {
        super();
        this.state = {
            currentNumber: 1,
            locations: [{ location: 'ia', number:0}]
        };
    }
    handleClick(){
        var title = this.refs.home.value
        var locations = this.state.locations
        var opportunityCosts = this.refs.opportunityCosts.value
        console.log('title, loc1name, loc1number ', title, locations, opportunityCosts)
    }
    addLoc(){
        this.setState({
            currentNumber:this.state.currentNumber+1,
            locations: this.state.locations.concat([{ location: '', number:0}])
        });
    }
    handleChangeName(){
      console.log('hi');
    }
    render() {
        return (
            <div>
              <input ref="home" placeholder="Home"/><br/>
              <Geosuggest />
              { this.state.locations.map((val, index)=>{
                  return(
                      <div>
                      <input ref="{index + 'name'}" onChange={this.handleChangeName(index)} value={ val.name }/><br/>
                      <input ref={index + "number"} placeholder={val.number}/><br/>
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
