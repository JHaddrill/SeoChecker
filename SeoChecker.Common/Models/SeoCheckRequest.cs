namespace SeoChecker.Common.Models
{
    /// <summary>
    /// Request Model for SEO Check
    /// </summary>
    public class SeoCheckRequest
    {
        public string SearchEngine { get; set; }
        public string Keyword { get; set; }
        public string Url { get; set; }
    }
}
