using GrandOakOrders.Data.Entities;

namespace GrandOakOrders.Models
{
    public class LoginResponse
    {
        public LoginResponse(User user)
        {
            name = user.DisplayName;
            google_id = user.Id;
            email = user.Email;
            access_token = user.AccessToken;
        }

        public string name { get; set; }
        public string google_id { get; set; }
        public string email { get; set; }
        public string access_token { get; set; }
    }
}