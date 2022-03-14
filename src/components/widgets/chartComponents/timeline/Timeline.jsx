import React from "react";
import { HorizontalBar } from "react-chartjs-2";
const Timeline = ({ data }) => {
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const datasets = data.data.map((data) => {
    return {
      label: data.label,
      data: [data.value],
      backgroundColor: data.backgroundColor,
      hoverBackgroundColor: data.hoverBackgroundColor,
      hoverBorderWidth: 2,
      hoverBorderColor: "lightgrey",
    };
  });

  return (
    <HorizontalBar
      data={{
        labels: data.label,
        datasets: datasets,
      }}
      options={{
        title: {
          display: false,
          text: "80%",
        },
        tooltips: false,
        animation: {
          duration: 10,
        },
        scales: {
          xAxes: [
            {
              display: false,
              ticks: {
                callback: function (value) {
                  return numberWithCommas(value);
                },
              },
              /*  stacked: true,
              gridLines: { display: false }, */
            },
          ],
          yAxes: [
            {
              stacked: true,
              gridLines: {
                color: "rgba(0, 0, 0, 0.1)",
              },
              /*  ticks: {
                callback: function (value) {
                  return numberWithCommas(value);
                },
              }, */
            },
          ],
        },
        legend: { display: false },
      }}
      height={30}
    />
  );
};

export default Timeline;
