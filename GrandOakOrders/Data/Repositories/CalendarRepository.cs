using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using GrandOakOrders.Models;

namespace GrandOakOrders.Data.Repositories
{
    public class CalendarRepository
    {
        private GrandOakDbContext _context = new GrandOakDbContext();

        public async Task<ICollection<CalendarEvent>> Events(DateTime start, DateTime end)
        {
            var endOfEnd = end.Date.AddDays(1).AddSeconds(-1);
            var startOfStart = start.Date;

            var inquiries = await _context.Inquiries
                .Where(i => i.OutcomeId != "CLOSE" && i.EventDate >= startOfStart && i.EventDate <= endOfEnd)
                .ToListAsync();

            var inquiryIds = inquiries.Select(i => i.Id).ToList();
            var orders = await _context.Orders
                .Where(o => inquiryIds.Contains(o.InquiryId))
                .ToListAsync();

            var cancelledInquiries = orders
                .Where(o => o.IsCancelled)
                .Select(o => o.InquiryId)
                .ToList();

            inquiries = inquiries
                .Where(i => !cancelledInquiries.Contains(i.Id))
                .ToList();

            var events = inquiries.Select(i => {
                var order = orders.FirstOrDefault(o => o.InquiryId == i.Id);
                var isOrder = order != null;
                var startTime = i.EventDate.Value;
                var allDay = !i.EventTime.HasValue;
                if (!allDay) {
                    startTime = startTime.AddTicks(i.EventTime.Value.Ticks);
                }
                var startString = startTime.ToString("s", System.Globalization.CultureInfo.InvariantCulture);
                var title = i.Organization;

                var url = isOrder ? ("#/orders/" + order.Id) : ("#/inquiries/" + i.Id);
                var className = isOrder ? (order.IsConfirmed ? "confirmed" : "unconfirmed") : "inquiry";

                return new CalendarEvent {
                    id = i.Id.ToString(),
                    title = title,
                    start = startString,
                    allDay = allDay,
                    url = url,
                    className = className,
                    Inquiry = i
                };
            })
            .ToList();

            return events;
        }
    }
}