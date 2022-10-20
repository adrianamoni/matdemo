import { grey } from "@mui/material/colors";
import React, { useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { userPreferencesContext } from "../../context/ContextProvider";

const HalfDoughnut = ({ value, color, stroked }) => {
  const { userPreferences } = useContext(userPreferencesContext);
  const { colorMode } = userPreferences;

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
          background: colorMode === "dark" ? grey[500] : grey[100],
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
            fontSize: "1.3em",
            fontWeight: 700,
            color: colorMode === "dark" ? "#eee" : "#222",
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
      type: "lineal",
    },
    labels: ["Average Results"],
    stroke: stroked
      ? {
          dashArray: 4,
        }
      : {},
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
