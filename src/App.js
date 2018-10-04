import React, { Component } from "react";
import Inputs from "./Input/Inputs";
import Map from "./Map";
import Results from "./Results";
import * as axios from 'axios'

const APP_ID = "EtpnyJ0YvyoJUXBYvZwy"
const APP_CODE = "7bORO4Qpy16URJkBxelwcg"

class App extends Component {
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
		]

		const routes = this.getRoutes(home, locations)
    return (
      <div>
        <div className="inputContainer">
          <div className="inner-inputContainer">
            <div className="container">
              <div className="slider-content">
                <h1>Move house for lower costs of commute</h1>
                <Inputs/>
              </div>
            </div>
          </div>
        </div>
        <Results routes={routes} home={home} locations={locations} />
      </div>
    );
  }
}

export default App;
