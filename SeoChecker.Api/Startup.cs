using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SeoChecker.Common.Entities;
using SeoChecker.Common.Interfaces;
using SeoChecker.Common.Services;

namespace SeoChecker.Api
{
    public class Startup
    {
        readonly string AllowReactApp = "allowReactApp";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddMemoryCache();
            services.AddHttpClient("SeacrhClient", client => {
                client.DefaultRequestHeaders.Add("User-Agent", "SeoChecker/1.0");
            });

            services.AddCors(options =>
            {
                options.AddPolicy(name: AllowReactApp,
                                  builder =>
                                  {
                                      builder.WithOrigins("http://localhost:3000");
                                  });
            });

            services.AddSingleton<IHttpHandler, HttpHandler>();
            services.AddSingleton<ICacheService, CacheService>();
            services.AddSingleton<ISeoCheckerService, SeoCheckerService>();
            services.AddSingleton<ISearchEngine, GoogleEngine>();
            services.AddSingleton<ISearchEngine, BingEngine>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(AllowReactApp);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
