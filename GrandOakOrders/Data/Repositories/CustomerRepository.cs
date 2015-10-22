using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using GrandOakOrders.Data.Entities;

namespace GrandOakOrders.Data.Repositories
{
    public class CustomerRepository
    {
        private readonly GrandOakDbContext _context = new GrandOakDbContext();

        public async Task<List<Customer>> GetCustomers()
        {
            var customers = await _context.Customers.OrderBy(c => c.CompanyName).ToListAsync();
            return customers;
        }
    }
}