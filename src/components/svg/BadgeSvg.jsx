import React from "react";

const BadgeSvg = ({ bgColor }) => {
  return (
    <div style={{ zIndex: 99999 }}>
      <svg viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="30" fill={bgColor || "crimson"} />
        <text
          x="28"
          y="45"
          fill="whitesmoke"
          fontWeight="bold"
          textAnchor="middle"
          fontSize="45"
          style={{ color: "white" }}
        >
          10
        </text>
      </svg>
    </div>
  );
};

export default BadgeSvg;
