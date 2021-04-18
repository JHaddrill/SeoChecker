using SeoChecker.Common.Enums;
using SeoChecker.Common.Models;
using System.Collections.Generic;

namespace SeoChecker.Test
{
    public class ServiceTestBase
    {
        protected SeoCheckRequest DefaultSeoCheckRequest = new SeoCheckRequest
        {
            Keyword = "esettlements",
            Url = "www.sympli.com.au",
            SearchEngine = NamedEngine.Google.ToString()
        };

        protected SeoCheckResponse DefaultSeoCheckResponse = new SeoCheckResponse
        {
            SearchEngine = NamedEngine.Google.ToString(),
            Positions = new List<int>() { 10 }
        };
    }
}
