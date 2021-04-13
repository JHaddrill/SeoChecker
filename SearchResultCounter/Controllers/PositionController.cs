using Microsoft.AspNetCore.Mvc;
using SeoChecker.Common.Interfaces;
using SeoChecker.Common.Models;
using System.Threading.Tasks;

namespace SeoChecker.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PositionController : ControllerBase
    {
        private readonly ISearchEngine _searchEngine;

        public PositionController(ISearchEngine searchEngine)
        {
            _searchEngine = searchEngine;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] SeoCheckRequest request)
        {
            var positions = await _searchEngine.GetPositionsOfUrl(request.Keyword, request.Url);

            var res = new SeoCheckResponse
            {
                Keyword = request.Keyword,
                Url = request.Url,
                SearchEngine = _searchEngine.Name,
                Positions = positions
            };
            return Ok(res);
        }
    }
}
