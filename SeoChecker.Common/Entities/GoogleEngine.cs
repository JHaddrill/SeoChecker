using Microsoft.Extensions.Logging;
using SeoChecker.Common.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SeoChecker.Common.Entities
{
    public class GoogleEngine : ISearchEngine
    {
        private const string _matchingPattern = @"<div class=""ZINbbc xpd O9g5cc uUPGi""><div class=""kCrYT"">.+?\<\/div>";

        private readonly ILogger<GoogleEngine> _logger;
        private readonly IHttpClientFactory _clientFactory;

        public string Name => "Google";

        public GoogleEngine(ILogger<GoogleEngine> logger, IHttpClientFactory clientFactory)
        {
            _logger = logger;
            _clientFactory = clientFactory;
        }


        public async Task<IEnumerable<int>> GetPositionsOfUrl(string keyword, string url)
        {
            string httpResult = "";
            using (var client = _clientFactory.CreateClient())
            {
                var result = await client.GetAsync($"https://www.google.com/search?q={keyword}&num=100");
                if (result.IsSuccessStatusCode)
                {
                    httpResult = await result.Content.ReadAsStringAsync();
                }
            }

            Regex regex = new Regex(_matchingPattern);
            var searchResults = regex.Matches(httpResult).ToList();
            
            var list = searchResults
                .Where(x => x.Value.Contains(url))
                .Select(x => searchResults.IndexOf(x))
                .ToList();

            _logger.LogInformation($"Found {list.Count} matches for '{url}' using keyword: '{keyword}'");
            return list;
        }
    }
}
