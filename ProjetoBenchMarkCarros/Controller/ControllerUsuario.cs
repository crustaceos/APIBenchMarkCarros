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
    [Route("api/usuario")]
    public class UsuarioController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public UsuarioController (AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            var usuarios = await _appDbContext.Usuarios.ToListAsync();
            return Ok(usuarios);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuarioId(int id)
        {
            var usuario = await _appDbContext.Usuarios.FindAsync(id);
            if(usuario == null){
                return NotFound("Usuario não encontrado");
            }
            return Ok(usuario);
        }

        [HttpPost("cadastro")]
        public async Task<ActionResult<Usuario>> CadastroUsuario([FromBody] Usuario novoUsuario)
        {
            var usuarioExistente = await _appDbContext.Usuarios
                .FirstOrDefaultAsync(u => u.NomeUsuario == novoUsuario.NomeUsuario);

                if (usuarioExistente != null)
                {
                    return BadRequest("Usuário já cadastrado.");
                }

                    _appDbContext.Usuarios.Add(novoUsuario);
                    await _appDbContext.SaveChangesAsync();

                    
                    HttpContext.Session.SetInt32("UsuarioId", novoUsuario.IdUsuario);

                    return Ok("Usuário cadastrado com sucesso.");
        }

        [HttpPost("login")]
        public async Task<ActionResult<Usuario>> LoginUsuario([FromBody] Usuario loginUsuario)
        {
            var usuario = await _appDbContext.Usuarios.FirstOrDefaultAsync(u => u.NomeUsuario == loginUsuario.NomeUsuario && u.SenhaUsuario == loginUsuario.SenhaUsuario);

            if(usuario == null){
                return Unauthorized("Usúario ou senha inválidos.");
            }

            HttpContext.Session.SetInt32("UsuarioId", usuario.IdUsuario);

            return Ok(new { mensagem = "Login realizado com sucesso.", usuarioId = usuario.IdUsuario });
        }

        [HttpGet("verifica-sessao")]
       public IActionResult VerificaSessao()
       {
            var usuarioId = HttpContext.Session.GetInt32("UsuarioId");

            if (usuarioId == null){
                    return Unauthorized("Usuário não está logado.");
            }

            return Ok($"Usuário logado com ID: {usuarioId}");
}
        

    }
}