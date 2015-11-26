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
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Elmah;
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
            filters.Add(new AuthorizationFilter());
        }
    }

    public class ErrorFilter : IExceptionFilter
    {
        public bool AllowMultiple => false;

        public Task ExecuteExceptionFilterAsync(HttpActionExecutedContext actionExecutedContext, CancellationToken cancellationToken)
        {
            // Log to Elmah
            ErrorSignal.FromCurrentContext().Raise(actionExecutedContext.Exception);

            var ex = actionExecutedContext.Exception;
            while (ex != null) {
                Console.WriteLine(ex.Message);
                ex = ex.InnerException;
            }

            return Task.FromResult(0);
        }
    }

    public class AuthorizationFilter : ActionFilterAttribute, IAuthorizationFilter
    {
        public Task<HttpResponseMessage> ExecuteAuthorizationFilterAsync(HttpActionContext context, CancellationToken cancellationToken, Func<Task<HttpResponseMessage>> continuation)
        {
            var request = context.Request;
            var authorization = request.Headers.Authorization;

            if (authorization == null) {
                return Task.FromResult(request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Authorization header not supplied"));
            }

            if (authorization.Scheme != "Bearer") {
                return Task.FromResult(request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Invalid Authorization scheme"));
            }

            var token = authorization.Parameter;

            if (string.IsNullOrEmpty(token)) {
                return Task.FromResult(request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Missing credentials"));
            }

            return continuation();
        }
    }

    public class AuthenticationFilter : ActionFilterAttribute, IAuthenticationFilter
    {
        private static readonly IDictionary<string, User> _session = new Dictionary<string, User>();
        public async Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            var request = context.Request;
            var authorization = request.Headers.Authorization;

            if(authorization == null) {
                //context.ErrorResult = new AuthenticationFailureResult("Invalid bearer token", request);
                return;
            }

            if(authorization.Scheme != "Bearer") {
                //context.ErrorResult = new AuthenticationFailureResult("Invalid bearer token", request);
                return;
            }

            var token = authorization.Parameter;

            if (string.IsNullOrEmpty(token)) {
                context.ErrorResult = new AuthenticationFailureResult("Missing credentials", request);
                return;
            }

            User user;
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

        public IIdentity Identity { get; }

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

        public string AuthenticationType => "External";

        public bool IsAuthenticated => true;

        public string Name { get; }
    }

    // http://www.asp.net/web-api/overview/security/authentication-filters
    public class AddChallengeOnUnauthorizedResult : IHttpActionResult
    {
        public AddChallengeOnUnauthorizedResult(AuthenticationHeaderValue challenge, IHttpActionResult innerResult)
        {
            Challenge = challenge;
            InnerResult = innerResult;
        }

        public AuthenticationHeaderValue Challenge { get; }

        public IHttpActionResult InnerResult { get; }

        public async Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpResponseMessage response = await InnerResult.ExecuteAsync(cancellationToken);

            if (response.StatusCode == HttpStatusCode.Unauthorized) {
                // Only add one challenge per authentication scheme.
                if (response.Headers.WwwAuthenticate.All(h => h.Scheme != Challenge.Scheme)) {
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