using Microsoft.Extensions.Configuration;

namespace SeoChecker.Common.Extensions
{
    public static class ConfigurationExtensions
    {
        // For easy retrieval of int values
        public static int GetIntOrDefault(this IConfiguration config, string key, int defaultValue = 0)
        {
            if (!string.IsNullOrWhiteSpace(key))
            {
                return int.TryParse(config[key], out int value)
                    ? value
                    : defaultValue;
            }

            return defaultValue;
        }
    }
}
