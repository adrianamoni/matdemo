import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getColorFromBackend } from "../../components/fritdashboardComps/orderDetail/helper";

const Timeline = ({ data }) => {
  const [series, setSeries] = useState(undefined);
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

  useEffect(() => {
    data && getSeries();
    //eslint-disable-next-line
  }, [data]);
  const getSeries = () => {
    let arr = data.map(
      ({
        custom_reas_desc,
        custom_start_time,
        custom_end_time,
        custom_color,
        custom_esMicroparo,
        custom_colorMicroparo,
      }) => ({
        name: custom_reas_desc,
        data: [
          {
            x: "Turno",
            y: [
              new Date(custom_start_time).getTime(),
              new Date(custom_end_time).getTime(),
            ],
            fillColor: getColorFromBackend({
              microparo: custom_esMicroparo, //REVIEW PUEDE SER MICROPARO?
              decFormatColor: custom_esMicroparo
                ? custom_colorMicroparo
                : custom_color,
            }).background /* 
              custom_util_state_desc === "Paros no programados"
                ? "#DC143C"
                : custom_util_state_desc === "Tiempo productivo"
                ? "#63EC9B"
                : custom_util_state_desc === "Paros programados"
                ? "#f5cb70"
                : "#d6d6d6", */,
          },
        ],
      })
    );

    setSeries(arr);
  };

  return (
    <div
      id="timeline-chart-container"
      style={{ padding: 0, margin: 0, marginLeft: "-20px", marginTop: "-15px" }}
    >
      {series && series.length > 0 && (
        <Chart
          options={options}
          series={series}
          type="rangeBar"
          width="100%"
          height="130px"
        />
      )}
    </div>
  );
};
Timeline.defaultProps = {
  type: "of",
};

export default Timeline;

/*   "#008FFB",
  "#00E396",
  "#FEB019",
  "#FF4560",
  "#775DD0",
  "#3F51B5",
  "#546E7A",
  "#D4526E",
  "#8D5B4C",
  "#F86624",
  "#D7263D",
  "#1B998B",
  "#2E294E",
  "#F46036",
  "#E2C044", */
