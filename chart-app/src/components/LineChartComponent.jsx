import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceDot, } from "recharts";

const LineChartComponent = ({ data, minPoint, CustomTooltip }) => {
  return (
    <ResponsiveContainer width={800} height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 60 }}>
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
        <YAxis domain={["auto", "auto"]} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="close"
          stroke="#007bff"
          strokeWidth={2}
          dot={false}
        />
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
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
