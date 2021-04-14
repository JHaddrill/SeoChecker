using SeoChecker.Common.Models;
using System.Threading.Tasks;

namespace SeoChecker.Common.Interfaces
{
    public interface ISeoCheckerService
    {
        public Task<SeoCheckResponse> GetPositionsForSearchEngine(SeoCheckRequest request);
    }
}
