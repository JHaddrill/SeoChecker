using SeoChecker.Common.Entities;

namespace SeoChecker.Test
{
    public class GoogleEngineTest: SearchEngineTest
    {
        public GoogleEngineTest()
        {
            SearchEngine = new GoogleEngine();
            OtherResult = @"<div class=""ZINbbc xpd O9g5cc uUPGi""><div class=""kCrYT"">other</div></div>";
            MatchResult = @$"<div class=""ZINbbc xpd O9g5cc uUPGi""><div class=""kCrYT"">{TestUrl}</div></div>";
        }
    }
}
