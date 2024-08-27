import React, { useEffect, useState } from 'react';
import BarChart from './DashBarChart';

const AppChart = () => {
    const [chartdata, setChartdata] = useState(null);


    useEffect(() => {
        fetch('http://localhost:8000/gastos/')
            .then(response => response.json())
            .then(data => {
                const currentDate = new Date();
                const sevenDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
                const filteredData = data.filter(item => {
                    const itemDate = new Date(item.data);
                    return itemDate >= sevenDaysAgo;
                });

                const expensesByDate = {};
                filteredData.forEach(item => {
                    const date = item.data;
                    if (!expensesByDate[date]) {
                        expensesByDate[date] = 0;
                    }
                    expensesByDate[date] += item.valor;
                });

                var today = new Date();
                var labels = [];
                var expenses = [];
                for (let index = 0; index < 7; index++) {
                    var date = new Date();
                    date.setDate(today.getDate() - index);
                    var dd = String(date.getDate()).padStart(2, '0');
                    var mm = String(date.getMonth() + 1).padStart(2, '0');
                    var dateString = date.toISOString().split('T')[0];
                    labels[index] = dd + '/' + mm;
                    expenses[index] = expensesByDate[dateString] || 0;
                }

                setChartdata({
                    labels: labels.reverse(),
                    expenses: expenses.reverse(),
                    income: [80, 100, 60, 90, 120, 50, 110],
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1>Expenses and Income for the Last Week</h1>
            {chartdata && <BarChart data={chartdata} />}
        </div>
    );
}

export default AppChart;
