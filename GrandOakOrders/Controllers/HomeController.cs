using System.Threading.Tasks;
using System.Web.Http;
using GrandOakOrders.Data.Repositories;

namespace GrandOakOrders.Controllers
{
    [RoutePrefix("API/Home")]
    public class HomeController : ApiController
    {
        [Route("")]
        [HttpGet]
        public async Task<IHttpActionResult> Home()
        {
            var inquiryRepo = new InquiryRepository();
            var inquiries = await inquiryRepo.OpenInquiries();

            var orderRepo = new OrderRepository();
            var orders = await orderRepo.GetOrders(all: false);

            return Ok(new { Inquiries = inquiries, Orders = orders });
        }
    }
}