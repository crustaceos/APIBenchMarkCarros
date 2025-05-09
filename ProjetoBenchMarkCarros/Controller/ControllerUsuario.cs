using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProjetoBenchMarkCarros.Data;

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
    }
}