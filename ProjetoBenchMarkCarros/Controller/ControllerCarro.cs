using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProjetoBenchMarkCarros.Data;

namespace ProjetoBenchMarkCarros.Controller
{
    [ApiController]
    [Route("api/carros")]
    public class CarroController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public CarroController (AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }


    }
}