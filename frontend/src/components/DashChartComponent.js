import React, { useEffect, useState } from 'react';
import BarChart7days from './CanvasForBarChart7days';

const AppChart = () => {
    const [chartdata, setChartdata] = useState(null);

    useEffect(() => {
        const fetchExpenses = fetch('http://localhost:8000/gastos/')
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

                return expensesByDate;
            });

        const fetchIncome = fetch('http://localhost:8000/ganhos/')
            .then(response => response.json())
            .then(data => {
                const currentDate = new Date();
                const sevenDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
                const filteredData = data.filter(item => {
                    const itemDate = new Date(item.data);
                    return itemDate >= sevenDaysAgo;
                });

                const incomeByDate = {};
                filteredData.forEach(item => {
                    const date = item.data;
                    if (!incomeByDate[date]) {
                        incomeByDate[date] = 0;
                    }
                    incomeByDate[date] += item.valor;
                });

                return incomeByDate;
            });

        Promise.all([fetchExpenses, fetchIncome])
            .then(([expensesByDate, incomeByDate]) => {
                var today = new Date();
                var labels = [];
                var expenses = [];
                var income = [];
                for (let index = 0; index < 7; index++) {
                    var date = new Date();
                    date.setDate(today.getDate() - index);
                    var dd = String(date.getDate()).padStart(2, '0');
                    var mm = String(date.getMonth() + 1).padStart(2, '0');
                    var dateString = date.toISOString().split('T')[0];
                    labels[index] = dd + '/' + mm;
                    expenses[index] = expensesByDate[dateString] || 0;
                    income[index] = incomeByDate[dateString] || 0;
                }

                setChartdata({
                    labels: labels.reverse(),
                    expenses: expenses.reverse(),
                    income: income.reverse(),
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h5>Receitas e Despesas dos últimos 7 dias</h5>
            {chartdata && <BarChart7days data={chartdata} />}

            <h5>Receitas e Despesas dos últimos 7 meses</h5>
        </div>
    );
}

export default AppChart;
