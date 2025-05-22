import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeletarCarros() {
  const [carros, setCarros] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5019/api/carros/listarCarrosUsuario', { withCredentials: true })
      .then(response => setCarros(response.data))
      .catch(error => {
        const msg = error.response?.data
          ? (typeof error.response.data === 'string'
              ? error.response.data
              : JSON.stringify(error.response.data))
          : 'Erro ao carregar carros.';
        setMensagem(msg);
      });
  }, []);

  const deletarCarro = async (idCarro) => {
    console.log("Deletando carro com id:", idCarro);
    try {
      await axios.delete(`http://localhost:5019/api/carros/deletarCarro/${idCarro}`, { withCredentials: true });
      setMensagem('Carro deletado com sucesso!');
      setCarros(carros.filter(c => c.idCarro !== idCarro));
    } catch (error) {
      const msg = error.response?.data
        ? (typeof error.response.data === 'string'
            ? error.response.data
            : JSON.stringify(error.response.data))
        : 'Erro ao deletar carro.';
      setMensagem(msg);
    }
  };

  const voltarHome = () => navigate('/home');

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={voltarHome}>Home</button>
      <h2>Deletar Carros</h2>
      {mensagem && <p>{mensagem}</p>}
      {carros.length === 0 ? (
        <p>Você não possui carros cadastrados.</p>
      ) : (
        carros.map(carro => (
          <div key={carro.idCarro} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <h3>{carro.nomeCarro}</h3>
            <p><strong>Marca:</strong> {carro.marca}</p>
            <p><strong>ID do Usuário:</strong> {carro.usuarioId}</p>
            {carro.imagem && (
              <img src={carro.imagem} alt={`Imagem de ${carro.nomeCarro}`} width="300" />
            )}
            <br />
            <button onClick={() => deletarCarro(carro.idCarro)}>
              Deletar
            </button>
          </div>  
        ))
      )}
    </div>
  );
}

export default DeletarCarros;
