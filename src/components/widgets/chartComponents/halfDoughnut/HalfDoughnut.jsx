import React from "react";
import { Chart, Doughnut } from "react-chartjs-2";

const HalfDoughnut = ({ data, height }) => {
  var dataInner = {
    text: data.text,
    labels: data.label,
    datasets: [
      {
        data: data.data.map((d) => d.value),
        backgroundColor: data.data.map((d) => d.backgroundColor),
        hoverBackgroundColor: data.data.map((d) => d.hoverBackgroundColor),
      },
    ],
  };
  const originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
  Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
    draw: function () {
      originalDoughnutDraw.apply(this, arguments);

      const chart = this.chart.chart;
      const ctx = chart.ctx;
      const width = chart.width;
      const height = chart.height;

      const fontSize = (height / 80).toFixed(2);
      ctx.font = fontSize + "em Verdana";
      ctx.textBaseline = "middle";

      const text = chart.config.data.text,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height - fontSize - 10;

      ctx.fillText(text, textX, textY);
    },
  });
  return (
    <Doughnut
      data={dataInner}
      options={{
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
      }}
      height={height}
    />
  );
};
HalfDoughnut.defaultProps = {
  height: 200,
};
export default HalfDoughnut;
