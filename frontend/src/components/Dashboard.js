import React, { useEffect } from 'react';
import AppChart from './DashChartComponent';

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

    return (
        <div>
            <h1>Check the console for data</h1>
            <AppChart />
        </div>
    );
};

export default App;