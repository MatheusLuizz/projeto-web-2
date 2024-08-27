import React, { useEffect, useState } from 'react';
import BarChart7days from './CanvasForBarChart7days';
import BarChart7months from './CanvasForBarChart7months'; // Assuming you have a separate component for 7 months chart

const AppChart = () => {
    const [chartdata7Days, setChartdata7Days] = useState(null);
    const [chartdata7Months, setChartdata7Months] = useState(null);

    useEffect(() => {
        const fetchExpenses = fetch('http://localhost:8000/gastos/')
            .then(response => response.json())
            .then(data => {
                const currentDate = new Date();
                const sevenDaysAgo = new Date(currentDate);
                sevenDaysAgo.setDate(currentDate.getDate() - 7);
                const sevenMonthsAgo = new Date(currentDate);
                sevenMonthsAgo.setMonth(currentDate.getMonth() - 7);

                const filteredData7Days = data.filter(item => {
                    const itemDate = new Date(item.data);
                    return itemDate >= sevenDaysAgo;
                });

                const filteredData7Months = data.filter(item => {
                    const itemDate = new Date(item.data);
                    return itemDate >= sevenMonthsAgo;
                });

                const expensesByDate7Days = {};
                filteredData7Days.forEach(item => {
                    const date = item.data.split('T')[0];
                    if (!expensesByDate7Days[date]) {
                        expensesByDate7Days[date] = 0;
                    }
                    expensesByDate7Days[date] += item.valor;
                });

                const expensesByDate7Months = {};
                filteredData7Months.forEach(item => {
                    const date = item.data.split('T')[0];
                    if (!expensesByDate7Months[date]) {
                        expensesByDate7Months[date] = 0;
                    }
                    expensesByDate7Months[date] += item.valor;
                });

                return { expensesByDate7Days, expensesByDate7Months };
            });

        const fetchIncome = fetch('http://localhost:8000/ganhos/')
            .then(response => response.json())
            .then(data => {
                const currentDate = new Date();
                const sevenDaysAgo = new Date(currentDate);
                sevenDaysAgo.setDate(currentDate.getDate() - 7);
                const sevenMonthsAgo = new Date(currentDate);
                sevenMonthsAgo.setMonth(currentDate.getMonth() - 7);

                const filteredData7Days = data.filter(item => {
                    const itemDate = new Date(item.data);
                    return itemDate >= sevenDaysAgo;
                });

                const filteredData7Months = data.filter(item => {
                    const itemDate = new Date(item.data);
                    return itemDate >= sevenMonthsAgo;
                });

                const incomeByDate7Days = {};
                filteredData7Days.forEach(item => {
                    const date = item.data.split('T')[0];
                    if (!incomeByDate7Days[date]) {
                        incomeByDate7Days[date] = 0;
                    }
                    incomeByDate7Days[date] += item.valor;
                });

                const incomeByDate7Months = {};
                filteredData7Months.forEach(item => {
                    const date = item.data.split('T')[0];
                    if (!incomeByDate7Months[date]) {
                        incomeByDate7Months[date] = 0;
                    }
                    incomeByDate7Months[date] += item.valor;
                });

                return { incomeByDate7Days, incomeByDate7Months };
            });

        Promise.all([fetchExpenses, fetchIncome])
            .then(([expensesData, incomeData]) => {
                const today = new Date();

                // Data for the last 7 days
                const labels7Days = [];
                const expenses7Days = [];
                const income7Days = [];
                for (let index = 0; index < 7; index++) {
                    const date = new Date();
                    date.setDate(today.getDate() - index);
                    const dd = String(date.getDate()).padStart(2, '0');
                    const mm = String(date.getMonth() + 1).padStart(2, '0');
                    const dateString = date.toISOString().split('T')[0];
                    labels7Days[index] = dd + '/' + mm;
                    expenses7Days[index] = expensesData.expensesByDate7Days[dateString] || 0;
                    income7Days[index] = incomeData.incomeByDate7Days[dateString] || 0;
                }

                setChartdata7Days({
                    labels: labels7Days.reverse(),
                    expenses: expenses7Days.reverse(),
                    income: income7Days.reverse(),
                });

                // Data for the last 7 months
                const labels7Months = [];
                const expenses7Months = [];
                const income7Months = [];
                const monthlyExpenses = {};
                const monthlyIncome = {};
                const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", 
                    "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
                
                for (let index = 0; index < 210; index++) { // 7 months * 30 days
                    const date = new Date();
                    date.setDate(date.getDate() - index);
                    const month = date.getMonth();
                    const year = date.getFullYear();
                    const dateString = date.toISOString().split('T')[0];
                    
                    const monthYear = `${monthNames[month]} ${year}`;
                    
                    if (!monthlyExpenses[monthYear]) {
                        monthlyExpenses[monthYear] = 0;
                        monthlyIncome[monthYear] = 0;
                    }
                    
                    monthlyExpenses[monthYear] += expensesData.expensesByDate7Months[dateString] || 0;
                    monthlyIncome[monthYear] += incomeData.incomeByDate7Months[dateString] || 0;
                }
                
                for (const monthYear in monthlyExpenses) {
                    labels7Months.push(monthYear);
                    expenses7Months.push(monthlyExpenses[monthYear]);
                    income7Months.push(monthlyIncome[monthYear]);
                }
                
                console.log(labels7Months);
                console.log(expenses7Months);
                console.log(income7Months);
                

                setChartdata7Months({
                    labels: labels7Months.reverse(),
                    expenses: expenses7Months.reverse(),
                    income: income7Months.reverse(),
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
              <h5>Receitas e Despesas dos últimos 7 dias</h5>
            {chartdata7Days && <BarChart7days data={chartdata7Days} />}
            <h5>Receitas e Despesas dos últimos 7 meses</h5>
            {chartdata7Months && <BarChart7months data={chartdata7Months} />}
        </div>
    );
};

export default AppChart;
