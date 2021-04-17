using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SeoChecker.Common.Enums;
using SeoChecker.Common.Interfaces;
using SeoChecker.Common.Models;
using System;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace SeoChecker.Common.Services
{
    public class SeoCheckerService : ISeoCheckerService
    {
        private readonly ILogger<SeoCheckerService> _logger;
        private readonly IServiceProvider _serviceProvider;
        private readonly IHttpHandler _httpHandler;
        private readonly ICacheService _cache;

        public SeoCheckerService(IServiceProvider provider, ILogger<SeoCheckerService> logger, ICacheService cache, IHttpHandler httpHandler)
        {
            _logger = logger;
            _cache = cache;
            _httpHandler = httpHandler;
            _serviceProvider = provider;
        }

        public async Task<SeoCheckResponse> GetPositionsForSearchEngine(SeoCheckRequest request)
        {
            var cacheResponse = _cache.Get<SeoCheckResponse>(request);
            if (cacheResponse != null) return cacheResponse;

            ISearchEngine searchEngine = GetSearchEngine(request.SearchEngine);

            string query = searchEngine.GetQuery(request.Keyword, 100); // Update to be config item or request param

            var httpResult = await _httpHandler.GetWebpageAsStringAsync(query);

            var positions = searchEngine.GetPositions(httpResult, request.Url);

            var response = new SeoCheckResponse
            {
                Keyword = request.Keyword,
                Url = request.Url,
                SearchEngine = searchEngine.Name.ToString(),
                Positions = positions
            };

            _cache.Set(request, response);

            _logger.LogTrace($"Determined Positions: {JsonSerializer.Serialize(response)}");
            return response;
        }

        private ISearchEngine GetSearchEngine(string searchEngineKey)
        {
            Enum.TryParse(searchEngineKey, out NamedEngine engine);
            return _serviceProvider.GetServices<ISearchEngine>()
                .First(x => x.Name.Equals(engine));
        }
    }
}
