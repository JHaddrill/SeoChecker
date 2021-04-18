using SeoChecker.Common.Enums;
using SeoChecker.Common.Interfaces;

namespace SeoChecker.Common.Entities
{
    public class BingEngine : ISearchEngine
    {
        public NamedEngine Name => NamedEngine.Bing;
        
        public string MatchingPattern => @"<li class=""b_algo"">.+?</li>";
        
        public string QueryFormat => "https://www.bing.com/search?q={0}&count={1}";
    }
}
