using System.Threading.Tasks;
using System.Web.Http;
using GrandOakOrders.Data.Entities;
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

        [Route("")]
        [HttpPost]
        public async Task<IHttpActionResult> Create(ItemTemplate item)
        {
            await _repository.Create(item);
            return Ok(item);
        }

        [Route("{id:int}")]
        [HttpPut]
        public async Task<IHttpActionResult> Edit(ItemTemplate item)
        {
            await _repository.Edit(item);
            return Ok();
        }

        [Route("{id:int}")]
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(int id)
        {
            await _repository.Delete(id);
            return Ok();
        }
    }
}