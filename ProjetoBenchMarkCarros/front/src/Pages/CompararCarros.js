import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CompararCarros() {
  const [nomeCarro1, setNomeCarro1] = useState('');
  const [nomeCarro2, setNomeCarro2] = useState('');
  const [resultado, setResultado] = useState(null);
  const [dadosCarro1, setDadosCarro1] = useState(null);
  const [dadosCarro2, setDadosCarro2] = useState(null);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const buscarCarro = async (nome) => {
    const response = await axios.get(`http://localhost:5019/api/carros/${nome}`);
    return response.data;
  };

  const compararCarros = async () => {
    if (!nomeCarro1 || !nomeCarro2) {
      setErro('Informe os nomes dos dois carros para comparar.');
      setResultado(null);
      setDadosCarro1(null);
      setDadosCarro2(null);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5019/api/carros/comparar`, {
        params: {
          nome1: nomeCarro1,
          nome2: nomeCarro2
        }
      });

      setResultado(response.data);
      setErro('');

      const carro1 = await buscarCarro(nomeCarro1);
      const carro2 = await buscarCarro(nomeCarro2);

      setDadosCarro1(carro1);
      setDadosCarro2(carro2);
    } catch (error) {
      setResultado(null);
      setDadosCarro1(null);
      setDadosCarro2(null);
      setErro('Um dos carros não foi encontrado.');
    } finally {
      setLoading(false);
    }
  };

  const voltarHome = () => navigate('/home');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fff' }}>
      <div style={{ width: '60px', backgroundColor: '#2196f3' }}></div>

      <div style={{ flex: 1, padding: '20px', color: '#000' }}>
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
            color: 'white'
          }}
        >
          Home
        </button>

        <h2 style={{ color: '#0D47A1', marginBottom: '20px' }}>Comparar Carros</h2>

        <input
          type="text"
          placeholder="Nome do Carro 1"
          value={nomeCarro1}
          onChange={(e) => setNomeCarro1(e.target.value)}
          style={{
            marginRight: '10px',
            padding: '8px',
            maxWidth: '200px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '14px'
          }}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Nome do Carro 2"
          value={nomeCarro2}
          onChange={(e) => setNomeCarro2(e.target.value)}
          style={{
            padding: '8px',
            maxWidth: '200px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '14px'
          }}
          disabled={loading}
        />
        <button
          onClick={compararCarros}
          disabled={loading}
          style={{
            marginLeft: '10px',
            padding: '8px 16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            backgroundColor: loading ? '#94d3a2' : '#28a745',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Comparando...' : 'Comparar'}
        </button>

        {erro && (
          <p style={{ color: 'red', marginTop: '15px', fontWeight: 'bold' }}>
            {erro}
          </p>
        )}

        {resultado && dadosCarro1 && dadosCarro2 && (
          <div style={{ marginTop: '30px' }}>
            <h3 style={{ color: '#0D47A1', marginBottom: '15px' }}>Resultado da Comparação</h3>
            <p><strong>Carro 1:</strong> {resultado.carro1}</p>
            <p><strong>Carro 2:</strong> {resultado.carro2}</p>
            <p><strong>Vencedor da Corrida:</strong> {resultado.vencedorCorrida}</p>
            <p><strong>Melhor Custo-Benefício:</strong> {resultado.melhorCustoBeneficio}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 45%', border: '1px solid gray', padding: '10px', borderRadius: '6px' }}>
                <h4 style={{ color: '#0D47A1', marginBottom: '10px' }}>Custo-Benefício</h4>

                <div>
                  <h5>{dadosCarro1.nomeCarro}</h5>
                  <p><strong>Marca:</strong> {dadosCarro1.marca}</p>
                  <p><strong>Consumo:</strong> {dadosCarro1.consumoKmL} km/L</p>
                  <p><strong>Valor:</strong> R$ {dadosCarro1.valor}</p>
                  <p><strong>Ano:</strong> {dadosCarro1.ano}</p>
                  <img
                    src={dadosCarro1.imagem}
                    alt={`Imagem do ${dadosCarro1.nomeCarro}`}
                    width="300"
                    style={{ borderRadius: '4px', marginTop: '10px' }}
                  />
                </div>

                <hr style={{ margin: '20px 0' }} />

                <div>
                  <h5>{dadosCarro2.nomeCarro}</h5>
                  <p><strong>Marca:</strong> {dadosCarro2.marca}</p>
                  <p><strong>Consumo:</strong> {dadosCarro2.consumoKmL} km/L</p>
                  <p><strong>Valor:</strong> R$ {dadosCarro2.valor}</p>
                  <p><strong>Ano:</strong> {dadosCarro2.ano}</p>
                  <img
                    src={dadosCarro2.imagem}
                    alt={`Imagem do ${dadosCarro2.nomeCarro}`}
                    width="300"
                    style={{ borderRadius: '4px', marginTop: '10px' }}
                  />
                </div>
              </div>

              <div style={{ flex: '1 1 45%', border: '1px solid gray', padding: '10px', borderRadius: '6px' }}>
                <h4 style={{ color: '#0D47A1', marginBottom: '10px' }}>Desempenho na Corrida</h4>

                <div>
                  <h5>{dadosCarro1.nomeCarro}</h5>
                  <p><strong>Marca:</strong> {dadosCarro1.marca}</p>
                  <p><strong>Cilindrada:</strong> {dadosCarro1.cilindrada}</p>
                  <p><strong>Torque:</strong> {dadosCarro1.torqueKgfm}</p>
                  <p><strong>RPM:</strong> {dadosCarro1.rpm}</p>
                  <p><strong>Potência:</strong> {dadosCarro1.potenciaCV} CV</p>
                  <p><strong>Aceleração:</strong> {dadosCarro1.aceleracao} s</p>
                  <img
                    src={dadosCarro1.imagem}
                    alt={`Imagem do ${dadosCarro1.nomeCarro}`}
                    width="300"
                    style={{ borderRadius: '4px', marginTop: '10px' }}
                  />
                </div>

                <hr style={{ margin: '20px 0' }} />

                <div>
                  <h5>{dadosCarro2.nomeCarro}</h5>
                  <p><strong>Marca:</strong> {dadosCarro2.marca}</p>
                  <p><strong>Cilindrada:</strong> {dadosCarro2.cilindrada}</p>
                  <p><strong>Torque:</strong> {dadosCarro2.torqueKgfm}</p>
                  <p><strong>RPM:</strong> {dadosCarro2.rpm}</p>
                  <p><strong>Potência:</strong> {dadosCarro2.potenciaCV} CV</p>
                  <p><strong>Aceleração:</strong> {dadosCarro2.aceleracao} s</p>
                  <img
                    src={dadosCarro2.imagem}
                    alt={`Imagem do ${dadosCarro2.nomeCarro}`}
                    width="300"
                    style={{ borderRadius: '4px', marginTop: '10px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ width: '60px', backgroundColor: '#2196f3' }}></div>
    </div>
  );
}

export default CompararCarros;

