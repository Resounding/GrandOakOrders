namespace GrandOakOrders.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EmailDeliveries : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.EmailDeliveries",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        From = c.String(),
                        To = c.String(),
                        Bcc = c.String(),
                        Subject = c.String(),
                        Message = c.String(),
                        OrderId = c.Int(),
                        Sent = c.DateTime(nullable: false),
                        SentBy = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Orders", t => t.OrderId)
                .Index(t => t.OrderId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.EmailDeliveries", "OrderId", "dbo.Orders");
            DropIndex("dbo.EmailDeliveries", new[] { "OrderId" });
            DropTable("dbo.EmailDeliveries");
        }
    }
}
