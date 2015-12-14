namespace GrandOakOrders.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ItemTemplates : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ItemTemplates",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                        UnitPrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                        ShowToKitchen = c.Boolean(nullable: false),
                        ShowOnInvoice = c.Boolean(nullable: false),
                        KitchenNotes = c.String(),
                        OrderingNotes = c.String(),
                        InvoiceNotes = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.ItemTemplates");
        }
    }
}
