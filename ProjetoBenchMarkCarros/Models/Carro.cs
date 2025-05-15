using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoBenchMarkCarros.Models
{
    public class Carro

    {
        [Key]
        public int IdCarro { get; set; }
        [Required]
        public string? Marca { get; set; }
        [Required]
        public string? NomeCarro{ get; set; }
        [Required]
        public string? TipoModelo { get; set; } //Se é sedan, hatch, coupé etc.
        [Required]
        public string? Imagem { get; set; } //Vai receber o link da imagem, armazenar no banco, e fazer o front colocar a imagem do link na tela 
        [Required]
        public float Cilindrada { get; set; } //Se o motor é 1.0, 2.0 etc
        [Required]
        public float TorqueKgfm { get; set; }
        [Required]
        public int Rpm { get; set; } //Rotação por minuto
        [Required]
        public int Ano { get; set; }
        [Required]
        public decimal Valor { get; set; }
        [Required]
        public int PotenciaCV { get; set; }
        [Required]
        public float ConsumoKmL { get; set; } //quantos km ele faz por litro
        [Required]
        public float Aceleracao { get; set; } //Aceleração de 0 a 100
        public int UsuarioId { get; set; }
        public Usuario? Usuario { get; set; }

    }
}