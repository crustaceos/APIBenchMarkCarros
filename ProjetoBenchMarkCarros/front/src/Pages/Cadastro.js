import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cadastro({ onCadastro }) {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');
  const [mensagem, setMensagem] = useState('');

  const navigate = useNavigate();

  const fazerCadastro = async () => {
    try {
      const response = await axios.post('http://localhost:5019/api/usuario/cadastro', {
        nomeUsuario,
        senhaUsuario
      });
      setMensagem(response.data.mensagem);
      onCadastro();
      navigate('/Home');
    } catch (error) {
      setMensagem(error.response?.data || 'Erro ao cadastrar usuário.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Cadastro</h2>
      <input
        type="text"
        placeholder="Digite seu Nome de Usuário"
        value={nomeUsuario}
        onChange={(e) => setNomeUsuario(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Digite sua Senha"
        value={senhaUsuario}
        onChange={(e) => setSenhaUsuario(e.target.value)}
        style={{ marginTop: '10px' }}
      />
      <br />
      <button onClick={fazerCadastro} style={{ marginTop: '10px' }}>
        Cadastrar
      </button>
      <p>{mensagem}</p>
    </div>
  );
}

export default Cadastro;
