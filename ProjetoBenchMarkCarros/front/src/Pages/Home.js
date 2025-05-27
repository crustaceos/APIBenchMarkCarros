import React from "react";
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif',
    }}>
      {/* Pilar azul esquerdo */}
      <div style={{ width: '80px', backgroundColor: '#007bff' }}></div>

      {/* Conteúdo central */}
      <div style={{ 
        flex: 1, 
        maxWidth: '600px', 
        margin: '40px auto', 
        padding: '0 20px',
        boxSizing: 'border-box',
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Home</h1>
        <p style={{ fontSize: '18px', marginBottom: '30px', textAlign: 'center' }}>
          Aqui você poderá comparar carros, para descobrir qual tem mais chance de ganhar em uma corrida e qual tem o melhor custo-benefício.
        </p>

        {[
          { label: 'Procurar um Carro', path: '/buscarcarros' },
          { label: 'Listar Carros', path: '/listacarros' },
          { label: 'Criar Carro', path: '/criarcarro' },
          { label: 'Deletar Carro', path: '/deletarcarro' },
          { label: 'Atualizar Carro', path: '/atualizarcarro' },
          { label: 'Comparar Carros', path: '/compararcarros' },
        ].map(({ label, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            style={{
              display: 'block',
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '6px',
              border: '1px solid #007bff',
              backgroundColor: '#007bff',
              color: 'white',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#0056b3'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#007bff'}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Pilar azul direito */}
      <div style={{ width: '80px', backgroundColor: '#007bff' }}></div>
    </div>
  );
}

export default Home;
