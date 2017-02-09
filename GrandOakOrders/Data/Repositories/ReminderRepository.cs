using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using GrandOakOrders.Data.Entities;

namespace GrandOakOrders.Data.Repositories
{
    public class ReminderRepository
    {
        private readonly GrandOakDbContext _context = new GrandOakDbContext();

        public async Task CreateReminder(Reminder reminder)
        {
            _context.Reminders.Add(reminder);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveReminders(int orderId)
        {
            var reminders = await _context.Reminders
                .Where(r => r.OrderId == orderId)
                .ToListAsync();
            _context.Reminders.RemoveRange(reminders);
            await _context.SaveChangesAsync();
        }
    }
}