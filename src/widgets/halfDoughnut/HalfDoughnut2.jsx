import { grey } from "@mui/material/colors";
import React, { useContext, useEffect } from "react";
import Charts from "react-apexcharts";
import { userPreferencesContext } from "../../context/ContextProvider";

const HalfDoughnut2 = ({ value, color }) => {
  const { userPreferences } = useContext(userPreferencesContext);
  const { colorMode } = userPreferences;

  /**
   * @param {{value:Array}}
   */

  const series = value;
  const options = {
    chart: {
      id: "realtime",
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
            fontSize: "1.3em",
            fontWeight: 700,
            color: colorMode === "dark" ? "#eee" : "#222",
            formatter: function (val) {
              return value + "%";
            },
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
      <Chart newSeries={series > 100 ? [100] : [series]} newOptions={options} />
    </div>
  );
};

function Chart({ newSeries, newOptions }) {
  useEffect(() => {
    // or useEffect
    ApexCharts.exec(`realtime`, "updateSeries", newSeries);
    ApexCharts.exec(`realtime`, "updateOptions", newOptions, false, true, true);
  }, [newSeries, newOptions]);

  return (
    <Charts
      options={newOptions}
      series={newSeries}
      type="radialBar"
      /*  height="350" */
    />
  );
}

export default HalfDoughnut2;
