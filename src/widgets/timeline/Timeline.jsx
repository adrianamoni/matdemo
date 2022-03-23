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
            }).background,
          },
        ],
      })
    );

    setSeries(arr);
  };

  return (
    <div id="timeline-chart-container">
      {series && series.length > 0 && (
        <Chart
          options={options}
          series={series}
          type="rangeBar"
          /*   width="100%" */
          height="140px"
        />
      )}
    </div>
  );
};

export default Timeline;
