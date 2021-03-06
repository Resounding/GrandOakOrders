﻿using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using GrandOakOrders.Data.Entities;
using GrandOakOrders.Data.Repositories;

namespace GrandOakOrders.Controllers
{
    [RoutePrefix("API/Inquiries")]
    public class InquiriesController : ApiController
    {
        private readonly InquiryRepository _repo = new InquiryRepository();

        [Route("")]
        [HttpGet]
        public async Task<IHttpActionResult> Inquiries()
        {
            var inquiries = await _repo.OpenInquiries();
            return Ok(inquiries);
        }

        [Route("{id:int}")]
        [HttpGet]
        public async Task<IHttpActionResult> Get(int id)
        {
            var inquiry = await _repo.GetOne(id);
            if(inquiry == null) {
                return NotFound();
            }

            return Ok(inquiry);
        }

        [Route("")]
        [HttpPost]
        public async Task<IHttpActionResult> Create(Inquiry inquiry)
        {
            var user = Request.GetOwinContext().Request.User;
            var created = await _repo.Create(inquiry, user.Identity.Name);

            if (created.OutcomeId == InquiryOutcome.OrderId) {
                var orderRepo = new OrderRepository();
                var order = await orderRepo.Create(created.Id, user.Identity.Name);
                return Created("/API/Orders/" + order.Id, order);
            } else {
                return Ok();
            }
        }

        [Route("{id:int}")]
        [HttpPut]
        public async Task<IHttpActionResult> Update(Inquiry inquiry)
        {
            var user = Request.GetOwinContext().Request.User;
            var updated = await _repo.Edit(inquiry, user.Identity.Name);

            if (updated.OutcomeId == InquiryOutcome.OrderId) {
                var orderRepo = new OrderRepository();
                var order = await orderRepo.Create(updated.Id, user.Identity.Name);
                return Created("/API/Orders/" + order.Id, order);
            } else {
                return Ok();
            }
        }

        [Route("{id:int}")]
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(int id)
        {
            await _repo.Delete(id);
            return Ok();
        }
    }
}