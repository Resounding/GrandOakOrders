using System.Configuration;
using System.Web.Http;

namespace GrandOakOrders.Controllers
{
    [RoutePrefix("API/Settings")]
    public class SettingsController : ApiController
    {
        [Route("{key}")]
        public IHttpActionResult Get(string key)
        {
            if(string.IsNullOrWhiteSpace(key)) return BadRequest();

            var value = ConfigurationManager.AppSettings[key];

            return Ok(value);
        }
    }
}