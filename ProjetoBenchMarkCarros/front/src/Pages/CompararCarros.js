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

  const navigate = useNavigate();

  const buscarCarro = async (nome) => {
    const response = await axios.get(`http://localhost:5019/api/carros/${nome}`);
    return response.data;
  };

  const compararCarros = async () => {
    try {
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
    }
  };

  const voltarHome = () => navigate('/home');

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={voltarHome}>Home</button>
      <h2>Comparar Carros</h2>

      <input
        type="text"
        placeholder="Nome do Carro 1"
        value={nomeCarro1}
        onChange={(e) => setNomeCarro1(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <input
        type="text"
        placeholder="Nome do Carro 2"
        value={nomeCarro2}
        onChange={(e) => setNomeCarro2(e.target.value)}
      />
      <button onClick={compararCarros} style={{ marginLeft: '10px' }}>
        Comparar
      </button>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {resultado && dadosCarro1 && dadosCarro2 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Resultado da Comparação</h3>
          <p><strong>Carro 1:</strong> {resultado.carro1}</p>
          <p><strong>Carro 2:</strong> {resultado.carro2}</p>
          <p><strong>Vencedor da Corrida:</strong> {resultado.vencedorCorrida}</p>
          <p><strong>Melhor Custo-Benefício:</strong> {resultado.melhorCustoBeneficio}</p>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
            {/* Custo Benefício */}
            <div style={{ width: '45%', border: '1px solid gray', padding: '10px' }}>
              <h4>Custo-Benefício</h4>

              <div>
                <h5>{dadosCarro1.nomeCarro}</h5>
                <p><strong>Marca:</strong> {dadosCarro1.marca}</p>
                <p><strong>Consumo:</strong> {dadosCarro1.consumoKmL} km/L</p>
                <p><strong>Valor:</strong> R$ {dadosCarro1.valor}</p>
                <p><strong>Ano:</strong> {dadosCarro1.ano}</p>
                <img src={dadosCarro1.imagem} alt="Imagem do carro" width="300" />
              </div>

              <hr />

              <div>
                <h5>{dadosCarro2.nomeCarro}</h5>
                <p><strong>Marca:</strong> {dadosCarro2.marca}</p>
                <p><strong>Consumo:</strong> {dadosCarro2.consumoKmL} km/L</p>
                <p><strong>Valor:</strong> R$ {dadosCarro2.valor}</p>
                <p><strong>Ano:</strong> {dadosCarro2.ano}</p>
                <img src={dadosCarro2.imagem} alt="Imagem do carro" width="300" />
              </div>
            </div>

            {/* Corrida */}
            <div style={{ width: '45%', border: '1px solid gray', padding: '10px' }}>
              <h4>Desempenho na Corrida</h4>

              <div>
                <h5>{dadosCarro1.nomeCarro}</h5>
                <p><strong>Marca:</strong> {dadosCarro1.marca}</p>
                <p><strong>Cilindrada:</strong> {dadosCarro1.cilindrada}</p>
                <p><strong>Torque:</strong> {dadosCarro1.torqueKgfm}</p>
                <p><strong>RPM:</strong> {dadosCarro1.rpm}</p>
                <p><strong>Potência:</strong> {dadosCarro1.potenciaCV} CV</p>
                <p><strong>Aceleração:</strong> {dadosCarro1.aceleracao} s</p>
                <img src={dadosCarro1.imagem} alt="Imagem do carro" width="300" />
              </div>

              <hr />

              <div>
                <h5>{dadosCarro2.nomeCarro}</h5>
                <p><strong>Marca:</strong> {dadosCarro2.marca}</p>
                <p><strong>Cilindrada:</strong> {dadosCarro2.cilindrada}</p>
                <p><strong>Torque:</strong> {dadosCarro2.torqueKgfm}</p>
                <p><strong>RPM:</strong> {dadosCarro2.rpm}</p>
                <p><strong>Potência:</strong> {dadosCarro2.potenciaCV} CV</p>
                <p><strong>Aceleração:</strong> {dadosCarro2.aceleracao} s</p>
                <img src={dadosCarro2.imagem} alt="Imagem do carro" width="300" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompararCarros;
