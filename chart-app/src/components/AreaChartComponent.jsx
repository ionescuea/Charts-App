import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceDot, } from "recharts";
import "/src/App.css";

const AreaChartComponent = ({ data, minPoint, CustomTooltip }) => {
  return (
    <div className="chart-shadow-container">
      <ResponsiveContainer width={800} height={400}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
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
          <Area
            type="monotone"
            dataKey="close"
            stroke="#28a745"
            fill="#28a74555"
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
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponent;
