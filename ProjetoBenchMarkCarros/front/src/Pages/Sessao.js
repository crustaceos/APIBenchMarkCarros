import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sessao() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Bem-vindo ao Benchmark de Carros</h1>
      <p>Escolha uma opção para continuar:</p>
      <button onClick={() => navigate('/login') }>Login</button>
      <button onClick={() => navigate('/cadastro')}>Cadastre-se</button>
    </div>
  );
}

export default Sessao;
