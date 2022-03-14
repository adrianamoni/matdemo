import { grey } from "@mui/material/colors";
import React from "react";
import ReactApexChart from "react-apexcharts";

const HalfDoughnut = ({ value, color }) => {
  /**
   * @param {{value:Array}}
   */

  const series = value;
  const options = {
    chart: {
      type: "radialBar",
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: grey[100],
          strokeWidth: "100%",
          margin: -5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: "1.1em",
            fontWeight: 700,
          },
        },
      },
    },
    grid: {
      padding: {
        top: -10,
      },
    },
    fill: {
      /* colors: color || "grey"  */ /* "#fbac00" */
      type: "lineal" /*  "gradient" */,
      /* gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      }, */
    },
    labels: ["Average Results"],
  };
  return (
    <div
      id="chart"
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <ReactApexChart options={options} series={series} type="radialBar" />
    </div>
  );
};

export default HalfDoughnut;
