using Microsoft.Extensions.Logging;
using SeoChecker.Common.Enums;
using SeoChecker.Common.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace SeoChecker.Common.Entities
{
    public class GoogleEngine : ISearchEngine
    {
        private const string _matchingPattern = @"<div class=""ZINbbc xpd O9g5cc uUPGi""><div class=""kCrYT"">.+?\<\/div>";
        
        public NamedEngine Name => NamedEngine.Google;

        private readonly ILogger<GoogleEngine> _logger;
       
        public GoogleEngine(ILogger<GoogleEngine> logger)
        {
            _logger = logger;
        }

        public string GetQuery(string keyword, int numResults)
        {
            return $"https://www.google.com/search?q={keyword}&num={numResults}";
        }

        public IEnumerable<int> GetPositions(string response, string url)
        {
            Regex regex = new Regex(_matchingPattern);
            var searchResults = regex.Matches(response).ToList();

            var positions = searchResults
                .Where(x => x.Value.Contains(url))
                .Select(x => searchResults.IndexOf(x))
                .ToList();

            _logger.LogInformation($"Positions of {url} for {Name}: {JsonSerializer.Serialize(positions)}");
            return positions;
        }
    }
}
