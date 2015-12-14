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
    }
}