import React from 'react'
import Map from "./Map";
import Details from "./Details";

const Results = ({ routes, home, locations }) => {
    return (
        <div>
            <Map routes={routes} home={home} locations={locations} />
            <Details routes={routes} home={home} locations={locations} />
        </div>
    )
}

export default Results