import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [data, setData] = useState([]);
  const [symbol, setSymbol] = useState("AAPL");
  const API_KEY = "7cf98637216b17f605bba2ef7a5d20f7";

  const fetchData = (stockSymbol) => {
    axios.get(`http://api.marketstack.com/v1/eod?access_key=${API_KEY}&symbols=${stockSymbol}&limit=30`)
      .then((res) => {
        const stockData = res.data.data.map(item => ({
          date: item.date.slice(0, 10),
          close: item.close,
        }));
        setData(stockData.reverse());
      })
      .catch((err) => console.error(err));
  };

    useEffect(() => {
    fetchData(symbol);
  }, [symbol]);

  const handleChange = (e) => {
    setSymbol(e.target.value);
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="text-center">
        <h2 className="mb-4">{symbol} Stock Price - Last 30 Days</h2>

        <div className="mb-4">
        <label htmlFor="stockSelect" className="form-label">Choose a company:</label>
        <select className="form-select" id="stockSelect" value={symbol} onChange={handleChange}>
          <option value="AAPL">Apple (AAPL)</option>
          <option value="GOOGL">Google (GOOGL)</option>
          <option value="MSFT">Microsoft (MSFT)</option>
          <option value="AMZN">Amazon (AMZN)</option>
          <option value="TSLA">Tesla (TSLA)</option>
          <option value="NFLX">Netflix (NFLX)</option>
          <option value="FB">Facebook (FB)</option>
          <option value="NVDA">NVIDIA (NVDA)</option>
          <option value="DIS">Disney (DIS)</option>
        </select>
      </div>

      <LineChart width={800} height={400} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" stroke="#000" fontSize={12} tickFormatter={date => new Date(date).toLocaleDateString()} />
        <YAxis fontSize={12} domain={['auto', 'auto']} />
        <Tooltip />
        <Line type="monotone" dataKey="close" stroke="#8884d8" strokeWidth={4} />
      </LineChart>
      </div>
    </div>
  );
};

export default App;
