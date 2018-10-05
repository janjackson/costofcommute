import React from 'react'
import Map from "./Map";
import Details from "./Details";

const Results = ({ routes, home, locations, handleDrag }) => {
    return (
        <div>
            <Map routes={routes} home={home} locations={locations} handleDrag={handleDrag} />
            <Details routes={routes} home={home} locations={locations} />
        </div>
    )
}

export default Results