import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";



const COLORS = ["#ffbb28", "#ddd"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (index === 0) {
    return (
      <text
        x={x + 20}
        y={y-8}
        fill={'white'}
        textAnchor={x > cx ? "start" : "end"}
        fontFamily={'Arial'}
        fontWeight="bold"
        fontSize={"1.4em"}
        dominantBaseline="central"
       /*  stroke="black" */
        style={{textShadow: "0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1),0px 18px 23px rgba(0,0,0,0.1)"}}
        /* strokeWidth={1} */
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  } else {
    return null;
  }
};
export default function HalfDoughnutChart({data}) {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        innerRadius={20}
        dataKey="value"
        startAngle={180}
        endAngle={0}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
    </PieChart>
  );
}
