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

        [HttpGet("listarCarros")]
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

        [HttpPost("criarCarro")]
        public async Task<ActionResult<Carro>> PostCarro([FromBody] Carro novoCarroDto)
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


            var usuarioIdSessao = HttpContext.Session.GetInt32("UsuarioId");

            if (usuarioIdSessao == null)
            {
                return Unauthorized("Usuário não está logado.");
            }


            if (carroExistente.UsuarioId != usuarioIdSessao)
            {
                return Forbid("Você não tem permissão para editar este carro.");
            }


            _appDbContext.Entry(carroExistente).CurrentValues.SetValues(carroAtualizado);


            carroExistente.UsuarioId = usuarioIdSessao.Value;

            await _appDbContext.SaveChangesAsync();

            return NoContent();
        }


        [HttpDelete("deletarCarro/{id}")]
        public async Task<IActionResult> DeleteCarro(int id)
        {
            var carroExistente = await _appDbContext.Carros.FindAsync(id);
            if (carroExistente == null)
            {
                return NotFound("Carro não encontrado.");
            }

            var usuarioIdSessao = HttpContext.Session.GetInt32("UsuarioId");

            if (usuarioIdSessao == null)
            {
                return Unauthorized("Usuário não está logado");
            }

            if (carroExistente.UsuarioId != usuarioIdSessao)
            {
                return Unauthorized("Você não tem permissão para deletar esse carro");
            }

            _appDbContext.Carros.Remove(carroExistente);

            carroExistente.UsuarioId = usuarioIdSessao.Value;

            await _appDbContext.SaveChangesAsync();

            return Ok("Carro deletado com sucesso!");
        }


        [HttpGet("comparar")]
        public async Task<IActionResult> CompararCarros([FromQuery] string nome1, [FromQuery] string nome2)
        {
            var carro1 = await _appDbContext.Carros.FirstOrDefaultAsync(c => c.NomeCarro == nome1);
            var carro2 = await _appDbContext.Carros.FirstOrDefaultAsync(c => c.NomeCarro == nome2);

            if (carro1 == null || carro2 == null)
            {
                return NotFound("Um dos carros não foi encontrado");
            }

            //Aqui to criando um indice que baseado em um peso q eu coloquei (por exemplo, potencia tem peso de 30% no indice) e compara ele entre os dois carros, oq for maior ganha
            double indicePerformance(Carro c) =>
                (c.TorqueKgfm * 0.2) +
                (c.Rpm * 0.1) +
                (c.PotenciaCV * 0.3) +
                (c.Cilindrada * 0.2) +
                //aqui ele divide a aceleração por um, depois multiplca por 10, ent, quanto menor a aceleração, maior o resultado, e vice versa
                (1.0 / c.Aceleracao * 10);

            //Aqui ele faz a mesma coisa q o indice de performance, mas ele subtrai do indice o valor do carro, pq quanto maior, pior 
            double indiceCustoBeneficio(Carro c) =>
                (c.ConsumoKmL * 0.5) -
                (Convert.ToDouble(c.Valor) * 0.0001) +
                (c.Ano * 0.1);

            var desempenho1 = indicePerformance(carro1);
            var desempenho2 = indicePerformance(carro2);

            var custo1 = indiceCustoBeneficio(carro1);
            var custo2 = indiceCustoBeneficio(carro2);

            var vencedorCorrida = desempenho1 > desempenho2 ? carro1 : carro2;
            var melhorCustoBeneficio = custo1 > custo2 ? carro1 : carro2;

            return Ok(new
            {
                Carro1 = carro1.NomeCarro,
                Carro2 = carro2.NomeCarro,
                VencedorCorrida = vencedorCorrida.NomeCarro,
                MelhorCustoBeneficio = melhorCustoBeneficio.NomeCarro
            });
        }
            

                        [HttpGet("listarCarrosUsuario")]
            public async Task<IActionResult> ListarCarrosUsuario()
            {
                var usuarioId = HttpContext.Session.GetInt32("UsuarioId");
                if (usuarioId == null)
                {
                    return Unauthorized("Usuário não logado.");
                }

                var carrosDoUsuario = await _appDbContext.Carros
                    .Where(c => c.UsuarioId == usuarioId)
                    .ToListAsync();

                return Ok(carrosDoUsuario);
            }

    }
}