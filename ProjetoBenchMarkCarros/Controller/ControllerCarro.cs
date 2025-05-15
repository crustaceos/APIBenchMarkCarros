using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetoBenchMarkCarros.Data;
using ProjetoBenchMarkCarros.Models;

namespace ProjetoBenchMarkCarros.Controller
{
    [ApiController]
    [Route("api/carros")]
    public class CarroController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public CarroController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Carro>>> GetCarros()
        {
            var carros = await _appDbContext.Carros.ToListAsync();
            return Ok(carros);
        }

        [HttpGet("{nomeCarro}")]
        public async Task<ActionResult<Carro>> GetCarro(string nomeCarro)
        {
           var carro = await _appDbContext.Carros.FirstOrDefaultAsync(c => c.NomeCarro == nomeCarro);
                if (carro == null)
                {
                    return NotFound("Carro não encontrado.");
                }
                return Ok(carro);
        }

        [HttpPost]
        public async Task<ActionResult<Carro>> PostCarro([FromBody]Carro novoCarroDto)
        {
                 var usuarioId = HttpContext.Session.GetInt32("UsuarioId");
             if (usuarioId == null)
             {
                 return Unauthorized("Usuário não logado.");
             }
                    var novoCarro = new Carro
                    {
                        Marca = novoCarroDto.Marca,
                        NomeCarro = novoCarroDto.NomeCarro,
                        TipoModelo = novoCarroDto.TipoModelo,
                        Imagem = novoCarroDto.Imagem,
                        Cilindrada = novoCarroDto.Cilindrada,
                        TorqueKgfm = novoCarroDto.TorqueKgfm,
                        Rpm = novoCarroDto.Rpm,
                        Ano = novoCarroDto.Ano,
                        Valor = novoCarroDto.Valor,
                        PotenciaCV = novoCarroDto.PotenciaCV,
                        ConsumoKmL = novoCarroDto.ConsumoKmL,
                        Aceleracao = novoCarroDto.Aceleracao,
                        UsuarioId = usuarioId.Value
                    };

            _appDbContext.Carros.Add(novoCarro);
            await _appDbContext.SaveChangesAsync();

            return Ok(novoCarro);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCarro(int id, [FromBody] Carro carroAtualizado)
        {
            var carroExistente = await _appDbContext.Carros.FindAsync(id);
            if (carroExistente == null)
            {
                return NotFound("Carro não encontrado.");
            }

            _appDbContext.Entry(carroExistente).CurrentValues.SetValues(carroAtualizado);
            await _appDbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCarro(int id)
        {
            var carro = await _appDbContext.Carros.FindAsync(id);
            if (carro == null)
            {
                return NotFound("Carro não encontrado.");
            }

            _appDbContext.Carros.Remove(carro);
            await _appDbContext.SaveChangesAsync();

            return Ok("Carro deletado com sucesso!");
        }
    }
}