using System.Web.Http;
using System.Web.Optimization;
using Owin;

namespace GrandOakOrders
{
    public class Startup
    {
        public void Configuration(IAppBuilder app) {

            var httpConfig = new HttpConfiguration();

            FilterConfig.RegisterGlobalFilters(httpConfig.Filters);
            AuthConfig.Configure(app);
            MediaFormattersConfig.RegisterFormatters(httpConfig.Formatters);
            WebApiConfig.Configure(app, httpConfig);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            CorsConfig.Configure(httpConfig);
        }
    }
}