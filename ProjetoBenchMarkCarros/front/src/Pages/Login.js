import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({onLogin}) {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');
  const [mensagem, setMensagem] = useState('');

  const navigate = useNavigate();

  const fazerLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5019/api/usuario/login', {
        nomeUsuario,
        senhaUsuario
      }, {withCredentials: true});
      setMensagem(response.data.mensagem);
      onLogin();
      navigate('/home');
    } catch (error) {
      setMensagem(error.response?.data || 'Erro ao fazer login.');
    }
  };

  return (
    <div style={{padding:'20px'}}>
      <h2>Login</h2>
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
      />
      <br />
      <button onClick={fazerLogin}>Entrar</button>
      <p>{mensagem}</p>
    </div>
  );
}

export default Login;
