import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Income = () => {
  // dados inventados, jajá substituo por dados do db
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Ganhos Mensais',
        // mais dados inventados
        data: [120, 130, 115, 140, 160, 155, 170],
        backgroundColor: 'rgba(0, 199, 90, 0.6)', // Cor das barras
      },
    ],
  };

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, borderBottom: '1px solid #ddd' }}>
        {/* "Ganhos" */}
        <Typography variant="h5">Ganhos</Typography>
        
        {/* "Valor Atual" */}
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h6">Valor Atual</Typography>
          <TextField
            variant="outlined"
            value="$0.00"
            sx={{ borderRadius: '16px', mt: 1 }}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      </Box>
      
      {/* Gráfico */}
      <Box sx={{ flexGrow: 1, p: 2, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: '800px' }}>
          <Bar data={data} options={options} />
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, borderTop: '1px solid #ddd', mt: 'auto' }}>
        {/* Formulário */}
        <Box sx={{ flex: 1, pr: 2 }}>
          <Typography variant="h6">Inserir ganho</Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
            <TextField label="Nome" variant="outlined" margin="normal" />
            <TextField label="Valor" variant="outlined" margin="normal" />
            <TextField label="Tipo de Atividade" variant="outlined" margin="normal" />
            <TextField label="Tipo de Valor" variant="outlined" margin="normal" />
            <TextField label="Data" variant="outlined" margin="normal" />
            <TextField label="Descrição" variant="outlined" margin="normal" multiline rows={4} />
            <Button 
              variant="contained" 
              sx={{ 
                mt: 3, 
                mb: 2, 
                bgcolor: '#00C75A', 
                borderRadius: '16px',
                alignSelf: 'center' 
              }}
            >
              Salvar
            </Button>
          </Box>
        </Box>
        
        {/* "Quadro" */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">Quadro</Typography>
          {/* Conteúdo do quadro, tbm adiciono jajá */}
        </Box>
      </Box>
    </Box>
  );
};

export default Income;