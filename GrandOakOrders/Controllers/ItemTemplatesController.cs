using System.Threading.Tasks;
using System.Web.Http;
using GrandOakOrders.Data.Repositories;

namespace GrandOakOrders.Controllers
{
    [RoutePrefix("API/Items")]
    public class ItemTemplatesController : ApiController
    {
        private readonly ItemTemplateRepository _repository = new ItemTemplateRepository();

        [Route("")]
        [HttpGet]
        public async Task<IHttpActionResult> Index()
        {
            var items = await _repository.List();
            return Ok(items);
        }
    }
}