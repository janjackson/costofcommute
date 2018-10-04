import React, { Component } from 'react';
import Inputs from './Inputs'
import Map from './Map'
import Results from './Results'
import * as axios from 'axios'

const APP_ID = "EtpnyJ0YvyoJUXBYvZwy"
const APP_CODE = "7bORO4Qpy16URJkBxelwcg"
const lat1 = "52.15247"
const lng1 = "0.14019"

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			locations: [
				{
					"lat": "52.5148335",
					"lng": "13.3946117",
				},
				{
					"lat": "52.5048335",
					"lng": "13.3546117",
				},
				{
					"lat": "52.5248335",
					"lng": "13.3746117",
				}
			]
		}
	}

	getRoutes(home, locations) {
		const lat0 = home.lat
		const lng0 = home.lng
		async function getRoute(location) {
			const lat1 = location.lat
			const lng1 = location.lng

			// car, pedestrian, publicTransport, bicycle
			const route = await axios.get(`
			https://route.api.here.com/routing/7.2/calculateroute.json
				?app_id=${APP_ID}
				&app_code=${APP_CODE}
				&waypoint0=geo!${lat0},${lng0}
				&waypoint1=geo!${lat1},${lng1}
				&mode=fastest;car;traffic:disabled
				&routeAttributes=summary,shape,boundingBox
			`)

			return route.data.response.route[0]
		}

		const routes = locations.map((location) => {
			return getRoute(location)
		})

		return routes
	}

	render() {
		const home = {
			lat: "52.19226",
			lng: "0.15216"
		}
		const locations = [
			{
				lat: "52.12226",
				lng: "0.14216"
			},
			{
				lat: "52.13226",
				lng: "0.18216"
			},
			{
				lat: "52.17226",
				lng: "0.13216"
			}
		]

		const routes = this.getRoutes(home, locations)

		return (
			<div>
				<Inputs />
				<Map routes={routes} home={home} locations={locations} />
				<Results />
			</div>
		);
	}
}

export default App;
