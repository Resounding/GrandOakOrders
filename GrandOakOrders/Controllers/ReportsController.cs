using System;
using System.Threading.Tasks;
using System.Web.Http;
using GrandOakOrders.Data.Repositories;
using GrandOakOrders.Reports;
using GrapeCity.ActiveReports;

namespace GrandOakOrders.Controllers
{
    [RoutePrefix("Reports")]
    [OverrideAuthorization]
    [AllowAnonymous]
    public class ReportsController : ApiController
    {
        [Route("KitchenOrder/{id:int}")]
        [HttpGet]
        public async Task<IHttpActionResult> KitchenOrder(int id)
        {
            try {
                var repo = new OrderRepository();
                var order = await repo.Get(id);
                if (order == null) {
                    return NotFound();
                }

                SectionReport report = new KitchenOrderReport(order) as SectionReport;
                report.Run();
                return Ok(report);
            } catch (Exception ex) {
                return Ok(ex);
            }
        }
    }
}