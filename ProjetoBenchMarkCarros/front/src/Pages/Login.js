import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');
  const [mensagem, setMensagem] = useState('');

  const navigate = useNavigate();

  const fazerLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5019/api/usuario/login',
        { nomeUsuario, senhaUsuario },
        { withCredentials: true }
      );
      setMensagem(response.data.mensagem);
      onLogin();
      navigate('/home');
    } catch (error) {
      setMensagem(error.response?.data || 'Erro ao fazer login.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
    }}>
      {/* Pilar azul esquerdo */}
      <div style={{ width: '80px', backgroundColor: '#007bff' }}></div>

      {/* Conteúdo principal centralizado */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}>
        <div
          style={{
            maxWidth: '400px',
            width: '100%',
            fontFamily: 'Arial, sans-serif',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            backgroundColor: 'white',
            padding: '20px',
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
          <input
            type="text"
            placeholder="Digite seu Nome de Usuário"
            value={nomeUsuario}
            onChange={(e) => setNomeUsuario(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '16px',
              boxSizing: 'border-box',
            }}
          />
          <input
            type="password"
            placeholder="Digite sua Senha"
            value={senhaUsuario}
            onChange={(e) => setSenhaUsuario(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '16px',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={fazerLogin}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#007bff',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
          >
            Entrar
          </button>
          {mensagem && (
            <p
              style={{
                marginTop: '15px',
                textAlign: 'center',
                color: mensagem.toLowerCase().includes('erro') ? 'red' : 'green',
              }}
            >
              {mensagem}
            </p>
          )}
        </div>
      </div>

      {/* Pilar azul direito */}
      <div style={{ width: '80px', backgroundColor: '#007bff' }}></div>
    </div>
  );
}

export default Login;
