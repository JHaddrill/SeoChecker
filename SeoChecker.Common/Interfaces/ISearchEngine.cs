using SeoChecker.Common.Enums;
using System.Collections.Generic;

namespace SeoChecker.Common.Interfaces
{
    public interface ISearchEngine
    {
        public NamedEngine Name { get; }
        public string GetQuery(string keyword, int numResults);
        public IEnumerable<int> GetPositions(string response, string url);
    }
}
