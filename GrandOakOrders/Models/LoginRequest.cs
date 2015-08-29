namespace GrandOakOrders.Models
{
    public class LoginRequest
    {
        public string Code { get; set; }
        public string ClientId { get; set; }
        public string RedirectUri { get; set; }
    }
}