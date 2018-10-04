import React from 'react'

function totalCost(routes) {
    return 257
}

function totalTime(routes) {
    return 15.8
}

export default ({ routes, home, locations }) => {
    console.log(routes)
    return (
        <div>
            <h2>Your cost of commute is:</h2>
            <h3>${totalCost(routes)}/month</h3>
            <h3>{totalTime(routes)}h/month</h3>
            <p>Another location might save you money.</p>
        </div>
    )
}