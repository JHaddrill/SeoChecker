using SeoChecker.Common.Enums;
using SeoChecker.Common.Interfaces;

namespace SeoChecker.Common.Entities
{
    /// <summary>
    /// Representation of the Google Search engine
    /// </summary>
    public class GoogleEngine : ISearchEngine
    {       
        public NamedEngine Name => NamedEngine.Google;

        public string MatchingPattern => @"<div class=""ZINbbc xpd O9g5cc uUPGi""><div class=""kCrYT"">.+?\<\/div>";

        public string QueryFormat => "https://www.google.com/search?q={0}&num={1}";
    }
}
