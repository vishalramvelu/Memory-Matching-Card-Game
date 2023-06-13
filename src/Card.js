/* simplified functionality for checking if matched or not code */

import React from "react";
import "./Card.css";

const Card = ({ id, number, flipped, matched, onClick }) => {
    const handleClick = () => {
      if (!flipped && !matched) {
        onClick(id);
      }
    };
  
    return (
      <div className={`card ${flipped ? "flipped" : ""} ${matched ? "matched" : ""}`} onClick={handleClick}>
        <div className="card-inner">
          <div className="card-front"></div>
          <div className="card-back">{number}</div>
        </div>
      </div>
    );
  };

export default Card;
