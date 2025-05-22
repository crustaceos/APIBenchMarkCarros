import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CompararCarros() {
  const [nomeCarro1, setNomeCarro1] = useState('');
  const [nomeCarro2, setNomeCarro2] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const navigate = useNavigate();

  const compararCarros = async () => {
    try {
      const response = await axios.get(`http://localhost:5019/api/carros/comparar`, {
        params: {
          nome1: nomeCarro1,
          nome2: nomeCarro2
        }
      });
      setResultado(response.data);
      setErro('');
    } catch (error) {
      setResultado(null);
      setErro('Um dos carros não foi encontrado.');
    }
  };

  const voltarHome = () => navigate('/home');

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={voltarHome}>Home</button>
      <h2>Comparar Carros</h2>

      <input
        type="text"
        placeholder="Nome do Carro 1"
        value={nomeCarro1}
        onChange={(e) => setNomeCarro1(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <input
        type="text"
        placeholder="Nome do Carro 2"
        value={nomeCarro2}
        onChange={(e) => setNomeCarro2(e.target.value)}
      />
      <button onClick={compararCarros} style={{ marginLeft: '10px' }}>
        Comparar
      </button>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {resultado && (
        <div style={{ marginTop: '20px' }}>
          <h3>Resultado da Comparação</h3>
          <p><strong>Carro 1:</strong> {resultado.carro1}</p>
          <p><strong>Carro 2:</strong> {resultado.carro2}</p>
          <p><strong>Vencedor da Corrida:</strong> {resultado.vencedorCorrida}</p>
          <p><strong>Melhor Custo-Benefício:</strong> {resultado.melhorCustoBeneficio}</p>
        </div>
      )}
    </div>
  );
}

export default CompararCarros;
