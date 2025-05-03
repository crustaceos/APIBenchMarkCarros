using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoBenchMarkCarros.Models
{
    public class Carro
    {
      
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public int Ano { get; set; }
        public decimal Valor { get; set; }
        public int PotenciaCV { get; set; }
        public float? ConsumoKmL { get; set; }  

       
        public Carro(string marca, string modelo, int ano, decimal valor, int potenciaCV, float? consumoKmL)
        {
            Marca = marca;
            Modelo = modelo;
            Ano = ano;
            Valor = valor;
            PotenciaCV = potenciaCV;
            ConsumoKmL = consumoKmL;
        }

        
        public void ExibirDetalhes()
        {
            string consumoInfo = ConsumoKmL.HasValue ? $"{ConsumoKmL} km/L" : "N/A"; 
            Console.WriteLine($"Marca: {Marca}");
            Console.WriteLine($"Modelo: {Modelo}");
            Console.WriteLine($"Ano: {Ano}");
            Console.WriteLine($"Valor: R$ {Valor}");
            Console.WriteLine($"Potência: {PotenciaCV} CV");
            Console.WriteLine($"Consumo: {consumoInfo}");
        }  
    }
}