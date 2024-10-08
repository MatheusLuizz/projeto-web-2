import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './home.css';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  useEffect(() => {
    const storedCpf = localStorage.getItem("authenticatedUser");
    if (storedCpf) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:8000/user-summary/${storedCpf}/?period=${selectedPeriod}`);
          if (!response.ok) {
            throw new Error('Problema de rede');
          }
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error('Erro ao buscar dados:', error);
          setData(null);
        }
        setLoading(false);
      };

      fetchData();
    } else {
      setLoading(false);
      setData(null);
    }
  }, [selectedPeriod]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!data) {
    return <div>Não foi possível carregar os dados.</div>;
  }

  const chartData = {
    labels: ['Receitas', 'Despesas'],
    datasets: [
      {
        data: [parseFloat(data.revenue), parseFloat(data.expenses)],
        backgroundColor: ['#00C75A', '#FF5733'],
        borderColor: ['#fff', '#fff'],
        borderWidth: 1
      }
    ]
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="balance-info">
          <h1>Saldo: <span className="balance-amount">{data.balance.toFixed(2)}</span></h1>
        </div>
      </header>
      <div className="page-header">
        <h1>Resumo</h1>
      </div>
      <div className="main-content">
        <div className="summary-section">
          <div className="chart-container">
            <Pie data={chartData} />
          </div>
          <div className="summary-details">
            <p>Período: 
              <select value={selectedPeriod} onChange={e => setSelectedPeriod(e.target.value)}>
                <option value="week">Última Semana</option>
                <option value="month">Último Mês</option>
                <option value="all">Geral</option>
              </select>
            </p>
            <div className="summary-info">
              <p>Gastos: <span className="expense-amount">{data.expenses.toFixed(2)}</span></p>
              <p>Ganhos: <span className="income-amount">{data.revenue.toFixed(2)}</span></p>
              <p>Saldo: <span className="balance-amount">{data.balance.toFixed(2)}</span></p>
            </div>
          </div>
        </div>
        <div className="transactions-section">
          <h2>Últimas Transações</h2>
          <ul className="transactions-list">
            {data.transactions.length > 0 ? (
              data.transactions.map((transaction, index) => (
                <li key={index}>
                  <span>{transaction.nome_atividade} - R${transaction.valor.toFixed(2)}</span>
                  <span className="transaction-date">{formatDate(transaction.data)}</span>
                </li>
              ))
            ) : (
              <li>Nenhuma transação disponível</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;

