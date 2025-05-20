import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceDot, } from "recharts";

const BarChartComponent = ({ data, minPoint, CustomTooltip }) => {
  return (
    <ResponsiveContainer width={800} height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          type="number"
          domain={["dataMin", "dataMax"]}
          tickFormatter={(timestamp) =>
            new Date(timestamp).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })
          }
          tick={{ fontSize: 12, angle: -45, textAnchor: "end" }}
          height={60}
        />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="close" fill="#17a2b8" />
        {minPoint && (
          <ReferenceDot
            x={minPoint.date}
            y={minPoint.close}
            r={5}
            fill="red"
            stroke="none"
            label={{
              value: "Min",
              position: "top",
              fill: "red",
              fontSize: 12,
            }}
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
