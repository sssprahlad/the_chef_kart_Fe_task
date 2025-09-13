import React from "react";
import {Link} from "react-router-dom"
import "./Summary.css"


const Summary = ({selectedDishesList}) => {

  return (
    <div className="summary-container" >
        <div className="summary-sub-container">
            <h4 className="total-dish-selected">Total Dish Selected {selectedDishesList.length}</h4>
      </div>
      <Link style={{textDecoration:"none",color:"white",cursor:"pointer"}} to="/summary"> <button className="continue-btn">Continue</button></Link>
    </div>
  );
}

export default Summary
