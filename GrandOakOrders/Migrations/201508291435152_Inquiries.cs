namespace GrandOakOrders.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Inquiries : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Inquiries",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Organization = c.String(),
                        ContactPerson = c.String(),
                        EventDate = c.DateTime(storeType: "date"),
                        EventTime = c.Time(precision: 7),
                        People = c.Int(),
                        Summary = c.String(),
                        Description = c.String(),
                        IsQuoteRequired = c.Boolean(nullable: false),
                        ClosureComments = c.String(),
                        OutcomeId = c.String(maxLength: 128),
                        CreatedBy = c.String(),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedBy = c.String(),
                        UpdatedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.InquiryOutcomes", t => t.OutcomeId)
                .Index(t => t.OutcomeId);
            
            CreateTable(
                "dbo.InquiryOutcomes",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Inquiries", "OutcomeId", "dbo.InquiryOutcomes");
            DropIndex("dbo.Inquiries", new[] { "OutcomeId" });
            DropTable("dbo.InquiryOutcomes");
            DropTable("dbo.Inquiries");
        }
    }
}
