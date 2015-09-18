using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using GrandOakOrders.Data.Entities;

namespace GrandOakOrders.Data.Repositories
{
    public class OrderRepository
    {
        private GrandOakDbContext _context = new GrandOakDbContext();

        public async Task<List<Order>> OpenOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.Items)
                .Include(o => o.Inquiry)
                .Where(o => !o.CompletedDate.HasValue)
                .ToListAsync();

            return orders;
        }

        public async Task<Order> Get(int id)
        {
            var order = await _context.Orders
                .Include(o => o.Items)
                .Include(o => o.Inquiry)
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
                .Include(o => o.Items)
                .FirstAsync(o => o.Id == order.Id);

            dborder.UpdatedAt = now;
            dborder.UpdatedBy = who;
            dborder.Notes = order.Notes;
            dborder.PickupNotes = order.PickupNotes;
            dborder.AllergyNotes = order.AllergyNotes;
            dborder.RequireDeposit = order.RequireDeposit;
            dborder.RequireConfirmation = order.RequireConfirmation;
            dborder.ConfirmationDate = order.ConfirmationDate;
            dborder.CompletedDate = order.CompletedDate;
            dborder.InvoiceDate = order.InvoiceDate;
            dborder.PaymentDate = order.PaymentDate;
            dborder.SubTotal = order.SubTotal;
            dborder.Gratuity = order.Gratuity;
            dborder.Deposit = order.Deposit;
            dborder.GrandTotal = order.GrandTotal;
            dborder.TaxCode = order.TaxCode;
            dborder.TaxRate = order.TaxRate;

            var submittedIds = dborder.Items.Select(i => i.Id).ToList();
            var deleted = dborder.Items
                .Where(i => !submittedIds.Contains(i.Id))
                .ToList();

            _context.OrderItems.RemoveRange(deleted);

            var edited = order.Items
                .Where(i => i.Id > 0)
                .ToDictionary(i => i.Id);

            dborder.Items
                .Where(i => submittedIds.Contains(i.Id))
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
    }
}