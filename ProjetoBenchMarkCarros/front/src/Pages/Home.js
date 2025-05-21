import react from "react";
import { useNavigate } from 'react-router-dom';

function Home(){
    const navigate = useNavigate();
    return(
        <div>
            <h1>Home</h1>
            <p>Aqui você poderá comparar carros, para descobrir qual tem mais chance de ganhar em um Corrida e qual tem o melhor Custo Benefício </p>
            <button onClick = {() => navigate('/buscarcarros')} >Procurar um Carro</button>
        </div>


    );
}
export default Home;