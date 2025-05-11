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

        [HttpGet("{id}")]
        public async Task<ActionResult<Carro>> GetCarro(int id)
        {
            var carro = await _appDbContext.Carros.FindAsync(id);
            if (carro == null)
            {
                return NotFound("Carro não encontrado.");
            }
            return Ok(carro);
        }

        [HttpPost]
        public async Task<ActionResult<Carro>> PostCarro(Carro carro)
        {
            _appDbContext.Carros.Add(carro);
            await _appDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCarro), new { id = carro.IdCarro }, carro);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCarro(int id, Carro carroAtualizado)
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