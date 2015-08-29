using GrandOakOrders.Data.Entities;
using GrandOakOrders.Data.Repositories;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

namespace GrandOakOrders.Auth
{
    public class GrandOakUserManager : UserManager<User, string>
    {
        public GrandOakUserManager(IUserStore<User, string> store) : base(store)
        {
            //UserTokenProvider = new EmailTokenProvider<SandboxUser, int>();
            //EmailService = container.GetInstance<IIdentityMessageService>("email");
        }

        public static GrandOakUserManager Create(IdentityFactoryOptions<GrandOakUserManager> options, IOwinContext context)
        {
            var store = new UserRepository();
            var manager = new GrandOakUserManager(store);
            return manager;
        }
    }
}