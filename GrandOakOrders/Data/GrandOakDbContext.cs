using System.Data.Entity;
using System.Reflection;
using GrandOakOrders.Data.Entities;

namespace GrandOakOrders.Data
{
    public class GrandOakDbContext : DbContext
    {
        static GrandOakDbContext()
        {
            Database.SetInitializer(new CreateDatabaseIfNotExists<GrandOakDbContext>());
        }

        public static GrandOakDbContext Create()
        {
            return new GrandOakDbContext();
        }

        public GrandOakDbContext()
        {
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;
        }

        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<EmailDelivery> EmailDeliveries { get; set; }
        public virtual DbSet<Inquiry> Inquiries { get; set; }
        public virtual DbSet<InquiryOutcome> InquiryOutcomes { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderItem> OrderItems { get; set; }
        public virtual DbSet<Tax> Taxes { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.AddFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}