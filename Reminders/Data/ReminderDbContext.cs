using System.Data.Entity;
using Reminders.Data.Entities;

namespace Reminders.Data
{
    public class ReminderDbContext : DbContext
    {
        static ReminderDbContext()
        {
            Database.SetInitializer<ReminderDbContext>(null);
        }

        public ReminderDbContext()
        {
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;
        }

        public DbSet<Reminder> Reminders { get; set; }
    }
}