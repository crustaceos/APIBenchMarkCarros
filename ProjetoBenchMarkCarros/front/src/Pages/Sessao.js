import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sessao() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Pilar esquerdo */}
      <div style={{ width: '80px', backgroundColor: '#007bff' }}></div>

      {/* Conteúdo principal */}
      <div style={{ flex: 1, textAlign: 'center', marginTop: '100px' }}>
        <h1>Bem-vindo ao Benchmark de Carros</h1>
        <p>Escolha uma opção para continuar:</p>
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              marginRight: '15px',
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: '#007bff',
              color: '#fff',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#007bff')}
          >
            Login
          </button>

          <button
            onClick={() => navigate('/cadastro')}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: '#28a745',
              color: '#fff',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#1e7e34')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#28a745')}
          >
            Cadastre-se
          </button>
        </div>
      </div>

      {/* Pilar direito */}
      <div style={{ width: '80px', backgroundColor: '#007bff' }}></div>
    </div>
  );
}

export default Sessao;
