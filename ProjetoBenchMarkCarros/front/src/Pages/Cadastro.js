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
      }, { withCredentials: true });
      setMensagem(response.data.mensagem);
      onCadastro();
      navigate('/home');
    } catch (error) {
      setMensagem(error.response?.data || 'Erro ao cadastrar usuário.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0'
    }}>
      {/* Pilar esquerdo */}
      <div style={{
        width: '10%',
        backgroundColor: '#3399ff'
      }} />

      {/* Conteúdo central */}
      <div style={{
        flex: 1,
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h2 style={{ color: '#003366' }}>Cadastro</h2>
        <input
          type="text"
          placeholder="Digite seu Nome de Usuário"
          value={nomeUsuario}
          onChange={(e) => setNomeUsuario(e.target.value)}
          style={{
            padding: '10px',
            marginTop: '10px',
            width: '100%',
            maxWidth: '300px',
            color: '#000',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <input
          type="password"
          placeholder="Digite sua Senha"
          value={senhaUsuario}
          onChange={(e) => setSenhaUsuario(e.target.value)}
          style={{
            padding: '10px',
            marginTop: '10px',
            width: '100%',
            maxWidth: '300px',
            color: '#000',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button
          onClick={fazerCadastro}
          style={{
            marginTop: '15px',
            padding: '10px 20px',
            backgroundColor: '#3399ff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cadastrar
        </button>
        <p style={{ marginTop: '10px', color: '#000' }}>{mensagem}</p>
      </div>

      {/* Pilar direito */}
      <div style={{
        width: '10%',
        backgroundColor: '#3399ff'
      }} />
    </div>
  );
}

export default Cadastro;