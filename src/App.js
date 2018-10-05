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
			inputsSubmitted: false
		}
	}

	// We'll do this with inputs later
	componentDidMount() {
		this.setState({
			home: {
				lat: "52.19226",
				lng: "0.15216"
			},
			locations: [
				{
					lat: "52.12226",
					lng: "0.14216",
					number: 4
				},
				{
					lat: "52.13226",
					lng: "0.18216",
					number: 15
				},
				{
					lat: "52.17226",
					lng: "0.13216",
					number: 12
				}
			],
			transport: "car", // car, pedestrian, publicTransport, bicycle
			inputsSubmitted: true
		})
	}

	getRoutes(home, locations, transport) {
		const lat0 = home.lat
		const lng0 = home.lng

		async function getRoute(location) {
			const lat1 = location.lat
			const lng1 = location.lng

			const route = await axios.get(`
			https://route.api.here.com/routing/7.2/calculateroute.json
				?app_id=${APP_ID}
				&app_code=${APP_CODE}
				&waypoint0=geo!${lat0},${lng0}
				&waypoint1=geo!${lat1},${lng1}
				&mode=fastest;${transport};traffic:disabled
				&routeAttributes=summary,shape,boundingBox
			`)

			return route.data.response.route[0]
		}

		const routes = locations.map((location) => {
			return getRoute(location)
		})

		return routes
	}

	// Update our home point when the home marker gets dragged
	handleDrag(e) {
		console.log(e)
	}

	renderContent() {
		if (this.state.inputsSubmitted) {
			const { home, locations, transport } = this.state

			const routes = this.getRoutes(home, locations, transport)
			return <Results routes={routes} home={home} locations={locations} handleDrag={this.handleDrag} />
		}
		else {
			return (
				<div className="inputContainer">
					<div className="inner-inputContainer">
						<div className="container">
							<div className="slider-content">
								<h1>Move house for lower costs of commute</h1>
								<Inputs />
							</div>
						</div>
					</div>
				</div>
			)
		}
	}

	render() {
		return (
			<div>
				{this.renderContent()}
			</div>
		);
	}
}

export default App;
