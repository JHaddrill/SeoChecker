using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SeoChecker.Common.Interfaces;
using SeoChecker.Common.Models;
using System.Text.Json;
using System.Threading.Tasks;

namespace SeoChecker.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SeoCheckController : ControllerBase
    {
        private readonly ILogger<SeoCheckController> _logger;
        private readonly ICacheService _cache;
        private readonly ISeoCheckerService _seoCheckerService;

        public SeoCheckController(ILogger<SeoCheckController> logger, ISeoCheckerService seoCheckerService, ICacheService cache)
        {
            _logger = logger;
            _seoCheckerService = seoCheckerService;
            _cache = cache;
        }

        [HttpGet]
        public async Task<IActionResult> GetPositionsForUrl([FromQuery] SeoCheckRequest request)
        {
            _logger.LogTrace($"Begin GetPositionsForUrl: {JsonSerializer.Serialize(request)}");
            
            var response = await _seoCheckerService.GetPositionsForSearchEngine(request);

            _logger.LogTrace($"End GetPositionsForUrl: {JsonSerializer.Serialize(response)}");

            return Ok(response);
        }
    }
}
