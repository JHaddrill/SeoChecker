using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using SeoChecker.Common.Interfaces;
using SeoChecker.Common.Models;
using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace SeoChecker.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PositionController : ControllerBase
    {
        private readonly ILogger<PositionController> _logger;
        private readonly IMemoryCache _cache;
        private readonly ISearchEngine _searchEngine;
        private readonly IHttpClientFactory _clientFactory;

        public PositionController(ILogger<PositionController> logger, IHttpClientFactory clientFactory, IMemoryCache cache, ISearchEngine searchEngine)
        {
            _logger = logger;
            _clientFactory = clientFactory;
            _searchEngine = searchEngine;
            _cache = cache;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] SeoCheckRequest request)
        {
            string httpResult = string.Empty;
            string query = _searchEngine.GetQuery(request.Keyword, 100); // Update to be config item or request param
            
            _cache.TryGetValue(JsonSerializer.Serialize(request), out SeoCheckResponse response);
            if (response != null) return Ok(response);

            _logger.LogInformation($"Query: {query}");

            using (var client = _clientFactory.CreateClient())
            {
                var result = await client.GetAsync(query);
                if (result.IsSuccessStatusCode)
                {
                    _logger.LogInformation($"Recieved successful response from {query}");
                    httpResult = await result.Content.ReadAsStringAsync();
                }
                else
                {
                    _logger.LogInformation($"Recieved error response from {query}, Response: {result.StatusCode}");
                    return NotFound("Unable to retrieve a result for the provided request");
                }
            }

            var positions = _searchEngine.GetPositions(httpResult, request.Url);

            var res = new SeoCheckResponse
            {
                Keyword = request.Keyword,
                Url = request.Url,
                SearchEngine = _searchEngine.Name,
                Positions = positions
            };

            _logger.LogInformation($"Returned successful response: {JsonSerializer.Serialize(res)}");
            
            _cache.Set(JsonSerializer.Serialize(request), res, TimeSpan.FromHours(1));

            return Ok(res);
        }
    }
}
