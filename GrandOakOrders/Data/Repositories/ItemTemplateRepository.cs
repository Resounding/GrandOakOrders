using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using GrandOakOrders.Data.Entities;

namespace GrandOakOrders.Data.Repositories
{
    public class ItemTemplateRepository
    {
        private readonly GrandOakDbContext _context = new GrandOakDbContext();

        public async Task<ICollection<ItemTemplate>> List()
        {
            var list = await _context.ItemTemplates
                .OrderBy(t => t.Description)
                .ToListAsync();

            return list;
        }

        public async Task Edit(ItemTemplate item)
        {
            var dbItem = await _context.ItemTemplates.FindAsync(item.Id);

            dbItem.Description = item.Description;
            dbItem.InvoiceNotes = item.InvoiceNotes;
            dbItem.KitchenNotes = item.KitchenNotes;
            dbItem.OrderingNotes = item.OrderingNotes;
            dbItem.ShowOnInvoice = item.ShowOnInvoice;
            dbItem.ShowToKitchen = item.ShowToKitchen;
            dbItem.UnitPrice = item.UnitPrice;

            await _context.SaveChangesAsync();
        }

        public async Task<ItemTemplate> Create(ItemTemplate item)
        {
            item.Description = item.Description ?? string.Empty;
            item.InvoiceNotes = item.InvoiceNotes ?? string.Empty;
            item.KitchenNotes = item.KitchenNotes ?? string.Empty;
            item.OrderingNotes = item.OrderingNotes ?? string.Empty;

            _context.ItemTemplates.Add(item);
            await _context.SaveChangesAsync();

            return item;
        }

        public async Task Delete(int id)
        {
            var item = await _context.ItemTemplates.FirstOrDefaultAsync(i => i.Id == id);
            if (item != null) {
                _context.ItemTemplates.Remove(item);
                await _context.SaveChangesAsync();
            }
        }
    }
}