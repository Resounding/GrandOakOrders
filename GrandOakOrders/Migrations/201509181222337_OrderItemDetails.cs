namespace GrandOakOrders.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class OrderItemDetails : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.OrderItems", "InvoiceNotes", c => c.String());
            AddColumn("dbo.OrderItems", "ShowToKitchen", c => c.Boolean(nullable: false));
            AddColumn("dbo.OrderItems", "ShowOnInvoice", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.OrderItems", "ShowOnInvoice");
            DropColumn("dbo.OrderItems", "ShowToKitchen");
            DropColumn("dbo.OrderItems", "InvoiceNotes");
        }
    }
}
