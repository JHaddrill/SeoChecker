using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SeoChecker.Common.Constants;
using SeoChecker.Common.Extensions;
using SeoChecker.Common.Interfaces;
using System;
using System.Text.Json;

namespace SeoChecker.Common.Services
{
    /// <summary>
    /// Concrete implementation of <see cref="ICacheService"/>
    /// Handles request/resposne caching for the application.
    /// </summary>
    public class CacheService : ICacheService
    {
        private const int _defaultExpiry = 60;

        private readonly ILogger<CacheService> _logger;
        private readonly IMemoryCache _memoryCache;

        public TimeSpan DefaultExpiry { get; set; } 

        public CacheService(IConfiguration config, ILogger<CacheService> logger, IMemoryCache cache)
        {
            _logger = logger;
            _memoryCache = cache;
            
            int expiryMinutes = config.GetIntOrDefault(ConfigKeys.CacheExpiry, _defaultExpiry);
            DefaultExpiry = TimeSpan.FromMinutes(expiryMinutes);
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
