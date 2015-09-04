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
        private OrderRepository _repo = new OrderRepository();

        [Route("")]
        [HttpGet]
        public async Task<IHttpActionResult> Orders()
        {
            var orders = await _repo.OpenOrders();
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
            var updated = await _repo.Edit(order, user.Identity.Name);

            return Ok();
        }
    }
}