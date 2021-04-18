using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Moq;
using SeoChecker.Common.Models;
using SeoChecker.Common.Services;
using System.Text.Json;
using Xunit;

namespace SeoChecker.Test
{
    public class CacheServiceTest : ServiceTestBase
    {
        protected Mock<ILogger<CacheService>> MockLogger = new Mock<ILogger<CacheService>>();

        protected CacheService cacheService;
        protected IMemoryCache memoryCache;
        public CacheServiceTest()
        {
            memoryCache = GetMemoryCache();
            cacheService = new CacheService(MockLogger.Object, memoryCache);
        }

        [Fact]
        public void Set_AddsItemToMemCache_UsingSerializedObjectAsKey()
        {
            cacheService.Set(DefaultSeoCheckRequest, DefaultSeoCheckResponse);

            memoryCache.TryGetValue(JsonSerializer.Serialize(DefaultSeoCheckRequest), out SeoCheckResponse cachedResult);
            Assert.NotNull(cachedResult);
            Assert.Equal(DefaultSeoCheckResponse.SearchEngine, cachedResult.SearchEngine);
            Assert.Equal(DefaultSeoCheckResponse.Positions, cachedResult.Positions);
            Assert.Equal(DefaultSeoCheckResponse.NumberOfOccurences, cachedResult.NumberOfOccurences);
        }

        [Fact]
        public void Set_AddsItemToMemCache_WithStringKeyOfRequest()
        {
            var key = "cacheKey";

            cacheService.Set(key, DefaultSeoCheckResponse);

            memoryCache.TryGetValue(key, out SeoCheckResponse cachedResult);
            Assert.NotNull(cachedResult);
            Assert.Equal(DefaultSeoCheckResponse.SearchEngine, cachedResult.SearchEngine);
            Assert.Equal(DefaultSeoCheckResponse.Positions, cachedResult.Positions);
            Assert.Equal(DefaultSeoCheckResponse.NumberOfOccurences, cachedResult.NumberOfOccurences);
        }

        [Fact]
        public void Get_ReturnsNull_WhenNoKeyIsNotFound()
        {
            var cachedResult = cacheService.Get<SeoCheckResponse>(DefaultSeoCheckRequest);
            Assert.Null(cachedResult);
        }

        [Fact]
        public void Get_RetrievesItemFromMemCache_UsingSerializedObjectAsKey()
        {
            cacheService.Set(DefaultSeoCheckRequest, DefaultSeoCheckResponse);
            var cachedResult = cacheService.Get<SeoCheckResponse>(DefaultSeoCheckRequest);

            Assert.NotNull(cachedResult);
            Assert.Equal(DefaultSeoCheckResponse.SearchEngine, cachedResult.SearchEngine);
            Assert.Equal(DefaultSeoCheckResponse.Positions, cachedResult.Positions);
            Assert.Equal(DefaultSeoCheckResponse.NumberOfOccurences, cachedResult.NumberOfOccurences);
        }

        [Fact]
        public void Get_RetrievesItemFromMemCache_UsingStringKey()
        {
            var key = "cacheKey";

            cacheService.Set(key, DefaultSeoCheckResponse);
            var cachedResult = cacheService.Get<SeoCheckResponse>(key);

            Assert.NotNull(cachedResult);
            Assert.Equal(DefaultSeoCheckResponse.SearchEngine, cachedResult.SearchEngine);
            Assert.Equal(DefaultSeoCheckResponse.Positions, cachedResult.Positions);
            Assert.Equal(DefaultSeoCheckResponse.NumberOfOccurences, cachedResult.NumberOfOccurences);
        }

        public IMemoryCache GetMemoryCache()
        {
            var services = new ServiceCollection();
            services.AddMemoryCache();
            var serviceProvider = services.BuildServiceProvider();
            return serviceProvider.GetService<IMemoryCache>();
        }
    }
}
