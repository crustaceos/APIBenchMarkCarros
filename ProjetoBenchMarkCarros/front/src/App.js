import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BuscarCarro from './Pages/BuscarCarros';
import Home from './Pages/Home';
import Cadastro from './Pages/Cadastro';
import Login from './Pages/Login';
import Sessao from './Pages/Sessao';
import ListaCarros from './Pages/ListaCarros';
import CriarCarro from './Pages/CriarCarro';
import DeletarCarro from './Pages/DeletarCarro';
import AtualizarCarro from './Pages/AtualizarCarro';
import CompararCarros from './Pages/CompararCarros';
import { useEffect, useState } from 'react';
import axios from 'axios';



function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const [verificado, setVerificado] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5019/api/usuario/verifica-sessao', {withCredentials:true})
      .then(() => setUsuarioLogado(true))
      .catch(() => setUsuarioLogado(false))
      .finally(() => setVerificado(true));
  }, []);

  if (!verificado) return <p>Carregando...</p>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sessao/>} />
        <Route path="/login" element={<Login onLogin={() => setUsuarioLogado(true)} />} />
        <Route path="/cadastro" element={<Cadastro onCadastro={() => setUsuarioLogado(true)}/>} />
        {usuarioLogado ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/buscarcarros" element={<BuscarCarro />} />
            <Route path="/listacarros" element={<ListaCarros/>}/>
            <Route path="/criarcarro" element={<CriarCarro/>}/>
            <Route path="/deletarcarro" element={<DeletarCarro/>}/>
            <Route path="/atualizarcarro" element={<AtualizarCarro/>}/>
            <Route path="/compararcarros" element={<CompararCarros/>}/>
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
