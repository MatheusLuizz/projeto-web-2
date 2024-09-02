import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Expenses = () => {
  const [chartData, setChartData] = useState(null);
  const [currentMonthTotal, setCurrentMonthTotal] = useState(0);
  const [formData, setFormData] = useState({
    nome_atividade: '',
    tipo_atividade: '',
    valor: '',
    data: '',
    descricao: '',
    tipo_valor: '',
  });
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    const fetchExpensesData = async () => {
      try {
        const response = await fetch('http://localhost:8000/gastos/');
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Dados dos gastos recebidos:', data);

        const currentDate = new Date();
        const labels = [];
        const expenseValues = [];
        let monthTotal = 0;

        for (let i = 6; i >= 0; i--) {
          const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
          const monthLabel = month.toLocaleString('default', { month: 'short' });
          labels.push(monthLabel);

          const monthlyExpenses = data
            .filter(item => {
              const itemDate = new Date(item.data);
              return (
                itemDate.getFullYear() === month.getFullYear() &&
                itemDate.getMonth() === month.getMonth()
              );
            })
            .reduce((sum, item) => sum + item.valor, 0);

          expenseValues.push(monthlyExpenses);

          if (i === 0) {
            monthTotal = monthlyExpenses;
          }
        }

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Gastos Mensais',
              data: expenseValues,
              backgroundColor: 'rgba(255, 0, 0, 0.6)', // Cor das barras
            },
          ],
        });

        setCurrentMonthTotal(monthTotal);
      } catch (error) {
        console.error('Erro ao buscar dados dos gastos:', error);
      }
    };

    fetchExpensesData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `$${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log('Campo alterado:', name, value);
  };

  const validateDate = (dateString) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    return datePattern.test(dateString);
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, data: value });

    if (!validateDate(value)) {
      setDateError('Formato de data inválido. Use aaaa-mm-dd.');
      console.log('Erro de validação de data:', value);
    } else {
      setDateError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateDate(formData.data)) {
      setDateError('Formato de data inválido. Use aaaa-mm-dd.');
      console.log('Erro de validação de data ao enviar o formulário:', formData.data);
      return;
    }
    
    setDateError('');

    const payload = {
      nome_atividade: formData.nome_atividade,
      valor: parseFloat(formData.valor),
      tipo_atividade: formData.tipo_atividade,
      data: formData.data,
      descricao: formData.descricao,
      tipo_valor: formData.tipo_valor
    };

    console.log('Enviando dados:', payload);

    try {
      const response = await fetch('http://localhost:8000/gastos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Erro ao salvar gasto: ${response.statusText}`);
      }

      alert('Gasto salvo com sucesso!');
      setFormData({
        nome_atividade: '',
        tipo_atividade: '',
        valor: '',
        data: '',
        descricao: '',
        tipo_valor: '',
      });
    } catch (error) {
      console.error('Erro ao enviar dados para o backend:', error);
      alert('Erro ao salvar gasto.');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, borderBottom: '1px solid #ddd' }}>
        <Typography variant="h5">Gastos</Typography>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h6">Valor Atual</Typography>
          <TextField
            variant="outlined"
            value={`R$${currentMonthTotal.toFixed(2)}`}
            sx={{ borderRadius: '16px', mt: 1 }}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, p: 2, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: '800px' }}>
          {chartData ? <Bar data={chartData} options={options} /> : <Typography>Carregando dados...</Typography>}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, borderTop: '1px solid #ddd', mt: 'auto' }}>
        <Box sx={{ flex: 1, pr: 2 }}>
          <Typography variant="h6">Inserir gasto</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
            <TextField
              name="nome_atividade"
              label="Nome da Atividade"
              variant="outlined"
              margin="normal"
              value={formData.nome_atividade}
              onChange={handleChange}
              inputProps={{ maxLength: 255 }}
            />
            <TextField
              name="tipo_atividade"
              label="Tipo de Atividade"
              variant="outlined"
              margin="normal"
              value={formData.tipo_atividade}
              onChange={handleChange}
              inputProps={{ maxLength: 255 }}
            />
            <TextField
              name="valor"
              label="Valor"
              variant="outlined"
              margin="normal"
              value={formData.valor}
              onChange={handleChange}
              type="number"
              inputProps={{ step: '0.01' }}
            />
            <TextField
              name="data"
              label="Data (aaaa-mm-dd)"
              variant="outlined"
              margin="normal"
              value={formData.data}
              onChange={handleDateChange}
              error={!!dateError}
              helperText={dateError}
              inputProps={{ maxLength: 10 }}
            />
            <TextField
              name="descricao"
              label="Descrição"
              variant="outlined"
              margin="normal"
              value={formData.descricao}
              onChange={handleChange}
              inputProps={{ maxLength: 500 }}
            />
            <Button 
              type = "submit"
              variant="contained" 
              sx={{ 
                mt: 3, 
                mb: 2, 
                bgcolor: '#FE0000', 
                borderRadius: '16px',
                alignSelf: 'center' 
              }}
              >
              Salvar
            </Button>
          </Box>
        </Box>
        <Box sx={{ flex: 1, pl: 2 }}>
          <Typography variant="h6">Quadro</Typography>
          <Box sx={{ border: '1px solid #ddd', p: 2, borderRadius: '8px', height: '100%' }}>
            <Typography>Informações serão adicionadas aqui...</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Expenses;
