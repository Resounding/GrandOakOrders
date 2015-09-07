using System.IO;
using System.Threading.Tasks;
using System.Web.Http;
using GrandOakOrders.Data.Repositories;
using GrandOakOrders.Reports;
using GrapeCity.ActiveReports;
using GrapeCity.ActiveReports.Export.Pdf.Section;

namespace GrandOakOrders.Controllers
{
    [RoutePrefix("Reports")]
    public class ReportsController : ApiController
    {
        [Route("KitchenOrder/{id:int}")]
        [HttpGet]
        public async Task<IHttpActionResult> KitchenOrder(int id)
        {
            var repo = new OrderRepository();
            var order = await repo.Get(id);
            if(order == null) {
                return NotFound();
            }

            SectionReport report = new KitchenOrderReport(order) as SectionReport;
            report.Run();
            return Ok(report);
        }
    }
}