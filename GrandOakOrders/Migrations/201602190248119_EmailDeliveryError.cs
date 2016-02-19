namespace GrandOakOrders.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EmailDeliveryError : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.EmailDeliveries", "DeliveryError", c => c.String(defaultValue: "", nullable: false, maxLength: 1000));
        }
        
        public override void Down()
        {
            DropColumn("dbo.EmailDeliveries", "DeliveryError");
        }
    }
}
