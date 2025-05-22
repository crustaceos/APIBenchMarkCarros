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

  const setarCarro = (e) => {
    setCarro({ ...carro, [e.target.name]: e.target.value });
  };

  const criarCarro = async () => {
    try {
      await axios.post('http://localhost:5019/api/carros/criarCarro', carro, {
        withCredentials: true
      });
      setMensagem('Carro cadastrado com sucesso!');
      navigate('/home');
    } catch (error) {
      setMensagem(error.response?.data || 'Erro ao cadastrar carro.');
    }
  };

  function navegarHome(){
    navigate = ('/home')
  }

  return (
    <div style={{ padding: '20px' }}>
        <button onClick = {navegarHome}>Home</button>

      <h2>Cadastrar Novo Carro</h2>
      {Object.keys(carro).map((key) => (
        <div key={key} style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name={key}
            placeholder={key}
            value={carro[key]}
            onChange={setarCarro}
            style={{ width: '300px' }}
          />
        </div>
      ))}
      <button onClick={criarCarro}>Cadastrar Carro</button>
      <p>{mensagem}</p>
    </div>
  );
}

export default CriarCarro;
