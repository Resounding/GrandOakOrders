using System;
using System.Threading.Tasks;
using System.Web.Http;
using GrandOakOrders.Data.Repositories;

namespace GrandOakOrders.Controllers
{
    [RoutePrefix("API/Calendar")]
    public class CalendarController : ApiController
    {
        [Route("")]
        [HttpGet]
        [OverrideAuthentication]
        [OverrideAuthorization]
        [AllowAnonymous]
        public async Task<IHttpActionResult> Events(DateTime start, DateTime end)
        {
            var repository = new CalendarRepository();
            var events = await repository.Events(start, end);
            return Ok(events);
        }
    }
}