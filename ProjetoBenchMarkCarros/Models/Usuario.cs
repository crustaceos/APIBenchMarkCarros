using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoBenchMarkCarros.Models
{
    public class Usuario
    {
        [Key]
        public int IdUsuario { get; set;}
        [Required]
        public string? NomeUsuario { get; set; }
        [Required]
        public string? SenhaUsuario {get; set; }
    }
}