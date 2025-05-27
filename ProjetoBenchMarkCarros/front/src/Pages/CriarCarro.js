import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CriarCarro() {
  const navigate = useNavigate();
  const [carro, setCarro] = useState({
    nomeCarro: '',
    marca: '',
    tipoModelo: '',
    imagem: '',
    cilindrada: '',
    torqueKgfm: '',
    rpm: '',
    ano: '',
    valor: '',
    potenciaCV: '',
    consumoKmL: '',
    aceleracao: ''
  });

  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  const setarCarro = (e) => {
    setCarro({ ...carro, [e.target.name]: e.target.value });
  };

  const criarCarro = async () => {
    if (!carro.nomeCarro || !carro.marca || !carro.ano) {
      setMensagem('Por favor, preencha os campos: Nome do Carro, Marca e Ano.');
      return;
    }

    const dadosParaEnviar = {
      ...carro,
      cilindrada: Number(carro.cilindrada),
      torqueKgfm: Number(carro.torqueKgfm),
      rpm: Number(carro.rpm),
      ano: Number(carro.ano),
      valor: Number(carro.valor),
      potenciaCV: Number(carro.potenciaCV),
      consumoKmL: Number(carro.consumoKmL),
      aceleracao: Number(carro.aceleracao),
    };

    try {
      setLoading(true);
      await axios.post('http://localhost:5019/api/carros/criarCarro', dadosParaEnviar, {
        withCredentials: true
      });
      setMensagem('Carro cadastrado com sucesso!');
      navigate('/home');
    } catch (error) {
      setMensagem(error.response?.data || 'Erro ao cadastrar carro.');
    } finally {
      setLoading(false);
    }
  };

  const voltarHome = () => navigate('/home');

  const camposLabels = {
    nomeCarro: 'Nome do Carro',
    marca: 'Marca',
    tipoModelo: 'Tipo do Modelo',
    imagem: 'URL da Imagem',
    cilindrada: 'Cilindrada (cm³)',
    torqueKgfm: 'Torque (Kgfm)',
    rpm: 'RPM',
    ano: 'Ano',
    valor: 'Valor (R$)',
    potenciaCV: 'Potência (CV)',
    consumoKmL: 'Consumo (km/L)',
    aceleracao: 'Aceleração (0-100 km/h em segundos)'
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <button
        onClick={voltarHome}
        style={{
          marginBottom: '20px',
          padding: '8px 16px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          border: 'none',
          borderRadius: '4px',
          color: 'white'
        }}
      >
        Home
      </button>

      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Cadastrar Novo Carro</h2>

      {Object.keys(carro).map((key) => (
        <div key={key} style={{ marginBottom: '15px' }}>
          <label
            htmlFor={key}
            style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}
          >
            {camposLabels[key]}
          </label>
          <input
            id={key}
            type={['cilindrada', 'torqueKgfm', 'rpm', 'ano', 'valor', 'potenciaCV', 'consumoKmL', 'aceleracao'].includes(key) ? 'number' : (key === 'imagem' ? 'url' : 'text')}
            name={key}
            placeholder={camposLabels[key]}
            value={carro[key]}
            onChange={setarCarro}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
          />
        </div>
      ))}

      <button
        onClick={criarCarro}
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          backgroundColor: loading ? '#94d3a2' : '#28a745',
          border: 'none',
          borderRadius: '4px',
          color: 'white',
          fontWeight: 'bold'
        }}
      >
        {loading ? 'Cadastrando...' : 'Cadastrar Carro'}
      </button>

      {mensagem && (
        <p style={{ marginTop: '15px', textAlign: 'center', fontWeight: 'bold', color: mensagem.includes('Erro') ? 'red' : 'green' }}>
          {mensagem}
        </p>
      )}
    </div>
  );
}

export default CriarCarro;

