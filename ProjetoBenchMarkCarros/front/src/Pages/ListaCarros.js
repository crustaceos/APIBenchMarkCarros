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
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
    }}>
      {/* Pilar azul esquerdo */}
      <div style={{ width: '80px', backgroundColor: '#007bff' }}></div>

      {/* Conteúdo central */}
      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
      }}>
        <button
          onClick={voltarHome}
          style={{
            marginBottom: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
        >
          Home
        </button>

        <h2 style={{ textAlign: 'center' }}>Lista de Carros</h2>

        {erro && <p style={{ color: 'red', textAlign: 'center' }}>{erro}</p>}

        {carros.map((carro, index) => (
          <div
            key={index}
            style={{
              marginTop: '20px',
              textAlign: 'center',
              backgroundColor: 'white',
              padding: '15px',
              borderRadius: '8px',
              boxShadow: '0 0 8px rgba(0,0,0,0.1)',
              maxWidth: '500px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <h3
              style={{
                border: '2px solid #007bff',
                borderRadius: '10px',
                padding: '5px 10px',
                color: '#007bff',
                display: 'inline-block',
                minWidth: '200px',
                marginBottom: '10px',
              }}
            >
              {carro.nomeCarro}
            </h3>
            <p><strong>Marca:</strong> {carro.marca}</p>
            <p><strong>Tipo:</strong> {carro.tipoModelo}</p>
            <p><strong>Ano:</strong> {carro.ano}</p>
            <p><strong>Valor:</strong> R$ {carro.valor}</p>
            <p><strong>Potência:</strong> {carro.potenciaCV} CV</p>
            <p><strong>Consumo:</strong> {carro.consumoKmL} km/L</p>
            <p><strong>Cilindrada:</strong> {carro.cilindrada}</p>
            <p><strong>Torque Kgfm:</strong> {carro.torqueKgfm}</p>
            <p><strong>Máximo de RPM:</strong> {carro.rpm}</p>
            <p><strong>Aceleração (0-100):</strong> {carro.aceleracao} s</p>
            <img
              src={carro.imagem}
              alt={`Imagem do carro ${carro.nomeCarro}`}
              width="300"
              style={{ marginTop: '10px', borderRadius: '8px' }}
            />
          </div>
        ))}
      </div>

      {/* Pilar azul direito */}
      <div style={{ width: '80px', backgroundColor: '#007bff' }}></div>
    </div>
  );
}

export default ListaCarros;
