import React from "react";
import BarChart from "./bar/Bar";
import HalfDoughnut from "./halfDoughnut/HalfDoughnut";
import Timeline from "./timeline/Timeline";

const FullChart = ({ data }) => {
  switch (data.type) {
    case "halfDoughnut":
      return <HalfDoughnut data={data} />;
      break;
    case "timeline":
      return <Timeline data={data} />;
      break;
    case "bar":
      return <BarChart data={data} />;
      break;
    default:
      break;
  }
};

export default FullChart;
