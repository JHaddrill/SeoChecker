using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SeoChecker.Common.Interfaces;
using SeoChecker.Common.Models;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace SeoChecker.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SeoCheckController : ControllerBase
    {
        private readonly ILogger<SeoCheckController> _logger;
        private readonly ISeoCheckerService _seoCheckerService;

        public SeoCheckController(ILogger<SeoCheckController> logger, ISeoCheckerService seoCheckerService)
        {
            _logger = logger;
            _seoCheckerService = seoCheckerService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPositionsForUrl([FromQuery] SeoCheckRequest request)
        {
            try
            {
                _logger.LogTrace($"Begin GetPositionsForUrl: {JsonSerializer.Serialize(request)}");

                var response = await _seoCheckerService.GetPositionsForSearchEngine(request);

                _logger.LogTrace($"End GetPositionsForUrl: {JsonSerializer.Serialize(response)}");

                return Ok(response);
            } 
            catch (ArgumentNullException ex)
            {
                _logger.LogTrace($"End GetPositionsForUrl, Invalid input: {ex}");
                return BadRequest(ex);
            }
        }
    }
}
