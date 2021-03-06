import React, { Component } from "react";
import Inputs from "./Input/Inputs";
import Map from "./Map";
import Results from "./Results";
import * as axios from 'axios'

const APP_ID = "EtpnyJ0YvyoJUXBYvZwy"
const APP_CODE = "7bORO4Qpy16URJkBxelwcg"

class App extends Component {
	constructor(props) {
		super(props);
 		this.state = {
			home: {},
			locations: [],
			transport: "",
			routes: [],
			inputsSubmitted: false
		}
		//this.state = { "home": { "lat": 52.4910407, "lng": 13.3963483 }, "locations": [{ "address": "10178 Berlin, Germany", "number": "5", "lat": 52.5219184, "lng": 13.413214700000026 }, { "address": "Rheinsberger Str. 76/77, 10115 Berlin, Germany", "number": "8", "lat": 52.53684, "lng": 13.394929999999931 }, { "address": "Hermannpl., Berlin, Germany", "number": "5", "lat": 52.4870183, "lng": 13.42498409999996 }], "transport": "car", "routes": [], "inputsSubmitted": true }
	}

	// We'll do this with inputs later
	componentDidMount() {
		const { home, locations, transport } = this.state
		this.getRoutes(home, locations, transport)
	}

	async getRoutes(home, locations, transport) {
		const lat0 = home.lat
		const lng0 = home.lng

		function getRoute(location) {
			const lat1 = location.lat
			const lng1 = location.lng

			const route = axios.get(`
			https://route.api.here.com/routing/7.2/calculateroute.json
				?app_id=${APP_ID}
				&app_code=${APP_CODE}
				&waypoint0=geo!${lat0},${lng0}
				&waypoint1=geo!${lat1},${lng1}
				&mode=fastest;${transport};traffic:disabled
				&routeAttributes=summary,shape,boundingBox
			`)

			return route //.data.response.route[0]
		}

		const promiseArray = locations.map((location) => {
			return getRoute(location)
		})

		try {
			const routes = (
				await Promise.all(promiseArray)
			).map(res => res.data.response.route[0])

			console.log(routes)

			this.setState({
				routes
			})
		}
		catch (error) {
			console.log(error)
		}

	}

	// Update our home point when the home marker gets dragged
	handleDrag(newHome) {
		this.setState({
			home: {
				lat: newHome.lat,
				lng: newHome.lng
			}
		}, () => {
			console.log("Updating")
			this.getRoutes(this.state.home, this.state.locations, this.state.transport)
		})
	}

	dataSubmitted({ home, locations, transport }) {
		this.setState({
			home,
			locations,
			transport,
			inputsSubmitted: true
		}, () => {
			console.log(this.state)
			const { home, locations, transport } = this.state
			this.getRoutes(home, locations, transport)
		})
	}

  renderContent() {
    if (this.state.inputsSubmitted) {
      const { home, locations, transport, routes } = this.state;

      //const routes = this.getRoutes(home, locations, transport)

      if (routes.length === 0) {
        return (
          <div className="inputContainer">
            <div className="inner-inputContainer">
              <div className="container">
                <h1>Something went wrong...</h1>
              </div>
            </div>
          </div>
        );
      }

      return(
        <div className="inputContainer">
          <div className="inner-inputContainer no-padding" >
              <Results routes={routes} home={home} locations={locations} handleDrag={this.handleDrag.bind(this)}/>;
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="inputContainer">
          <div className="inner-inputContainer">
            <div className="container">
              <h1>QuickR</h1>
              <h2>Find a place that saves you valuable life time</h2>
              <div className="slider-content">
                <Inputs dataSubmitted={this.dataSubmitted.bind(this)}/>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }


	render() {
		console.log(this.state)
		return (
			<div>
				{this.renderContent()}
			</div>
		);
	}
}

export default App;
