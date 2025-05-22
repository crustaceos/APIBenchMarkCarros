import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        console.log("Enviando:", carroSemUsuario);

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
    <div style={{ padding: '20px' }}>
      <button onClick={voltarHome}>Home</button>
      <h2>Atualizar Carros</h2>
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
          <h3>Editando: {carroSelecionado.nomeCarro}</h3>
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
                            marginTop: '20px',
                        }}
                        >
                        <div>
                            <label>Nome do Carro</label>
                            <input type="text" name="nomeCarro" value={carroSelecionado.nomeCarro} onChange={setarCarro} required />
                        </div>

                        <div>
                            <label>Marca</label>
                            <input type="text" name="marca" value={carroSelecionado.marca} onChange={setarCarro} required />
                        </div>

                        <div>
                            <label>Tipo do Modelo</label>
                            <input type="text" name="tipoModelo" value={carroSelecionado.tipoModelo} onChange={setarCarro} />
                        </div>

                        <div>
                            <label>Ano</label>
                            <input type="number" name="ano" value={carroSelecionado.ano} onChange={setarCarro} />
                        </div>

                        <div>
                            <label>Valor</label>
                            <input type="number" name="valor" value={carroSelecionado.valor} onChange={setarCarro} />
                        </div>

                        <div>
                            <label>Potência (CV)</label>
                            <input type="number" name="potenciaCV" value={carroSelecionado.potenciaCV} onChange={setarCarro} />
                        </div>

                        <div>
                            <label>Cilindrada</label>
                            <input type="number" name="cilindrada" value={carroSelecionado.cilindrada} onChange={setarCarro} />
                        </div>

                        <div>
                            <label>Torque (Kgfm)</label>
                            <input type="number" name="torqueKgfm" value={carroSelecionado.torqueKgfm} onChange={setarCarro} />
                        </div>

                        <div>
                            <label>Consumo (km/L)</label>
                            <input type="text" name="consumoKmL" value={carroSelecionado.consumoKmL} onChange={setarCarro} />
                        </div>

                        <div>
                            <label>RPM</label>
                            <input type="text" name="rpm" value={carroSelecionado.rpm} onChange={setarCarro} />
                        </div>

                        <div style={{ gridColumn: '1 / -1' }}>
                            <label>URL da Imagem</label>
                            <input type="text" name="imagem" value={carroSelecionado.imagem} onChange={setarCarro} />
                        </div>

                        <div style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                            <button type="submit">Salvar</button>
                            <button type="button" onClick={() => setCarroSelecionado(null)} style={{ marginLeft: '10px' }}>Cancelar</button>
                        </div>
                        </form>

        </div>
      )}
    </div>
  );
}

export default AtualizarCarros;
