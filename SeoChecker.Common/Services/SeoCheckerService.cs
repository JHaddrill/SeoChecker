using Microsoft.Extensions.Logging;
using SeoChecker.Common.Interfaces;
using SeoChecker.Common.Models;
using System.Text.Json;
using System.Threading.Tasks;

namespace SeoChecker.Common.Services
{
    public class SeoCheckerService : ISeoCheckerService
    {
        private readonly ILogger<SeoCheckerService> _logger;
        private readonly ISearchEngine _searchEngine;
        private readonly IHttpHandler _httpHandler;
        private readonly ICacheService _cache;

        public SeoCheckerService(ILogger<SeoCheckerService> logger, ICacheService cache, IHttpHandler httpHandler, ISearchEngine searchEngine)
        {
            _logger = logger;
            _cache = cache;
            _httpHandler = httpHandler;
            _searchEngine = searchEngine;
        }

        public async Task<SeoCheckResponse> GetPositionsForSearchEngine(SeoCheckRequest request)
        {
            var cacheResponse = _cache.Get<SeoCheckResponse>(request);
            if (cacheResponse != null) return cacheResponse;

            string query = _searchEngine.GetQuery(request.Keyword, 100); // Update to be config item or request param

            var httpResult = await _httpHandler.GetWebpageAsStringAsync(query);

            var positions = _searchEngine.GetPositions(httpResult, request.Url);

            var response = new SeoCheckResponse
            {
                Keyword = request.Keyword,
                Url = request.Url,
                SearchEngine = _searchEngine.Name,
                Positions = positions
            };

            _cache.Set(request, response);

            _logger.LogTrace($"Determined Positions: {JsonSerializer.Serialize(response)}");
            return response;
        }
    }
}
