import React, { useState } from 'react';
import axios from 'axios';

function BuscarCarro() {
  const [nomeCarro, setNomeCarro] = useState('');
  const [carro, setCarro] = useState(null);
  const [erro, setErro] = useState('');

  const buscarCarro = async () => {
    try {
      const response = await axios.get(`https://localhost:5019/api/carros/${nomeCarro}`);
      setCarro(response.data);
      setErro('');
    } catch (error) {
      setCarro(null);
      setErro('Carro não encontrado.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Buscar Carro</h2>
      <input
        type="text"
        placeholder="Digite o nome do carro"
        value={nomeCarro}
        onChange={(e) => setNomeCarro(e.target.value)}
      />
      <button onClick={buscarCarro} style={{ marginLeft: '10px' }}>
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
          <p><strong>Aceleração (0-100):</strong> {carro.aceleracao} s</p>
          <img src={carro.imagem} alt="Imagem do carro" width="300" />
        </div>
      )}
    </div>
  );
}

export default BuscarCarro;
