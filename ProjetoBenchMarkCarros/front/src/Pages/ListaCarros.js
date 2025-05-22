import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ListaCarros() {
  const navigate = useNavigate();
  const [carros, setCarros] = useState([]);
  const [erro, setErro] = useState('');

  const listarCarros = async () => {
    try {
      const response = await axios.get('http://localhost:5019/api/carros/listarCarros');
      setCarros(response.data);
      setErro('');
    } catch (error) {
      setCarros([]);
      setErro('Não foi possível localizar os carros.');
    }
  };

  useEffect(() => {
    listarCarros();
  }, []);

  const voltarHome = () => navigate('/home');

  return (
    <div>
      <button onClick={voltarHome}>Home</button>
      <h2>Lista de Carros</h2>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {carros.map((carro, carros) => (
        <div key={carros} style={{ marginTop: '20px' , textAlign:'center'}}>
          <h3 style = {{width: 'fit-content', border: '2px solid', borderRadius: '10px', borderLenght:'10px',colour:'blue'}}>{carro.nomeCarro}</h3>
          <p><strong>Marca:</strong> {carro.marca}</p>
          <p><strong>Tipo:</strong> {carro.tipoModelo}</p>
          <p><strong>Ano:</strong> {carro.ano}</p>
          <p><strong>Valor:</strong> R$ {carro.valor}</p>
          <p><strong>Potência:</strong> {carro.potenciaCV} CV</p>
          <p><strong>Consumo:</strong> {carro.consumoKmL} km/L</p>
          <p><strong>Cilindrada:</strong> {carro.cilindrada}</p>
          <p><strong>Torque Kgfm:</strong> {carro.torqueKgfm}</p>
          <p><strong>Máximo de RPM:</strong>{carro.rpm}</p>
          <p><strong>Aceleração (0-100):</strong> {carro.aceleracao} s</p>
          <img src={carro.imagem} alt="Imagem do carro" width="300"/>
        </div>
      ))}
    </div>
  );
}

export default ListaCarros;
