import React from "react";
import Map from "./Map";
import Details from "./Details";
import Affiliate from "./Affiliate";

const Results = ({ routes, home, locations, handleDrag }) => {
  console.log(home);
  return (
    <div>
      <Details routes={routes} home={home} locations={locations}/>
      <Affiliate/>
      <Map routes={routes} home={home} locations={locations} handleDrag={handleDrag}/>
    </div>
  );
};

export default Results;
