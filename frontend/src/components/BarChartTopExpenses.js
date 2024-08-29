import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const TopExpenses = () => {
  const [topExpenses, setTopExpenses] = useState([]);
  const [hasData, setHasData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/gastos');
        const data = await response.json();

        // Process the data inside the promise
        const processedData = new Promise((resolve, reject) => {
          try {
            const expenses = data.map(item => ({
              ...item,
              data: moment(item.data),
            }));

            const groupedExpenses = expenses.reduce((acc, expense) => {
              const { tipo_atividade, valor } = expense;
              if (!acc[tipo_atividade]) {
                acc[tipo_atividade] = 0;
              }
              acc[tipo_atividade] += valor;
              return acc;
            }, {});

            const sortedExpenses = Object.entries(groupedExpenses)
              .map(([tipo_atividade, valor]) => ({ tipo_atividade, valor }))
              .sort((a, b) => b.valor - a.valor)
              .slice(0, 4);

            resolve(sortedExpenses);
          } catch (error) {
            reject(error);
          }
        });

        processedData.then(sortedExpenses => {
          setTopExpenses(sortedExpenses);
          setHasData(sortedExpenses.length > 0);
        }).catch(error => {
          console.error('Error processing data:', error);
          setHasData(false);
        });

      } catch (error) {
        console.error('Error fetching data:', error);
        setHasData(false);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: topExpenses.map(expense => expense.tipo_atividade),
    datasets: [
      {
        data: topExpenses.map(expense => expense.valor),
        backgroundColor: 'rgb(0, 10, 50)',
        borderColor: 'rgb(0, 10, 50)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h5>Os 4 Maiores Tipos de Gastos</h5>
      {hasData ? (
        <div style={{ width: '590px', height: '255px' }}>
          <Bar data={data} options={options} />
        </div>
      ) : (
        <p>Zero Gastos ( 〃＾▽＾〃)</p>
      )}
    </div>
  );
};

export default TopExpenses;
