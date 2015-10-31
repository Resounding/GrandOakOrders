using System.Web.Http;
using System.Web.Http.Cors;

namespace GrandOakOrders
{
    public static class CorsConfig
    {
        public static void Configure(HttpConfiguration config)
        {
            config.EnableCors(new EnableCorsAttribute(
                "http://localhost:3474,https://grandoakorders.azurewebsites.net",
                "*",
                "*"
            ));
        }
    }
}