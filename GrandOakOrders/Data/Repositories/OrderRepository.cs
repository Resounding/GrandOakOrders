using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using GrandOakOrders.Data.Entities;
using SendGrid;

namespace GrandOakOrders.Data.Repositories
{
    public class OrderRepository
    {
        private readonly GrandOakDbContext _context = new GrandOakDbContext();

        public async Task<List<Order>> GetOrders(bool all)
        {
            var orderQuery = _context.Orders
                .Include(o => o.Items)
                .Include(o => o.Inquiry);

            if (!all) {
                orderQuery = orderQuery.Where(o => o.CompletedDate == null && o.InvoiceDate == null && !o.IsCancelled);
            }

            var orders = await orderQuery.ToListAsync();

            return orders;
        }

        public async Task<Order> Get(int id)
        {
            var order = await _context.Orders
                .Include(o => o.Items)
                .Include(o => o.Inquiry)
                .Include(o => o.EmailDeliveries)
                .FirstOrDefaultAsync(o => o.Id == id);

            return order;
        }

        public async Task<Order> Create(int inquiryId, string who)
        {
            var tax = await _context.Taxes.FirstAsync();
            var now = DateTime.Now;

            var order = new Order {
                InquiryId = inquiryId,
                Notes = string.Empty,
                PickupNotes = string.Empty,
                AllergyNotes = string.Empty,
                ShowGratuity = true,
                TaxCode = tax.Id,
                TaxRate = tax.Rate,
                CreatedBy = who,
                CreatedAt = now,
                UpdatedBy = who,
                UpdatedAt = now
            };
            _context.Orders.Add(order);

            await _context.SaveChangesAsync();

            return order;
        }

        public async Task<Order> Edit(Order order, string who)
        {
            var now = DateTime.Now;
            var dborder = await _context.Orders
                .Include(o => o.Inquiry)
                .Include(o => o.Items)
                .FirstAsync(o => o.Id == order.Id);

            dborder.UpdatedAt = now;
            dborder.UpdatedBy = who;
            dborder.Notes = order.Notes;
            dborder.PickupNotes = order.PickupNotes;
            dborder.AllergyNotes = order.AllergyNotes;
            dborder.RequireDeposit = order.RequireDeposit;
            dborder.IsConfirmed = order.IsConfirmed;
            dborder.IsCancelled = order.IsCancelled;
            dborder.ConfirmationDate = order.ConfirmationDate;
            dborder.CompletedDate = order.CompletedDate;
            dborder.InvoiceDate = order.InvoiceDate;
            dborder.PaymentDate = order.PaymentDate;
            dborder.SubTotal = order.SubTotal;
            dborder.ShowGratuity = order.ShowGratuity;
            dborder.Gratuity = order.Gratuity;
            dborder.Deposit = order.Deposit;
            dborder.GrandTotal = order.GrandTotal;
            dborder.TaxCode = order.TaxCode;
            dborder.TaxRate = order.TaxRate;

            dborder.Inquiry.Organization = order.Inquiry.Organization;
            dborder.Inquiry.ContactPerson = order.Inquiry.ContactPerson;
            dborder.Inquiry.EventDate = order.Inquiry.EventDate;
            dborder.Inquiry.EventTime = order.Inquiry.EventTime;
            dborder.Inquiry.People = order.Inquiry.People;
            dborder.Inquiry.Summary = order.Inquiry.Summary;
            dborder.Inquiry.Description = order.Inquiry.Description;
            dborder.Inquiry.DeliveryType = order.Inquiry.DeliveryType;
            dborder.Inquiry.Location = order.Inquiry.Location;
            dborder.Inquiry.LocationAddress = order.Inquiry.LocationAddress;
            dborder.Inquiry.Phone = order.Inquiry.Phone;
            dborder.Inquiry.Email = order.Inquiry.Email;

            var submittedIds = order.Items.Select(i => i.Id).ToList();
            var deleted = dborder.Items
                .Where(i => !submittedIds.Contains(i.Id))
                .ToList();

            _context.OrderItems.RemoveRange(deleted);

            var edited = order.Items
                .Where(i => i.Id > 0)
                .ToDictionary(i => i.Id);
            var editedIds = edited.Keys.ToList();

            dborder.Items
                .Where(i => editedIds.Contains(i.Id))
                .ToList()
                .ForEach(i => {
                    var edit = edited[i.Id];
                    i.UpdatedAt = now;
                    i.UpdatedBy = who;
                    i.Description = edit.Description;
                    i.Quantity = edit.Quantity;
                    i.UnitPrice = edit.UnitPrice;
                    i.TotalPrice = edit.TotalPrice;
                    i.KitchenNotes = edit.KitchenNotes;
                    i.OrderingNotes = edit.OrderingNotes;
                    i.InvoiceNotes = edit.InvoiceNotes;
                    i.ShowToKitchen = edit.ShowToKitchen;
                    i.ShowOnInvoice = edit.ShowOnInvoice;
                });

            var added = order.Items
                .Where(i => i.Id <= 0)
                .ToList();
            added.ForEach(i => {
                i.CreatedAt = now;
                i.CreatedBy = who;
                i.UpdatedAt = now;
                i.CreatedBy = who;
            });
            _context.OrderItems.AddRange(added);                 

            using (var tx = _context.Database.BeginTransaction()) {
                await _context.SaveChangesAsync();
                tx.Commit();
            }

            return order;
        }

        public async Task<EmailDelivery> RecordInvoiceEmail(SendGridMessage message, int orderId, string who)
        {
            var delivery = new EmailDelivery {
                From = message.From.Address,
                To = string.Join(";", message.To.Select(t => t.Address)),
                Bcc = string.Join(";", message.Bcc.Select(b => b.Address)),
                Subject = message.Subject,
                Message = message.Text,
                OrderId = orderId,
                Sent = DateTime.Now,
                SentBy = who,
                DeliveryError = string.Empty
            };
            _context.EmailDeliveries.Add(delivery);
            await _context.SaveChangesAsync();

            return delivery;
        }

        public async Task RecordEmailDelivery(int deliveryId)
        {
            var delivery = await _context.EmailDeliveries.FirstOrDefaultAsync(d => d.Id == deliveryId);
            if (delivery != null) {
                delivery.DeliveredDate = DateTime.Now;
            }
            await _context.SaveChangesAsync();
        }

        public async Task LogEmailDeliveryError(int deliveryId, string error)
        {
            var delivery = await _context.EmailDeliveries.FirstOrDefaultAsync(d => d.Id == deliveryId);
            if (delivery != null) {
                delivery.DeliveryError = error;
            }
            await _context.SaveChangesAsync();
        }

        public async Task RecordEmailBounce(int deliveryId)
        {
            var delivery = await _context.EmailDeliveries.FirstOrDefaultAsync(d => d.Id == deliveryId);
            if (delivery != null) {
                delivery.BouncedDate = DateTime.Now;
            }
            await _context.SaveChangesAsync();
        }

        public async Task RecordEmailOpen(int deliveryId)
        {
            var delivery = await _context.EmailDeliveries.FirstOrDefaultAsync(d => d.Id == deliveryId);
            if (delivery != null) {
                delivery.OpenedDate = DateTime.Now;
            }
            await _context.SaveChangesAsync();
        }
    }
}