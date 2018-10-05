import React, { Component } from 'react'
import LeafletMap from './D3Map';

export default class ChartWrapper extends Component {
    shouldComponentUpdate() {
        return false
    }

    componentDidMount() {
        new LeafletMap(this.props.routes, this.props.home, this.props.locations, this.props.handleDrag)
    }

    /* 
    componentShouldReceiveProps(nextProps) {
        // this._chart.update()
    }
    */

    render() {
        return <div id="map" className="chart-area" ref="chart" style={{ width: "50%", height: "100vh" }} />
    }

}
