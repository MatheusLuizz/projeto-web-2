import React, { useEffect, useState } from 'react';
import AppChart from './DashChartComponent';
import axios from 'axios';

const App = () => {
    useEffect(() => {
        fetch('http://localhost:8000/gastos/')
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const filterLast7Days = (data) => {
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);
  
      return data.filter(item => {
        const itemDate = new Date(item.date); // Adjust based on your date format
        return itemDate >= sevenDaysAgo && itemDate <= today;
      });
    };

    

    return (
        <div>
            <h1>Check the console for data</h1>
            <AppChart />
            <h1>Data from the Last 7 Days</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name} - {item.date}</li> // Adjust based on your data structure
        ))}
      </ul>
            
        </div>
    );
};

export default App;