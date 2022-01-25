import React from "react";
import ReactApexChart from "react-apexcharts";
const colors = ["#FEB019", "#00E396", "#D7263D"];
const Timeline = () => {
  const series = [
    {
      name: "Whatever",
      data: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
      ].map((item, i) => ({
        x: "Code",
        y: [
          new Date(`2019-03-${i + 1}`).getTime(),
          new Date(`2019-03-${i + 2}`).getTime(),
        ],
        fillColor: colors[(Math.random() * colors.length) | 0],
      })),
    },
  ];
  const options = {
    fill: {
      colors: ["#F44336", "#E91E63", "#9C27B0"],
    },
    chart: {
      type: "rangeBar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
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

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="rangeBar"
        height={150}
      />
    </div>
  );
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
