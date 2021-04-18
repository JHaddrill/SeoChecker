using System.Collections.Generic;
using System.Linq;

namespace SeoChecker.Common.Models
{
    public class SeoCheckResponse
    {
        public string Keyword { get; set; }
        public string Url { get; set; }
        public string SearchEngine { get; set; }
        public IEnumerable<int> Positions { get; set; }
        public int NumberOfOccurrences => Positions.Count();
    }
}
