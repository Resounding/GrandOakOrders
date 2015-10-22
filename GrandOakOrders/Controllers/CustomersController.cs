using System.Threading.Tasks;
using System.Web.Http;
using GrandOakOrders.Data.Repositories;

namespace GrandOakOrders.Controllers
{
    [RoutePrefix("API/Customers")]
    public class CustomersController : ApiController
    {
        private readonly CustomerRepository _repository = new CustomerRepository();

        [Route("")]
        [HttpGet]
        public async Task<IHttpActionResult> Customers()
        {
            var customers = await _repository.GetCustomers();
            return Ok(customers);
        }
    }
}