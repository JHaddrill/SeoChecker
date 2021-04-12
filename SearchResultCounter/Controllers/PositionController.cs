using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SearchResultCounter.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PositionController : ControllerBase
    {
        public IActionResult Index()
        {

            return Ok();
        }
    }
}
