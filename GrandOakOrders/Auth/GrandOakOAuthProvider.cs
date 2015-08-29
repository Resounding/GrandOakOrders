using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;

namespace GrandOakOrders.Auth
{
    public class GrandOakOAuthProvider : OAuthAuthorizationServerProvider
    {
        private string _publicClientId;

        public GrandOakOAuthProvider(string publicClientId)
        {
            if(publicClientId == null) {
                throw new ArgumentNullException(nameof(publicClientId));
            }

            _publicClientId = publicClientId;
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var userManager = context.OwinContext.GetUserManager<GrandOakUserManager>();
            var loginInfo = new UserLoginInfo("GrandOak", context.ClientId);
            var user = await userManager.FindAsync(loginInfo);

            if(user == null) {
                context.SetError("invalid_grant", "User not found");
                return;
            }

            //var oAuthIdentity = await user.GenerateUserIdentityAsync(userManager, OAuthDefaults.AuthenticationType);
            var oAuthIdentity = new ClaimsIdentity();

            var properties = CreateProperties(user.UserName);
            var ticket = new AuthenticationTicket(oAuthIdentity, properties);
            context.Validated(ticket);
            context.Request.Context.Authentication.SignIn(oAuthIdentity);

        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary) {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override Task GrantClientCredentials(OAuthGrantClientCredentialsContext context)
        {
            return base.GrantClientCredentials(context);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == _publicClientId) {
                Uri expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri) {
                    context.Validated();
                }
            }

            context.Validated();

            return Task.FromResult<object>(null);
        }

        public override Task AuthorizeEndpoint(OAuthAuthorizeEndpointContext context)
        {
            return base.AuthorizeEndpoint(context);
        }

        public override Task TokenEndpointResponse(OAuthTokenEndpointResponseContext context)
        {
            return base.TokenEndpointResponse(context);
        }

        public override Task AuthorizationEndpointResponse(OAuthAuthorizationEndpointResponseContext context)
        {
            return base.AuthorizationEndpointResponse(context);
        }

        public override Task GrantAuthorizationCode(OAuthGrantAuthorizationCodeContext context)
        {
            return base.GrantAuthorizationCode(context);
        }

        public override Task GrantCustomExtension(OAuthGrantCustomExtensionContext context)
        {
            return base.GrantCustomExtension(context);
        }

        public override Task GrantRefreshToken(OAuthGrantRefreshTokenContext context)
        {
            return base.GrantRefreshToken(context);
        }

        public override Task ValidateAuthorizeRequest(OAuthValidateAuthorizeRequestContext context)
        {
            return base.ValidateAuthorizeRequest(context);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
            return Task.FromResult(0);
        }

        public override Task ValidateTokenRequest(OAuthValidateTokenRequestContext context)
        {
            return base.ValidateTokenRequest(context);
        }

        private static AuthenticationProperties CreateProperties(string userName)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                { "userName", userName }
            };
            return new AuthenticationProperties(data);
        }
    }
}