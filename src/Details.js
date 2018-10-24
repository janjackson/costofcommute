import React, { Fragment, Component } from 'react'
// import { react-router } from 'react-router';

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: "",
            distance: ""
        }
    }

    renderTotals(routes, locations) {
        const distance = (routes.reduce((acc, cur, i) => {
            return acc + (cur.summary.distance * locations[i].number)
        }, 0) * 2 * 4.3 / 1000).toFixed(1)

        const time = (routes.reduce((acc, cur, i) => {
            return acc + (cur.summary.baseTime * locations[i].number)
        }, 0) / (60 * 60 / 2 * 4.3)).toFixed(1)

        this.setState({
            time,
            distance
        })
    }

    componentWillReceiveProps(nextProps) {
        const { routes, home, locations } = nextProps

        this.renderTotals(routes, locations)
    }

    componentDidMount() {
        const { routes, home, locations } = this.props

        this.renderTotals(routes, locations)
    }

    reloadPage(){
        console.log('reload');
        window.location.reload();
    }

    render() {
        return (
            <div align="center">
                <a className="back" href="/"><i className="fas fa-arrow-left"></i></a>
                <h2>Your cost of commute is:</h2>
                <Fragment>
                    <h3>{this.state.distance}km/month</h3>
                    <h3>{this.state.time}h/month</h3>
                </Fragment>
                <p className="alternative">Another location might save you money.</p>
            </div>
        )
    }
}
