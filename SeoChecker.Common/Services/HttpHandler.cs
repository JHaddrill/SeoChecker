using Microsoft.Extensions.Logging;
using SeoChecker.Common.Interfaces;
using System.Net.Http;
using System.Threading.Tasks;

namespace SeoChecker.Common.Services
{
    /// <summary>
    /// Concrete implementation of <see cref="IHttpHandler"/>
    /// Retrieves webpages via HTTP
    /// </summary>
    public class HttpHandler : IHttpHandler
    {
        private readonly ILogger<HttpHandler> _logger;
        private readonly IHttpClientFactory _clientFactory;

        public HttpHandler(ILogger<HttpHandler> logger, IHttpClientFactory clientFactory)
        {
            _logger = logger;
            _clientFactory = clientFactory;
        }

        public async Task<string> GetWebpageAsStringAsync(string query)
        {
            string webpage = string.Empty;
            using (var client = _clientFactory.CreateClient("SeacrhClient"))
            {
                _logger.LogTrace($"Sending GET Request: {query}");
                var result = await client.GetAsync(query);
                if (result.IsSuccessStatusCode)
                {
                    _logger.LogTrace($"Recieved successful response from {query}");
                    webpage = await result.Content.ReadAsStringAsync();
                }
                else
                {
                    _logger.LogTrace($"Unable to retrieve webpage from {query}");
                }
            }
            return webpage;
        }
    }
}
