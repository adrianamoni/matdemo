import React from "react";

const SpeedDoughnutSvg = ({ value, color, size }) => {
  let color1, color2;

  if (color === "green") {
    color1 = "#63EC9B";
    color2 = "#1FCF68";
  } else if (color === "orange") {
    color1 = "#FBBD08";
    color2 = "#F4AD0E";
  } else if (color === "blue") {
    color1 = "#62B4EA";
    color2 = "#1E88CE";
  } else if (color === "red") {
    color1 = "#EA6262";
    color2 = "#B72F2F";
  }
  if (value === 0 || value === null) {
    color1 = "rgb(220,220,220)";
    color2 = "rgb(240,240,240)";
  }

  value = Math.round(value * 100);
  const value1 = 180 + value * 1.8;
  const value2 = 360 - value1;
  const width = "100%";
  const height = "100%";
  const RADIUS = 180 / Math.PI;
  const radians = (value / 100) * Math.PI;
  const xFinal = Math.cos(radians) * -1 * (RADIUS + 24.8);
  const yFinal = Math.sin(radians) * (RADIUS + 24.8);

  return (
    <div
      style={{
        width: size,
        margin: "auto",
      }}
    >
      <svg viewBox="0 0 200 85" width={width} height={height}>
        <circle
          className="donut-segment"
          cx="100"
          cy="85"
          r={RADIUS}
          fill="transparent"
          stroke="rgb(220,220,220)"
          strokeWidth="50"
        ></circle>
        <circle
          className="donut-segment"
          cx="100"
          cy="85"
          r={RADIUS}
          fill="transparent"
          stroke="rgb(240,240,240)"
          strokeWidth="45"
        ></circle>
        <line
          x1={114}
          y1={85}
          x2={182}
          y2={85}
          stroke={"rgb(220,220,220)"}
          strokeWidth={4}
        />
        {
          <circle
            className="donut-segment"
            cx="100"
            cy="85"
            r={RADIUS}
            fill="transparent"
            stroke={color2}
            strokeWidth="50"
            strokeDasharray={`${value1} ${value2}`}
            strokeDashoffset="0"
          ></circle>
        }
        <circle
          className="donut-segment"
          cx="100"
          cy="85"
          r={RADIUS}
          fill="transparent"
          stroke={color1}
          strokeWidth="45"
          strokeDasharray={`${value1} ${value2}`}
          strokeDashoffset="0"
        ></circle>
        <line
          x1={67}
          y1={85}
          x2={18}
          y2={85}
          stroke={value === 0 ? "rgb(220,220,220)" : color2}
          strokeWidth={4}
        />

        <line
          x1={100}
          y1={85}
          x2={100 + xFinal}
          y2={85 - yFinal}
          stroke={value === 0 ? "rgb(220,220,220)" : color2}
          strokeWidth={3}
        />

        <circle
          className="donut-segment"
          cx="100"
          cy="85"
          r={31.8}
          fill="rgb(250,250,250)"
          stroke={"white"}
        ></circle>
        <line
          x1={67.5}
          y1={85}
          x2={132.5}
          y2={85}
          stroke={"rgb(250,250,250)"}
          strokeWidth={3}
        />
        {/*         <circle
          className="donut-segment"
          cx="100"
          cy="100"
          r={32.3}
          fill="white"
        ></circle> */}
        <text
          x="100"
          y="85"
          fill="black"
          fontSize="16"
          fontWeight="bold"
          textAnchor="middle"
        >
          {`${value} u/min`}
        </text>
      </svg>
    </div>
  );
};
SpeedDoughnutSvg.defaultProps = {
  value: 0,
  color: "orange",
  size: 100,
};
export default SpeedDoughnutSvg;
