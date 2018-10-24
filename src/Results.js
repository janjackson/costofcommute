import React from "react";
import Map from "./Map";
import Details from "./Details";
import Affiliate from "./Affiliate";

const Results = ({ routes, home, locations, handleDrag }) => {
  console.log(home);
  return (
    <div className="carrier">
      <div class="left">
        <div class="pos">
        <Details routes={routes} home={home} locations={locations}/>
        </div>
      </div>
      <div class="right">
        <Map routes={routes} home={home} locations={locations} handleDrag={handleDrag}/>
      </div>
    </div>
  );
};

export default Results;
