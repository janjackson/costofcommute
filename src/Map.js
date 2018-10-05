import React, { Component } from 'react'
import LeafletMap from './D3Map';

export default class ChartWrapper extends Component {
    shouldComponentUpdate() {
        return false
    }

    componentDidMount() {
        this._chart = new LeafletMap(this.props.routes, this.props.home, this.props.locations, this.props.handleDrag)
    }

    componentWillReceiveProps(nextProps) {
        console.log("YUP", nextProps)
        this._chart.update(nextProps.locations, nextProps.routes)
    }

    render() {
        return <div id="map" className="chart-area" ref="chart" style={{ width: "50%", height: "100vh" }} />
    }

}
