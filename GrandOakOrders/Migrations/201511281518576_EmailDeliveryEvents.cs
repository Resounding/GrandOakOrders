namespace GrandOakOrders.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EmailDeliveryEvents : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.EmailDeliveries", "DeliveredDate", c => c.DateTime());
            AddColumn("dbo.EmailDeliveries", "BouncedDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.EmailDeliveries", "BouncedDate");
            DropColumn("dbo.EmailDeliveries", "DeliveredDate");
        }
    }
}
