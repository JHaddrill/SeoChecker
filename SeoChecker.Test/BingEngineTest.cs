using SeoChecker.Common.Entities;

namespace SeoChecker.Test
{
    public class BingEngineTest : SearchEngineTest
    {
        public BingEngineTest()
        {
            SearchEngine = new BingEngine();
            
            OtherResult = @"<li class=""b_algo"">other</li>";
            MatchResult = @$"<li class=""b_algo"">{TestUrl}</li>";
        }
    }
}
