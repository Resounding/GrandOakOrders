namespace GrandOakOrders.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EmailOpenedEvent : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.EmailDeliveries", "OpenedDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.EmailDeliveries", "OpenedDate");
        }
    }
}
