using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoBenchMarkCarros.Models
{
    public class Carro

    {
        public string Marca { get; set; }
        public string Nome { get; set; }
        public int Ano { get; set; }
        public decimal Valor { get; set; }
        public int PotenciaCV { get; set; }
        public float? ConsumoKmL { get; set; }
        public int Portas { get; set; }

    }
}