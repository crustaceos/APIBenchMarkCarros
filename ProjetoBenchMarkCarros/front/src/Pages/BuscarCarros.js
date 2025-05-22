import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BuscarCarro() {
  const navigate = useNavigate();
  const [nomeCarro, setNomeCarro] = useState('');
  const [carro, setCarro] = useState(null);
  const [erro, setErro] = useState('');

  const buscarCarro = async () => {
    try {
      const response = await axios.get(`http://localhost:5019/api/carros/${nomeCarro}`);
      setCarro(response.data);
      setErro('');
    } catch (error) {
      setCarro(null);
      setErro('Carro não encontrado.');
    }
  };

  const voltarHome = () => navigate('/home');

  return (
    <div style={{padding:'20px'}}>
      <button onClick = {voltarHome}>Home</button>
      <h2>Buscar Carro</h2>
      <input
        type="text"
        placeholder="Digite o nome do carro"
        value={nomeCarro}
        onChange={(e) => setNomeCarro(e.target.value)}
      />
      <button onClick={buscarCarro}>
        Buscar
      </button>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {carro && (
        <div style={{ marginTop: '20px' }}>
          <h3>{carro.nomeCarro}</h3>
          <p><strong>Marca:</strong> {carro.marca}</p>
          <p><strong>Tipo:</strong> {carro.tipoModelo}</p>
          <p><strong>Ano:</strong> {carro.ano}</p>
          <p><strong>Valor:</strong> R$ {carro.valor}</p>
          <p><strong>Potência:</strong> {carro.potenciaCV} CV</p>
          <p><strong>Consumo:</strong> {carro.consumoKmL} km/L</p>
          <p><strong>Cilindrada:</strong> {carro.cilindrada} </p>
          <p><strong>Torque Kgfm:</strong> {carro.torqueKgfm} </p>
          <p><strong>Máximo de RPM:</strong>{carro.rpm}</p>
          <p><strong>Aceleração (0-100):</strong> {carro.aceleracao} s</p>
          <img src={carro.imagem} alt="Imagem do carro" width="300" />
        </div>
      )}
    </div>
  );
}

export default BuscarCarro;
