using System.Web.Http;
using Owin;

namespace GrandOakOrders
{
    public static class WebApiConfig
    {
        public static void Configure(IAppBuilder app, HttpConfiguration config)
        {
            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            config.MapHttpAttributeRoutes();
            app.UseWebApi(config);
        }
    }
}
