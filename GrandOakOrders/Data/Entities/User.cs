using System;
using Microsoft.AspNet.Identity;

namespace GrandOakOrders.Data.Entities
{
    public class User : IUser<string>
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string AccessToken { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}