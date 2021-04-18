using SeoChecker.Common.Interfaces;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace SeoChecker.Test
{
    public abstract class SearchEngineTest
    {
        protected ISearchEngine SearchEngine;

        protected const string TestUrl = "www.test.com.au";
        protected string OtherResult { get; set; }
        protected string MatchResult { get; set; }

        [Theory]
        [InlineData("", 0)]
        [InlineData(null, 0)]
        [InlineData("esettlements", 100)]
        [InlineData("Test", 50)]
        public void GetQuery_ReturnsQueryWithInjectedParameters(string keyword, int number)
        {
            var query = SearchEngine.GetQuery(keyword, number);
            var expected = string.Format(SearchEngine.QueryFormat, keyword, number);
            Assert.Equal(expected, query);
        }


        [Theory]
        [InlineData(null,null)]
        [InlineData(null,"")]
        [InlineData("",null)]
        [InlineData("", "NonEmpty")]
        [InlineData("     ", "     ")]
        [InlineData("NonEmpty", "     ")]
        [InlineData("     ", "NonEmpty")]
        public void GetPositions_ReturnsEmpty_WhenParamsAreNullOrWhiteSpace(string html, string url)
        {
            var positions = SearchEngine.GetPositions(html, url);
            Assert.NotNull(positions);
            Assert.Empty(positions);
        }

        [Fact]
        public void GetPositions_ReturnsEmpty_WhenNoMatches()
        {
            string html = $"<html>{OtherResult}</html>";
            var positions = SearchEngine.GetPositions(html, TestUrl);
            Assert.NotNull(positions);
            Assert.Empty(positions);
        }

        [Fact]
        public void GetPositions_ReturnsMatchedPosition_WhenOneResult()
        {
            string html = $"<html>{MatchResult}</html>";
            var positions = SearchEngine.GetPositions(html, TestUrl);
            Assert.NotNull(positions);
            Assert.Single(positions);
            Assert.Equal(1, positions.Single());
        }

        [Fact]
        public void GetPositions_ReturnsCorrectPosition_WhenMultipleResults_ButOneMatch()
        {
            string html = $"<html>{OtherResult}{MatchResult}{OtherResult}</html>";
            var positions = SearchEngine.GetPositions(html, TestUrl);
            Assert.NotNull(positions);
            Assert.Single(positions);
            Assert.Equal(2, positions.Single());
        }

        [Fact]
        public void GetPositions_ReturnsMultiplePosition_WhenMultipleMatchesFound()
        {
            string html = $"<html>{OtherResult}{MatchResult}{OtherResult}{MatchResult}</html>";
            var expectedPositions = new List<int>() { 2, 4 };
            var positions = SearchEngine.GetPositions(html, TestUrl);
            Assert.NotNull(positions);
            Assert.Equal(2, positions.Count());
            Assert.Equal(expectedPositions, positions);
        }
    }
}
