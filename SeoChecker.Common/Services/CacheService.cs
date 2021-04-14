using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using SeoChecker.Common.Interfaces;
using System;
using System.Text.Json;

namespace SeoChecker.Common.Services
{
    public class CacheService : ICacheService
    {
        private readonly ILogger<CacheService> _logger;
        private readonly IMemoryCache _memoryCache;

        public TimeSpan DefaultExpiry { get; set; } 

        public CacheService(ILogger<CacheService> logger, IMemoryCache cache)
        {
            _logger = logger;
            _memoryCache = cache;

            // Make configureable
            DefaultExpiry = TimeSpan.FromMinutes(60);
        }

        public T Get<T>(object request)
        {
            var key = GetCacheKey(request);
            _memoryCache.TryGetValue(key, out T response);
            _logger.LogDebug($"Retrieved Cached Item - Key: {key}, Item: {response}");
            return response;
        }

        public void Set(object request, object response)
        {
            var key = GetCacheKey(request);
            _logger.LogDebug($"New Cache entry - Key: {key}, Item: {response}");
            _memoryCache.Set(key, response, DefaultExpiry);
        }

        private string GetCacheKey(object keyObject)
        {
           return keyObject is string 
                ? keyObject.ToString()
                : JsonSerializer.Serialize(keyObject);
        }
    }
}
