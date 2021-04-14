using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Moq;
using SeoChecker.Common.Enums;
using SeoChecker.Common.Interfaces;
using SeoChecker.Common.Models;
using SeoChecker.Common.Services;
using System;
using System.Collections.Generic;
using Xunit;

namespace SeoChecker.Test
{
    public class SeoCheckerServiceTest
    {
        protected readonly Mock<ILogger<SeoCheckerService>> MockLogger = new Mock<ILogger<SeoCheckerService>>();
        protected readonly Mock<ICacheService> MockCache = new Mock<ICacheService>();
        protected readonly Mock<ISearchEngine> MockSearchEngine = new Mock<ISearchEngine>();
        protected readonly Mock<IHttpHandler> MockHttpHandler = new Mock<IHttpHandler>();

        protected readonly SeoCheckerService SeoCheckerService;

        public SeoCheckerServiceTest()
        {
            SeoCheckerService = new SeoCheckerService(GetServiceProvider(), MockLogger.Object, MockCache.Object, MockHttpHandler.Object);
        }

        protected SeoCheckRequest DefaultRequest = new SeoCheckRequest
        {
            Keyword = "esettlements",
            Url = "www.sympli.com.au",
            SearchEngine = NamedEngine.Google.ToString()
        };

        protected SeoCheckResponse DefaultResponse = new SeoCheckResponse
        {
            SearchEngine = NamedEngine.Google.ToString(),
            Positions = new List<int>() { 10 }
        };


        [Fact]
        public async void GetPositionsForSearchEngine_DoesNotCallSearchEngine_WhenCachedResultIsFound()
        {
            SetupCacheResult(DefaultResponse);

            var result = await SeoCheckerService.GetPositionsForSearchEngine(DefaultRequest);

            Assert.NotNull(result);
            MockCache.Verify(x => x.Get<SeoCheckResponse>(It.IsAny<SeoCheckRequest>()), Times.Once);
            MockSearchEngine.Verify(x => x.GetQuery(It.IsAny<string>(), It.IsAny<int>()), Times.Never);
            MockSearchEngine.Verify(x => x.GetPositions(It.IsAny<string>(), It.IsAny<string>()), Times.Never);
            MockHttpHandler.Verify(x => x.GetWebpageAsStringAsync(It.IsAny<string>()), Times.Never);
        }

        [Fact]
        public async void GetPositionsForSearchEngine_CallsSearchEngine_WhenCachedResultIsNotFound()
        {
            SetupMockHttpHandler();
            SetupCacheResult(null);

            var result = await SeoCheckerService.GetPositionsForSearchEngine(DefaultRequest);

            Assert.NotNull(result);
            VerifyServicesAreCalled();
        }

        [Fact]
        public async void GetPositionsForSearchEngine_CreatesTheExpectedResponse()
        {
            SetupMockHttpHandler();
            SetupCacheResult(null);
            MockSearchEngine.SetupGet(x => x.Name).Returns(NamedEngine.Google);
            MockSearchEngine.Setup(x => x.GetPositions(It.IsAny<string>(), It.IsAny<string>())).Returns(new List<int> { 10, 20 });

            var result = await SeoCheckerService.GetPositionsForSearchEngine(DefaultRequest);

            VerifyServicesAreCalled();
            Assert.Equal(2, result.NumberOfOccurences);
            Assert.Contains(10, result.Positions);
            Assert.Contains(20, result.Positions);
            Assert.Equal(NamedEngine.Google.ToString(), result.SearchEngine);
        }

        [Fact]
        public async void GetPositionsForSearchEngine_DefaultsToGoogleIfUnknownEngine()
        {
            SetupMockHttpHandler();
            SetupCacheResult(null);

            var request = new SeoCheckRequest
            {
                Keyword = "esettlements",
                Url = "www.sympli.com.au",
                SearchEngine = "Other"
            };

            var result = await SeoCheckerService.GetPositionsForSearchEngine(request);

            VerifyServicesAreCalled();
            Assert.Equal(NamedEngine.Google.ToString(), result.SearchEngine);
        }

        #region Helpers
        private void SetupMockHttpHandler(string response = "")
        {
            MockHttpHandler.Setup(x => x.GetWebpageAsStringAsync(It.IsAny<string>()))
                .ReturnsAsync(response);
        }

        private void SetupCacheResult(SeoCheckResponse resposne)
        {
            MockCache.Setup(x => x.Get<SeoCheckResponse>(It.IsAny<SeoCheckRequest>()))
                .Returns(resposne);
        }

        private IServiceProvider GetServiceProvider()
        {
            var serviceCollection = new ServiceCollection();
            serviceCollection.AddScoped(provider => MockSearchEngine.Object);
            return serviceCollection.BuildServiceProvider();
        }

        private void VerifyServicesAreCalled()
        {
            MockCache.Verify(x => x.Get<SeoCheckResponse>(It.IsAny<SeoCheckRequest>()), Times.Once);
            MockSearchEngine.Verify(x => x.GetQuery(It.IsAny<string>(), It.IsAny<int>()), Times.Once);
            MockSearchEngine.Verify(x => x.GetPositions(It.IsAny<string>(), It.IsAny<string>()), Times.Once);
            MockHttpHandler.Verify(x => x.GetWebpageAsStringAsync(It.IsAny<string>()), Times.Once);
        }

        #endregion
    }
}
