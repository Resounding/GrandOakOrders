namespace GrandOakOrders.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InquiryEnhancements : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Inquiries", "Location", c => c.String());
            AddColumn("dbo.Inquiries", "LocationAddress", c => c.String());
            AddColumn("dbo.Inquiries", "IsPickup", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Inquiries", "IsPickup");
            DropColumn("dbo.Inquiries", "LocationAddress");
            DropColumn("dbo.Inquiries", "Location");
        }
    }
}
