namespace GrandOakOrders.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NewFields : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Inquiries", "Phone", c => c.String());
            AddColumn("dbo.Inquiries", "Email", c => c.String());
            AddColumn("dbo.Inquiries", "DeliveryType", c => c.String());
            AddColumn("dbo.Orders", "IsConfirmed", c => c.Boolean(nullable: false));
            AddColumn("dbo.Orders", "IsCancelled", c => c.Boolean(nullable: false));
            DropColumn("dbo.Inquiries", "IsPickup");
            DropColumn("dbo.Orders", "RequireConfirmation");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Orders", "RequireConfirmation", c => c.Boolean(nullable: false));
            AddColumn("dbo.Inquiries", "IsPickup", c => c.Boolean(nullable: false));
            DropColumn("dbo.Orders", "IsCancelled");
            DropColumn("dbo.Orders", "IsConfirmed");
            DropColumn("dbo.Inquiries", "DeliveryType");
            DropColumn("dbo.Inquiries", "Email");
            DropColumn("dbo.Inquiries", "Phone");
        }
    }
}
