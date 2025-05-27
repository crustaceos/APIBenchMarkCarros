import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PilarAzul() {
  return <div style={{ width: '60px', backgroundColor: '#2196f3' }}></div>;
}

function AtualizarCarros() {
  const [carros, setCarros] = useState([]);
  const [carroSelecionado, setCarroSelecionado] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5019/api/carros/listarCarrosUsuario', { withCredentials: true })
      .then(response => setCarros(response.data))
      .catch(() => setMensagem('Erro ao carregar carros do usuário.'));
  }, []);

  const selecionarCarro = (carro) => {
    setCarroSelecionado({ ...carro });
  };

  const setarCarro = (e) => {
    const { name, value } = e.target;
    setCarroSelecionado(prev => ({ ...prev, [name]: value }));
  };

  const atualizarCarro = async () => {
    try {
      const carroSemUsuario = { ...carroSelecionado };
      delete carroSemUsuario.usuario;

      await axios.put(`http://localhost:5019/api/carros/atualizarCarro/${carroSelecionado.idCarro}`, carroSemUsuario, {
        withCredentials: true
      });

      setMensagem('Carro atualizado com sucesso!');
      setCarros(prev => prev.map(c => c.idCarro === carroSelecionado.idCarro ? carroSelecionado : c));
      setCarroSelecionado(null);
    } catch (error) {
      const msg = error.response?.data || 'Erro ao atualizar o carro.';
      setMensagem(typeof msg === 'string' ? msg : JSON.stringify(msg));
    }
  };

  const voltarHome = () => navigate('/home');

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#fff'
    }}>
      <PilarAzul />
      <div style={{ flex: 1, padding: '20px', color: '#000' }}>
        <button onClick={voltarHome}>Home</button>
        <h2 style={{ color: '#0D47A1' }}>Atualizar Carros</h2>
        {mensagem && <p>{mensagem}</p>}

        {!carroSelecionado ? (
          <>
            {carros.length === 0 ? (
              <p>Você não possui carros cadastrados.</p>
            ) : (
              <ul>
                {carros.map(carro => (
                  <li key={carro.idCarro}>
                    <strong>{carro.nomeCarro}</strong> — {carro.marca}
                    <button onClick={() => selecionarCarro(carro)} style={{ marginLeft: '10px' }}>
                      Editar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <div>
            <h3 style={{ color: '#0D47A1' }}>Editando: {carroSelecionado.nomeCarro}</h3>
            <form
              onSubmit={e => {
                e.preventDefault();
                atualizarCarro();
              }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                maxWidth: '800px',
                marginTop: '20px'
              }}
            >
              {[
                { label: 'Nome do Carro', name: 'nomeCarro' },
                { label: 'Marca', name: 'marca' },
                { label: 'Tipo do Modelo', name: 'tipoModelo' },
                { label: 'Ano', name: 'ano', type: 'number' },
                { label: 'Valor', name: 'valor', type: 'number' },
                { label: 'Potência (CV)', name: 'potenciaCV', type: 'number' },
                { label: 'Cilindrada', name: 'cilindrada', type: 'number' },
                { label: 'Torque (Kgfm)', name: 'torqueKgfm', type: 'number' },
                { label: 'Consumo (km/L)', name: 'consumoKmL' },
                { label: 'RPM', name: 'rpm' },
              ].map(({ label, name, type = 'text' }) => (
                <div key={name}>
                  <label>{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={carroSelecionado[name]}
                    onChange={setarCarro}
                    required
                  />
                </div>
              ))}

              <div style={{ gridColumn: '1 / -1' }}>
                <label>URL da Imagem</label>
                <input
                  type="text"
                  name="imagem"
                  value={carroSelecionado.imagem}
                  onChange={setarCarro}
                />
              </div>

              <div style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setCarroSelecionado(null)} style={{ marginLeft: '10px' }}>Cancelar</button>
              </div>
            </form>
          </div>
        )}
      </div>
      <PilarAzul />
    </div>
  );
}

export default AtualizarCarros;
