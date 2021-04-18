using Microsoft.Extensions.Logging;
using SeoChecker.Common.Enums;
using SeoChecker.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace SeoChecker.Common.Entities
{
    public class BingEngine : ISearchEngine
    {
        public const string _matchingPattern = @"<li class=""b_algo"">.+?</li>";

        public NamedEngine Name => NamedEngine.Bing;

        private readonly ILogger<BingEngine> _logger;

        public BingEngine(ILogger<BingEngine> logger)
        {
            _logger = logger;
        }

        public IEnumerable<int> GetPositions(string response, string url)
        {
            Regex regex = new Regex(_matchingPattern);
            var searchResults = regex.Matches(response).ToList();

            var positions = searchResults
                .Where(x => x.Value.Contains(url))
                .Select(x => searchResults.IndexOf(x) + 1)
                .ToList();

            _logger.LogInformation($"Positions of {url} for {Name}: {JsonSerializer.Serialize(positions)}");
            return positions;
        }

        public string GetQuery(string keyword, int numResults)
        {
            return $"https://www.bing.com/search?q={keyword}&count={numResults}";
        }
    }
}
