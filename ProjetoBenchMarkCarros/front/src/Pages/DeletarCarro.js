import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeletarCarros() {
  const [carros, setCarros] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5019/api/carros/listarCarrosUsuario', { withCredentials: true })
      .then(response => setCarros(response.data))
      .catch(error => {
        const msg = error.response?.data
          ? (typeof error.response.data === 'string'
              ? error.response.data
              : JSON.stringify(error.response.data))
          : 'Erro ao carregar carros.';
        setMensagem(msg);
      })
      .finally(() => setLoading(false));
  }, []);

  const deletarCarro = async (idCarro) => {
    if (!window.confirm('Tem certeza que deseja deletar este carro?')) return;

    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const voltarHome = () => navigate('/home');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ width: '80px', backgroundColor: '#007bff' }}></div>

      <div style={{ flex: 1, maxWidth: '700px', margin: '40px auto', padding: '0 20px' }}>
        <button
          onClick={voltarHome}
          style={{
            marginBottom: '20px',
            padding: '8px 16px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = '#007bff')}
        >
          Home
        </button>

        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Deletar Carros</h2>

        {mensagem && (
          <p
            style={{
              marginBottom: '20px',
              padding: '10px',
              borderRadius: '4px',
              backgroundColor: mensagem.includes('Erro') ? '#f8d7da' : '#d4edda',
              color: mensagem.includes('Erro') ? '#721c24' : '#155724',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {mensagem}
          </p>
        )}

        {loading && <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Carregando...</p>}

        {carros.length === 0 && !loading ? (
          <p style={{ textAlign: 'center', fontSize: '16px' }}>Você não possui carros cadastrados.</p>
        ) : (
          carros.map(carro => (
            <div
              key={carro.idCarro}
              style={{
                marginBottom: '20px',
                padding: '15px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              <h3 style={{ marginTop: 0 }}>{carro.nomeCarro}</h3>
              <p><strong>Marca:</strong> {carro.marca}</p>
              <p><strong>ID do Usuário:</strong> {carro.usuarioId}</p>
              {carro.imagem && (
                <img
                  src={carro.imagem}
                  alt={`Imagem de ${carro.nomeCarro}`}
                  width="300"
                  style={{ display: 'block', marginBottom: '10px', borderRadius: '4px' }}
                />
              )}
              <button
                onClick={() => deletarCarro(carro.idCarro)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Deletar
              </button>
            </div>
          ))
        )}
      </div>

      <div style={{ width: '80px', backgroundColor: '#007bff' }}></div>
    </div>
  );
}

export default DeletarCarros;
