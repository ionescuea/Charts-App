import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [data, setData] = useState([]);
  const API_KEY = "7cf98637216b17f605bba2ef7a5d20f7";

  useEffect(() => {
    axios.get(`http://api.marketstack.com/v1/eod?access_key=${API_KEY}&symbols=AAPL&limit=30`)
      .then((res) => {
        const stockData = res.data.data.map(item => ({
          date: item.date.slice(0, 10),
          close: item.close,
        }));
        setData(stockData.reverse()); 
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Stock Price Chart</h1>
      <p className="mb-4">Data Source: <a href="https://marketstack.com/" target="_blank" rel="noopener noreferrer">MarketStack</a></p>
      <h2 className="mb-4">AAPL Stock Price - Last 30 Days</h2>
      <LineChart width={600} height={300} data={data} >
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" stroke="#000" fontSize={12} tickFormatter={date => new Date(date).toLocaleDateString()} />
        <YAxis fontSize={12} domain={['auto', 'auto']} />
        <Tooltip />
        <Line type="monotone" dataKey="close" stroke="#8884d8" strokeWidth={4} />
      </LineChart>
    </div>
  );
};

export default App;
