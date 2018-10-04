import React, { Component } from 'react'
import D3Map from './D3Map'

export default class ChartWrapper extends Component {
    shouldComponentUpdate() {
        return false
    }

    componentDidMount() {
        D3Map(this.props.routes, this.props.home, this.props.locations)
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
