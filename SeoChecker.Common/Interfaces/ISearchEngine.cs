using System.Collections.Generic;

namespace SeoChecker.Common.Interfaces
{
    public interface ISearchEngine
    {
        public string Name { get; }
        public string GetQuery(string keyword, int numResults);
        public IEnumerable<int> GetPositions(string response, string url);
    }
}
