using System.Configuration;
using GrandOakOrders.Auth;
using GrandOakOrders.Data;
using Microsoft.Owin.Security;
using Owin;

namespace GrandOakOrders
{
    public static class AuthConfig
    {
        public static void Configure(IAppBuilder app) {

            app.CreatePerOwinContext(GrandOakDbContext.Create);
            app.CreatePerOwinContext<GrandOakUserManager>(GrandOakUserManager.Create);

            app.SetDefaultSignInAsAuthenticationType("External");

            var clientId = ConfigurationManager.AppSettings["GoogleClientID"];
            var secret = ConfigurationManager.AppSettings["GoogleSecret"];
            app.UseGoogleAuthentication(clientId, secret);
        }
    }
}