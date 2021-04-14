using System.Threading.Tasks;

namespace SeoChecker.Common.Interfaces
{
    public interface IHttpHandler
    {
        public Task<string> GetWebpageAsStringAsync(string query);
    }
}
