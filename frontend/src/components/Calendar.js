import React, { useState, useEffect } from 'react';

const Calendar = () => {
  const [transacoes, setTransacoes] = useState([]);
  const [receitas, setReceitas] = useState(0);
  const [despesas, setDespesas] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const cpf = '55555555555'; // Aqui você deve usar o CPF do usuário logado
    fetch(`http://localhost:8000/calendario/${cpf}/`)
      .then(response => response.json())
      .then(data => {
        // Combina os ganhos e gastos em um único array
        const todasTransacoes = [
          ...data.ganhos.map(ganho => ({ ...ganho, tipo: 'Receita' })),
          ...data.gastos.map(gasto => ({ ...gasto, tipo: 'Gasto' }))
        ];
        
        setTransacoes(todasTransacoes);
        calcularTotais(todasTransacoes);
      });
  }, []);

  const handleDelete = (index) => {
    // Cria um novo array sem a transação selecionada
    const newTransacoes = [...transacoes];
    newTransacoes.splice(index, 1);
    setTransacoes(newTransacoes);
    setSelectedRow(null); // Limpa a seleção após a exclusão
    calcularTotais(newTransacoes);
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