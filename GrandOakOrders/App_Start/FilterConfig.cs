using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Elmah;
using Exceptions;
using GrandOakOrders.Auth;
using GrandOakOrders.Data.Entities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using SendGrid;

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

    public class GOCModule : ErrorMailModule
    {
        private readonly Web _transportWeb;

        public GOCModule()
        {
            var apiKey = ConfigurationManager.AppSettings["SendGridApiKey"];
            _transportWeb = new Web(apiKey);
        }

        protected override void SendMail(MailMessage mail)
        {
            var mailMessage = new SendGridMessage {
                To = new [] { new MailAddress("cliffe@resounding.ca", "Cliffe Hodgkinson"), },
                Subject = "Grand Oak Orders error",
                From = new MailAddress("elmah@resounding.ca"),
                Text = mail.Body,
                Html = mail.Body
            };

            Task.Factory
                .StartNew(() => _transportWeb.DeliverAsync(mailMessage),
                    CancellationToken.None,
                    TaskCreationOptions.LongRunning, // guarantees separate thread
                    TaskScheduler.Default)
                .Wait();
        }
    }

    public class ErrorFilter : IExceptionFilter
    {
        public bool AllowMultiple => false;

        public Task ExecuteExceptionFilterAsync(HttpActionExecutedContext actionExecutedContext, CancellationToken cancellationToken)
        {
            var ex = actionExecutedContext.Exception;

            var apiException = ex as InvalidApiRequestException;
            if (apiException != null) {
                var apiErrors = "Sendgrid error: " + string.Join(", ", apiException.Errors);
                ex = new System.ApplicationException(apiErrors, ex);
            }

            // Log to Elmah
            ErrorSignal.FromCurrentContext().Raise(ex);
            
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