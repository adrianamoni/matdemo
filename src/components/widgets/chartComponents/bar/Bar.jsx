import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data }) => {
  const [dataForChart, setDataForChart] = useState({});

  useEffect(() => {
    const tempData = {
      labels: data.data.map((d) => d.label),
      datasets: [
        {
          label: "# of Votes",
          data: data.data.map((d) => d.value),
          backgroundColor: data.data.map((d) => d.backgroundColor),
          borderColor: data.data.map((d) => d.borderColor),
          borderWidth: 1,
        },
      ],
    };
    setDataForChart(tempData);
  }, [data]);

  /*  const data2 = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "Title",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }; */

  return (
    dataForChart &&
    Object.keys(dataForChart).length > 0 && (
      <Bar
        data={dataForChart}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
        height={100}
      />
    )
  );
};

export default BarChart;
