using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Filters;
using GrandOakOrders.Auth;
using GrandOakOrders.Data.Entities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace GrandOakOrders
{
    public static class FilterConfig
    {
        public static void RegisterGlobalFilters(HttpFilterCollection filters)
        {
            filters.Add(new ErrorFilter());
            filters.Add(new AuthenticationFilter());
        }
    }

    public class ErrorFilter : IFilter, IExceptionFilter
    {
        public bool AllowMultiple { get { return false; } }

        public Task ExecuteExceptionFilterAsync(HttpActionExecutedContext actionExecutedContext, CancellationToken cancellationToken)
        {
            //TODO: Email error reports
            var ex = actionExecutedContext.Exception;
            while (ex != null) {
                Console.WriteLine(ex.Message);
                ex = ex.InnerException;
            }

            return Task.FromResult(0);
        }
    }

    public class AuthenticationFilter : ActionFilterAttribute, IAuthenticationFilter
    {
        private static IDictionary<string, User> _session = new Dictionary<string, User>();
        public async Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            var request = context.Request;
            var authorization = request.Headers.Authorization;

            if(authorization == null) {
                return;
            }

            if(authorization.Scheme != "Bearer") {
                return;
            }

            var token = authorization.Parameter;

            if (string.IsNullOrEmpty(token)) {
                context.ErrorResult = new AuthenticationFailureResult("Missing credentials", request);
                return;
            }

            var user = default(User);
            if (_session.ContainsKey(token)) {
                user = _session[token];
            } else {
                var userManager = context.Request.GetOwinContext().GetUserManager<GrandOakUserManager>();
                var loginInfo = new UserLoginInfo("google", token);
                user = await userManager.FindAsync(loginInfo);
                if(user != null) {
                    _session[token] = user;
                }
            }

            if(user == null) {
                context.ErrorResult = new AuthenticationFailureResult("Invalid bearer token", request);
                return;
            }

            context.Principal = new GrandOakPrincipal(user);
        }

        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            var challenge = new AuthenticationHeaderValue("OAuth");
            context.Result = new AddChallengeOnUnauthorizedResult(challenge, context.Result);
            return Task.FromResult(0);
        }
    }

    public class GrandOakPrincipal : IPrincipal
    {
        public GrandOakPrincipal(User user)
        {
            Identity = new GrandOakIdentity(user);
        }

        public IIdentity Identity { get; private set; }

        public bool IsInRole(string role)
        {
            return false;
        }
    }

    public class GrandOakIdentity : IIdentity
    {
        public GrandOakIdentity(User user)
        {
            Name = user.DisplayName;
        }

        public string AuthenticationType
        {
            get { return "External"; }
        }

        public bool IsAuthenticated
        {
            get { return true; }
        }

        public string Name { get; private set; }
    }

    // http://www.asp.net/web-api/overview/security/authentication-filters
    public class AddChallengeOnUnauthorizedResult : IHttpActionResult
    {
        public AddChallengeOnUnauthorizedResult(AuthenticationHeaderValue challenge, IHttpActionResult innerResult)
        {
            Challenge = challenge;
            InnerResult = innerResult;
        }

        public AuthenticationHeaderValue Challenge { get; private set; }

        public IHttpActionResult InnerResult { get; private set; }

        public async Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpResponseMessage response = await InnerResult.ExecuteAsync(cancellationToken);

            if (response.StatusCode == HttpStatusCode.Unauthorized) {
                // Only add one challenge per authentication scheme.
                if (!response.Headers.WwwAuthenticate.Any((h) => h.Scheme == Challenge.Scheme)) {
                    response.Headers.WwwAuthenticate.Add(Challenge);
                }
            }

            return response;
        }
    }

    public class AuthenticationFailureResult : IHttpActionResult
    {
        public AuthenticationFailureResult(string reasonPhrase, HttpRequestMessage request)
        {
            ReasonPhrase = reasonPhrase;
            Request = request;
        }

        public string ReasonPhrase { get; private set; }

        public HttpRequestMessage Request { get; private set; }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            return Task.FromResult(Execute());
        }

        private HttpResponseMessage Execute()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
            response.RequestMessage = Request;
            response.ReasonPhrase = ReasonPhrase;
            return response;
        }
    }
}