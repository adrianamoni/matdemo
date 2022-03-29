import React, { useContext } from "react";
import Chart from "react-apexcharts";
import { getColorFromBackend } from "../../components/fritDashboardComps/orderDetail/helper";
import { userPreferencesContext } from "../../context/ContextProvider";

const Timeline = ({ data }) => {
  console.log("RENDERED TIMELINE");
  const { userPreferences } = useContext(userPreferencesContext);
  const { colorMode } = userPreferences;

  const options = {
    chart: {
      type: "rangeBar",
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        horizontal: true,
        rangeBarGroupRows: true,
      },
    },

    colors: [
      function ({ seriesIndex, w }) {
        return w.config.series[seriesIndex].data[0].fillColor;
      },
    ],

    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [50, 0, 100, 100],
      },
    },
    dataLabels: {
      style: {
        colors: ["#bf9693", "#000", "#000"],
      },
    },
    tooltip: {
      enabled: true,
      followCursor: false,
      theme: colorMode,
      x: {
        show: true,
        format: "HH:mm dd/MM",
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },

    yaxis: {
      show: false,
    },
    legend: {
      show: false,
    },
  };

  if (data) {
    const arr = data.map((item, i, arr) => {
      const { reas_desc, EventStart, EventEnd, color } = item;
      if (i + 1 === arr.length) {
        return {
          name: reas_desc,
          data: [
            {
              x: "Turno",
              y: [new Date(EventStart).getTime(), new Date().getTime()],
              fillColor: getColorFromBackend({
                decFormatColor: color,
              }).background,
            },
          ],
        };
      } else {
        return {
          name: reas_desc,
          data: [
            {
              x: "Turno",
              y: [new Date(EventStart).getTime(), new Date(EventEnd).getTime()],
              fillColor: getColorFromBackend({
                decFormatColor: color,
              }).background,
            },
          ],
        };
      }
    });

    return (
      <div id="timeline-chart-container">
        <Chart options={options} series={arr} type="rangeBar" height="140px" />
      </div>
    );
  } else {
    return null;
  }
};

export default Timeline;
