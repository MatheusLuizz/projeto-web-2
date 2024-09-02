import React, { useState, useEffect } from 'react';

const Calendar = () => {
  const [transacoes, setTransacoes] = useState([]);
  const [receitas, setReceitas] = useState(0);
  const [despesas, setDespesas] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const storedCpf = localStorage.getItem("authenticatedUser");
    fetch(`http://localhost:8000/calendario/${storedCpf}/`)
      .then(response => response.json())
      .then(data => {
       
        const todasTransacoes = [
          ...data.ganhos.map(ganho => ({ ...ganho, tipo: 'Receita' })),
          ...data.gastos.map(gasto => ({ ...gasto, tipo: 'Gasto' }))
        ];
        
        setTransacoes(todasTransacoes);
        calcularTotais(todasTransacoes);
      });
  }, []);

  const handleDelete = (index) => {
    const transacaoParaDeletar = transacoes[index];
  
    fetch(`http://localhost:8000/calendario/excluir/`, {
      method: 'POST', // Certifique-se de que o método está em maiúsculas
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: transacaoParaDeletar.data,
        nome_atividade: transacaoParaDeletar.nome_atividade,
        descricao: transacaoParaDeletar.descricao,
        valor: transacaoParaDeletar.valor,
        tipo: transacaoParaDeletar.tipo
      }),
    })
    .then(response => {
      if (response.ok) {
        const newTransacoes = [...transacoes];
        newTransacoes.splice(index, 1);
        setTransacoes(newTransacoes);
        setSelectedRow(null); 
        calcularTotais(newTransacoes);
      } else {
        console.error('Failed to delete the item.');
      }
    })
    .catch(error => console.error('Error deleting item:', error));
  };

  const calcularTotais = (transacoes) => {
    let receitas = 0;
    let despesas = 0;
    transacoes.forEach(transacao => {
      if (transacao.tipo === 'Receita') {
        receitas += parseFloat(transacao.valor);
      } else if (transacao.tipo === 'Gasto') {
        despesas += parseFloat(transacao.valor);
      }
    });
    setReceitas(receitas);
    setDespesas(despesas);
  };

  return (
    <div>
      <div className='calendar_up'>
        <div className='calendar_title'><h1>Calendário</h1></div>
        <div className='calendar_balance'>
        <p>Receitas: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(receitas)}</p>
        <p>Despesas: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(despesas)}</p>
        </div>
      </div>

      <div className='calendar_table'>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Tipo</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((transacao, index) => (
              <tr key={index} className={index === selectedRow ? 'selected' : ''}>
               <td>{new Date(transacao.data).toLocaleDateString('pt-BR')}</td>
                <td>{transacao.nome_atividade}</td>
                <td>{transacao.descricao}</td>
                <td>{parseFloat(transacao.valor).toFixed(2).replace('.', ',')}</td>
                <td>{transacao.tipo}</td>
                <td>
            <button onClick={() => handleDelete(index)}>Excluir</button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Calendar;