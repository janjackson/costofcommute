import React, { Component } from 'react';
import Inputs from './Inputs'
import Map from './Map'
import Results from './Results'

class App extends Component {
	render() {
		const hello = "Helldlksjo"
		return (
			<div>
				<Inputs />
				<Map />
				<Results />
			</div>
		);
	}
}

export default App;
