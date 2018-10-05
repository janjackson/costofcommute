import React, { Fragment, Component } from 'react'

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: "",
            distance: ""
        }
    }

    renderTotals(routes, locations) {
        Promise.all(routes).then(routes => {
            const distance = (routes.reduce((acc, cur, i) => {
                /*             console.log(cur.summary.baseDistance * locations[i].number)
                            console.log(acc) */
                return acc + (cur.summary.distance * locations[i].number)
            }, 0) / 1000).toFixed(1)

            const time = (routes.reduce((acc, cur, i) => {
                return acc + (cur.summary.baseTime * locations[i].number)
            }, 0) / (60 * 60)).toFixed(1)

            this.setState({
                time,
                distance
            })

        }).then(data => data)
    }

    componentDidMount() {
        const { routes, home, locations } = this.props

        this.renderTotals(routes, locations)
    }

    render() {
        return (
            <div>
                <h2>Your cost of commute is:</h2>
                <Fragment>
                    <h3>{this.state.distance}km/month</h3>
                    <h3>{this.state.time}h/month</h3>
                </Fragment>
                <p>Another location might save you money.</p>
            </div>
        )
    }
}
