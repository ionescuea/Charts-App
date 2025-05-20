import React, { useEffect, useState } from "react";
import axios from "axios";
import LineChartComponent from "./components/LineChartComponent";
import BarChartComponent from "./components/BarChartComponent";
import AreaChartComponent from "./components/AreaChartComponent"; 
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [data, setData] = useState([]);
  const [symbol, setSymbol] = useState("AAPL");
  const [chartType, setChartType] = useState("line");
  const [minPoint, setMinPoint] = useState(null);
  const [loading, setLoading] = useState(false); 

  const API_KEY = "53c411ab1dd9b6d3f82bb8704686d6a1";

  const fetchData = (stockSymbol) => {
    setLoading(true); 
    axios
      .get(
        `http://api.marketstack.com/v1/eod?access_key=${API_KEY}&symbols=${stockSymbol}&limit=30`
      )
      .then((res) => {
        const stockData = res.data.data
          .map((item) => ({
            date: new Date(item.date).getTime(),
            close: item.close,
          }))
          .reverse();

        const min = stockData.reduce(
          (min, item) => (item.close < min.close ? item : min),
          stockData[0]
        );

        setData(stockData);
        setMinPoint(min);
      })
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false)); 
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => fetchData(symbol), 500); 
    return () => clearTimeout(timeoutId); 
  }, [symbol]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 border bg-light shadow-sm rounded">
          <p className="mb-1">
            <strong>Date:</strong>{" "}
            {new Date(label).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="mb-0">
            <strong>Close:</strong> ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (loading) {
      return <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>;
    }

    switch (chartType) {
      case "bar":
        return (
          <BarChartComponent
            data={data}
            minPoint={minPoint}
            CustomTooltip={CustomTooltip}
          />
        );
      case "area":
        return (
          <AreaChartComponent
            data={data}
            minPoint={minPoint}
            CustomTooltip={CustomTooltip}
          />
        );
      default:
        return (
          <LineChartComponent
            data={data}
            minPoint={minPoint}
            CustomTooltip={CustomTooltip}
          />
        );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="text-center">
        <h2 className="mb-4">{symbol} Stock Price - Last 30 Days</h2>

        <div className="d-flex justify-content-center gap-3 mb-4">
          <div>
            <label htmlFor="stockSelect" className="form-label">
              Choose a stock:
            </label>
            <select
              className="form-select"
              id="stockSelect"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            >
              <option value="AAPL">Apple (AAPL)</option>
              <option value="GOOGL">Google (GOOGL)</option>
              <option value="MSFT">Microsoft (MSFT)</option>
              <option value="AMZN">Amazon (AMZN)</option>
              <option value="TSLA">Tesla (TSLA)</option>
              <option value="NFLX">Netflix (NFLX)</option>
              <option value="META">Meta (FB)</option>
              <option value="NVDA">NVIDIA (NVDA)</option>
              <option value="DIS">Disney (DIS)</option>
            </select>
          </div>

          <div>
            <label htmlFor="chartType" className="form-label">
              Chart type:
            </label>
            <select
              className="form-select"
              id="chartType"
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
            >
              <option value="line">Line Chart</option>
              <option value="bar">Bar Chart</option>
              <option value="area">Area Chart</option>
            </select>
          </div>
        </div>

        {renderChart()}

        {minPoint && !loading && (
          <p className="mt-3 text-danger">
            Lowest close: ${minPoint.close.toFixed(2)} on{" "}
            {new Date(minPoint.date).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default App;