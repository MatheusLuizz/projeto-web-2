import React from 'react';
import BarChart from './DashBarChart';

const AppChart = () => {
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = dd + '/' + mm + '/' + yyyy;

    let labels = [7]
    for (let index = 0; index < 7; index++) {
         labels[index] = dd - index + '/' + mm;
        
    }
    console.log(labels)
    const data = {
        labels: labels.reverse(),
        expenses: [50, 30, 40, 60, 70, 20, 90],
        income: [80, 100, 60, 90, 120, 50, 110],
    };

    return (
        <div>
            <h1>Expenses and Income for the Last Week</h1>
            <BarChart data={data} />
        </div>
    );
};

export default AppChart;