import react from "react";
import { useNavigate } from 'react-router-dom';

function Home(){
    const navigate = useNavigate();
    return(
        <div>
            <h1>Home</h1>
            <p>Aqui você poderá comparar carros, para descobrir qual tem mais chance de ganhar em um Corrida e qual tem o melhor Custo Benefício </p>
            <button onClick = {() => navigate('/buscarcarros')} >Procurar um Carro</button>
            <p> </p>
            <button onClick = {() => navigate('/listacarros')}>Listar Carros</button>
            <p> </p>
            <button onClick = {() => navigate('/criarcarro')}>Criar Carro</button>
            <p> </p>
            <button onClick = {() => navigate('/deletarcarro')}>Deletar Carro</button>
            <p> </p>
            <button onClick = {() => navigate('/atualizarcarro')}>Atualizar Carro</button>
            <p> </p>
            <button onClick = {() => navigate('/compararcarros')}>Comparar Carros</button>
        </div>


    );
}
export default Home;