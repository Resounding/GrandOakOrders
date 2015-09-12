using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using GrandOakOrders;
using GrandOakOrders.Auth;
using GrandOakOrders.Data.Entities;
using GrandOakOrders.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace GrandOakOrders.Controllers
{
    public class AuthController : ApiController
    {
        [Route("Login")]
        [HttpPost]
        [OverrideAuthorization]
        [AllowAnonymous]
        public async Task<IHttpActionResult> Login(LoginRequest request)
        {
            try {
                var google = new GoogleTokenRequest(request);
                var token = await GetGoogleToken(google);
                var user = await UserByToken(token);

                var loginReponse = default(LoginResponse);

                if (user == null) {
                    var profile = await GetGoogleProfile(token);
                    user = await CreateUser(profile, token);
                    loginReponse = new LoginResponse(user);
                } else {
                    loginReponse = new LoginResponse(user);
                }
                
                return Ok(loginReponse);

            } catch (Exception ex) {
                return InternalServerError(ex);
            }
        }

        [Route("Auth/Callback")]
        [HttpGet]
        [OverrideAuthorization]
        [AllowAnonymous]
        public Task<IHttpActionResult> AuthCallback()
        {
            return Task.FromResult<IHttpActionResult>(Ok());
        }

        private async Task<string> GetGoogleToken(GoogleTokenRequest request)
        {
            var client = new HttpClient();
            var content = request.AsFormContent();
            var url = ConfigurationManager.AppSettings["GoogleAuthURL"];
            var response = await client.PostAsync(url, content);
            if (!response.IsSuccessStatusCode) {
                var errMsg = await response.Content.ReadAsStringAsync();
                throw new ApplicationException(errMsg);
            }

            var googleResponse = await response.Content.ReadAsAsync<GoogleTokenResponse>();
            return googleResponse.access_token;
        }

        [Route("API/Me")]
        [HttpGet]
        public async Task<IHttpActionResult> Me()
        {
            
            if(Request.Headers.Authorization != null && !string.IsNullOrWhiteSpace(Request.Headers.Authorization.Parameter)) {
                var token = Request.Headers.Authorization.Parameter;
                var user = await UserByToken(token);
                if (user != null) {
                    return Ok(user);
                }
            }

            var header = new AuthenticationHeaderValue("OAuth", "Realm=GrandOak");
            return Unauthorized(header);
        }

        private async Task<GoogleProfileResponse> GetGoogleProfile(string token)
        {
            var url = ConfigurationManager.AppSettings["GooglePlusProfileURL"];
            var client = new HttpClient();
            var profileRequest = new HttpRequestMessage {
                RequestUri = new Uri(url),
                Method = HttpMethod.Get
            };
            profileRequest.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            var profileResponse = await client.SendAsync(profileRequest);

            if (!profileResponse.IsSuccessStatusCode) {
                var err = await profileResponse.Content.ReadAsStringAsync();
                throw new ApplicationException(err);
            }


            var profile = await profileResponse.Content.ReadAsAsync<GoogleProfileResponse>();
            return profile;    
        }

        private async Task<User> CreateUser(GoogleProfileResponse profile, string token)
        {
            var user = new User {
                AccessToken = token,
                DisplayName = profile.name,
                UserName = profile.email,
                Email = profile.email,
                Id = profile.sub
            };
            var userManager = Request.GetOwinContext().GetUserManager<GrandOakUserManager>();
            await userManager.CreateAsync(user);
            return user;
        }

        private async Task<User> UserById(string id)
        {
            var userManager = Request.GetOwinContext().GetUserManager<GrandOakUserManager>();
            var user = await userManager.FindByIdAsync(id);
            return user;
        }

        private async Task<User> UserByToken(string token)
        {
            var userManager = Request.GetOwinContext().GetUserManager<GrandOakUserManager>();
            var loginInfo = new UserLoginInfo("google", token);
            var user = await userManager.FindAsync(loginInfo);
            return user;
        }
    }
}