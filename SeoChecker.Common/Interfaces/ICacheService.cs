namespace SeoChecker.Common.Interfaces
{
    public interface ICacheService
    {
        public void Set(object request, object response);

        public T Get<T>(object request);
    }
}
