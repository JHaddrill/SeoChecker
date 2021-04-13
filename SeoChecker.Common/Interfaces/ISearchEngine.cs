using System.Collections.Generic;
using System.Threading.Tasks;

namespace SeoChecker.Common.Interfaces
{
    public interface ISearchEngine
    {
        public string Name { get; }

        public Task<IEnumerable<int>> GetPositionsOfUrl(string keyword, string url);
    }
}
