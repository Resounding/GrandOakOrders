using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;

namespace GrandOakOrders.Models
{
    public class GoogleTokenRequest
    {
        public GoogleTokenRequest(LoginRequest login)
        {
            grant_type = "authorization_code";
            code = login.Code;
            client_id = login.ClientId;
            client_secret = ConfigurationManager.AppSettings["GoogleSecret"];
            redirect_uri = login.RedirectUri;
        }

        public string grant_type { get; set; }
        public string code { get; set; }
        public string client_id { get; set; }
        public string client_secret { get; set; }
        public string redirect_uri { get; set; }

        public FormUrlEncodedContent AsFormContent()
        {
            var list = new List<KeyValuePair<string,string>>();
            list.Add(new KeyValuePair<string, string>("grant_type", grant_type));
            list.Add(new KeyValuePair<string, string>("code", code));
            list.Add(new KeyValuePair<string, string>("client_id", client_id));
            list.Add(new KeyValuePair<string, string>("client_secret", client_secret));
            list.Add(new KeyValuePair<string, string>("redirect_uri", redirect_uri));
            var content = new FormUrlEncodedContent(list);
            return content;
        }
    }
}