namespace GrandOakOrders.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Orders : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.OrderItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        OrderId = c.Int(nullable: false),
                        SortOrder = c.Int(nullable: false),
                        Description = c.String(),
                        Quantity = c.Decimal(nullable: false, precision: 18, scale: 2),
                        UnitPrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                        TotalPrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                        KitchenNotes = c.String(),
                        OrderingNotes = c.String(),
                        CreatedBy = c.String(),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedBy = c.String(),
                        UpdatedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Orders", t => t.OrderId, cascadeDelete: true)
                .Index(t => t.OrderId);
            
            CreateTable(
                "dbo.Orders",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        InquiryId = c.Int(nullable: false),
                        Notes = c.String(),
                        PickupNotes = c.String(),
                        AllergyNotes = c.String(),
                        RequireDeposit = c.Boolean(nullable: false),
                        RequireConfirmation = c.Boolean(nullable: false),
                        ConfirmationDate = c.DateTime(storeType: "date"),
                        CompletedDate = c.DateTime(storeType: "date"),
                        InvoiceDate = c.DateTime(storeType: "date"),
                        PaymentDate = c.DateTime(storeType: "date"),
                        SubTotal = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Gratuity = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Deposit = c.Decimal(nullable: false, precision: 18, scale: 2),
                        GrandTotal = c.Decimal(nullable: false, precision: 18, scale: 2),
                        TaxCode = c.String(nullable: false, maxLength: 128),
                        TaxRate = c.Decimal(nullable: false, precision: 18, scale: 2),
                        CreatedBy = c.String(),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedBy = c.String(),
                        UpdatedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Inquiries", t => t.InquiryId, cascadeDelete: true)
                .ForeignKey("dbo.Taxes", t => t.TaxCode, cascadeDelete: true)
                .Index(t => t.InquiryId)
                .Index(t => t.TaxCode);
            
            CreateTable(
                "dbo.Taxes",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Rate = c.Decimal(nullable: false, precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Orders", "TaxCode", "dbo.Taxes");
            DropForeignKey("dbo.OrderItems", "OrderId", "dbo.Orders");
            DropForeignKey("dbo.Orders", "InquiryId", "dbo.Inquiries");
            DropIndex("dbo.Orders", new[] { "TaxCode" });
            DropIndex("dbo.Orders", new[] { "InquiryId" });
            DropIndex("dbo.OrderItems", new[] { "OrderId" });
            DropTable("dbo.Taxes");
            DropTable("dbo.Orders");
            DropTable("dbo.OrderItems");
        }
    }
}
