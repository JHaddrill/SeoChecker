using SeoChecker.Common.Enums;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace SeoChecker.Common.Interfaces
{
    public interface ISearchEngine
    {
        public NamedEngine Name { get; }
        
        public string MatchingPattern { get; }

        public string QueryFormat { get; }

        public string GetQuery(string keyword, int numResults)
        {
            return string.Format(QueryFormat, keyword, numResults);
        }

        public IEnumerable<int> GetPositions(string response, string url)
        {
            if (string.IsNullOrWhiteSpace(response) || string.IsNullOrWhiteSpace(url))
            {
                return new List<int>();
            }

            Regex regex = new Regex(MatchingPattern);
            var searchResults = regex.Matches(response).ToList();

            var positions = searchResults
                .Where(x => x.Value.Contains(url))
                .Select(x => searchResults.IndexOf(x) + 1)
                .ToList();

            return positions;
        }
    }
}
