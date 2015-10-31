using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using GrandOakOrders.Data.Entities;
using GrandOakOrders.Data.Repositories;

namespace GrandOakOrders.Controllers
{
    [RoutePrefix("API/Orders")]
    public class OrdersController : ApiController
    {
        private readonly OrderRepository _repo = new OrderRepository();

        [Route("")]
        [HttpGet]
        public async Task<IHttpActionResult> Orders(bool all = false)
        {
            var orders = await _repo.GetOrders(all);
            return Ok(orders);
        }

        [Route("{id:int}")]
        [HttpGet]
        public async Task<IHttpActionResult> Order(int id)
        {
            var order = await _repo.Get(id);
            if (order == null) {
                return NotFound();
            }

            return Ok(order);
        }

        [Route("{id:int}")]
        [HttpPatch]
        public async Task<IHttpActionResult> Update(Order order)
        {
            var user = Request.GetOwinContext().Request.User;
            var edited = await _repo.Edit(order, user.Identity.Name);

            return Ok(edited);
        }
    }
}