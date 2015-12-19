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
        private readonly OrderRepository _repo = new OrderRepository();

        [Route("KitchenOrder/{id:int}")]
        [HttpGet]
        public async Task<IHttpActionResult> KitchenOrder(int id)
        {
            try {
                var order = await _repo.Get(id);
                if (order == null) {
                    return NotFound();
                }

                var report = new KitchenOrderReport(order) as SectionReport;
                report.Run();
                return Ok(report);
            } catch (Exception ex) {
                return Ok(ex);
            }
        }

        [Route("Invoices/{id:int}")]
        [HttpGet]
        public async Task<IHttpActionResult> Invoice(int id)
        {
            try {
                var order = await _repo.Get(id);
                if (order == null) {
                    return NotFound();
                }

                var report = new InvoiceReport(order) as SectionReport;
                report.Run();
                return Ok(report);
            }
            catch (Exception ex) {
                return Ok(ex);
            }
        }

        [Route("Quotes/{id:int}")]
        [HttpGet]
        public async Task<IHttpActionResult> Quote(int id)
        {
            try {
                var order = await _repo.Get(id);
                if (order == null) {
                    return NotFound();
                }

                var report = new QuoteReport(order) as SectionReport;
                report.Run();
                return Ok(report);
            } catch (Exception ex) {
                return Ok(ex);
            }
        }
    }
}